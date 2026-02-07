<?php

namespace LiVue\Features\SupportConfirm;

use Attribute;

/**
 * Require user confirmation before executing a method.
 *
 * The JS runtime will show a confirmation dialog before calling the method.
 * By default, uses the browser's native confirm() dialog, but can be customized
 * via LiVue.setConfirmHandler().
 *
 * Usage:
 *   #[Confirm]
 *   public function delete(): void { }
 *
 *   #[Confirm('Are you sure you want to delete this item?')]
 *   public function deleteItem(int $id): void { }
 *
 *   #[Confirm(
 *       message: 'This will permanently delete all data.',
 *       title: 'Danger Zone',
 *       confirmText: 'Yes, delete everything',
 *       cancelText: 'No, keep it'
 *   )]
 *   public function deleteAll(): void { }
 */
#[Attribute(Attribute::TARGET_METHOD)]
class BaseConfirm
{
    public function __construct(
        /**
         * The confirmation message to display.
         */
        public string $message = 'Are you sure?',

        /**
         * Optional title for the confirmation dialog (used by custom handlers).
         */
        public ?string $title = null,

        /**
         * Text for the confirm button.
         */
        public string $confirmText = 'Confirm',

        /**
         * Text for the cancel button.
         */
        public string $cancelText = 'Cancel',
    ) {}
}
