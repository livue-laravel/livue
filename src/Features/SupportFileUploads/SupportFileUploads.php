<?php

namespace LiVue\Features\SupportFileUploads;

use LiVue\Component;
use LiVue\Features\SupportHooks\ComponentHook;
use LiVue\Features\SupportHooks\ComponentStore;

/**
 * Contribute upload configuration (HMAC tokens + rules) to the snapshot memo.
 *
 * This allows the JS runtime to authenticate upload requests and know
 * which properties accept file uploads.
 */
class SupportFileUploads extends ComponentHook
{
    public function dehydrateMemo(Component $component, ComponentStore $store): array
    {
        if (! in_array(WithFileUploads::class, class_uses_recursive($component))) {
            return [];
        }

        $tokens = $component->getUploadTokens();

        if (empty($tokens)) {
            return [];
        }

        $fileRules = $component->fileRules();
        $config = [];

        foreach ($tokens as $property => $token) {
            $config[$property] = [
                'token' => $token,
                'rules' => $fileRules[$property] ?? [],
            ];
        }

        return ['uploads' => $config];
    }
}
