<?php

namespace LiVue\Features\SupportBroadcast;

use LiVue\Component;
use LiVue\Features\SupportHooks\ComponentHook;
use LiVue\Features\SupportHooks\ComponentStore;

/**
 * Laravel Echo / Broadcasting support for LiVue.
 *
 * Enables components to listen to Laravel broadcast events via Laravel Echo.
 * Supports public, private, and presence channels.
 *
 * Usage in components:
 *
 * 1. Using #[On] attribute:
 *    #[On('echo:orders,OrderShipped')]
 *    public function handleOrder($event) { ... }
 *
 * 2. Using getListeners() for dynamic channels:
 *    public function getListeners(): array {
 *        return [
 *            "echo:orders.{$this->orderId},OrderShipped" => 'handleOrder',
 *            "echo-private:user.{$this->userId},MessageReceived" => 'handleMessage',
 *            "echo-presence:chat.{$this->roomId},here" => 'updateUsers',
 *        ];
 *    }
 *
 * Channel prefixes:
 * - echo:         Public channel
 * - echo-private: Private channel (requires auth)
 * - echo-presence: Presence channel (with here/joining/leaving events)
 *
 * Event naming:
 * - Standard: echo:channel,EventName
 * - Custom broadcastAs: echo:channel,.custom-event-name (dot prefix)
 * - Presence specials: echo-presence:channel,here|joining|leaving
 */
class SupportBroadcast extends ComponentHook
{
    /**
     * Echo channel type prefixes.
     */
    public const PREFIX_PUBLIC = 'echo:';
    public const PREFIX_PRIVATE = 'echo-private:';
    public const PREFIX_PRESENCE = 'echo-presence:';

    /**
     * Presence channel special events.
     */
    public const PRESENCE_EVENTS = ['here', 'joining', 'leaving'];

    /**
     * Contribute Echo listeners configuration to the snapshot memo.
     */
    public function dehydrateMemo(Component $component, ComponentStore $store): array
    {
        $echoListeners = $this->extractEchoListeners($component);

        if (empty($echoListeners)) {
            return [];
        }

        return ['echo' => $echoListeners];
    }

    /**
     * Extract Echo-specific listeners from the component.
     *
     * @return array Array of channel subscriptions:
     *               [
     *                   [
     *                       'channel' => 'orders.123',
     *                       'type' => 'public|private|presence',
     *                       'event' => 'OrderShipped',
     *                       'method' => 'handleOrder',
     *                       'isPresenceEvent' => false,
     *                   ],
     *                   ...
     *               ]
     */
    private function extractEchoListeners(Component $component): array
    {
        $listeners = $component->getListeners();
        $echoListeners = [];

        foreach ($listeners as $eventKey => $method) {
            $parsed = $this->parseEchoListener($eventKey);

            if ($parsed !== null) {
                $parsed['method'] = $method;
                $echoListeners[] = $parsed;
            }
        }

        return $echoListeners;
    }

    /**
     * Parse an Echo listener key.
     *
     * @param string $key The listener key (e.g., 'echo:orders,OrderShipped')
     * @return array|null Parsed config or null if not an Echo listener
     */
    private function parseEchoListener(string $key): ?array
    {
        // Check for Echo prefixes
        $type = null;
        $remainder = null;

        if (str_starts_with($key, self::PREFIX_PRESENCE)) {
            $type = 'presence';
            $remainder = substr($key, strlen(self::PREFIX_PRESENCE));
        } elseif (str_starts_with($key, self::PREFIX_PRIVATE)) {
            $type = 'private';
            $remainder = substr($key, strlen(self::PREFIX_PRIVATE));
        } elseif (str_starts_with($key, self::PREFIX_PUBLIC)) {
            $type = 'public';
            $remainder = substr($key, strlen(self::PREFIX_PUBLIC));
        } else {
            return null;
        }

        // Parse channel,event format
        $parts = explode(',', $remainder, 2);

        if (count($parts) !== 2) {
            return null;
        }

        $channel = trim($parts[0]);
        $event = trim($parts[1]);

        if (empty($channel) || empty($event)) {
            return null;
        }

        // Check for custom broadcastAs (dot prefix)
        $isCustomEvent = str_starts_with($event, '.');
        if ($isCustomEvent) {
            $event = substr($event, 1);
        }

        // Check for presence special events
        $isPresenceEvent = $type === 'presence' && in_array($event, self::PRESENCE_EVENTS);

        return [
            'channel' => $channel,
            'type' => $type,
            'event' => $event,
            'isCustomEvent' => $isCustomEvent,
            'isPresenceEvent' => $isPresenceEvent,
        ];
    }

    /**
     * Check if a listener key is an Echo listener.
     */
    public static function isEchoListener(string $key): bool
    {
        return str_starts_with($key, self::PREFIX_PUBLIC)
            || str_starts_with($key, self::PREFIX_PRIVATE)
            || str_starts_with($key, self::PREFIX_PRESENCE);
    }
}
