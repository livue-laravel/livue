<?php

namespace LiVue\Tests\Fixtures;

use LiVue\Attributes\Guarded;
use LiVue\Component;

class GuardedComponent extends Component
{
    public string $publicField = '';

    #[Guarded]
    public int $secretId = 0;

    #[Guarded]
    public string $apiToken = '';

    public function setPublicField(string $value): void
    {
        $this->publicField = $value;
    }

    public function setSecret(int $id, string $token): void
    {
        $this->secretId = $id;
        $this->apiToken = $token;
    }

    public function getSecretId(): int
    {
        return $this->secretId;
    }

    public function getApiToken(): string
    {
        return $this->apiToken;
    }

    public function render(): string
    {
        return 'fixtures.guarded-component';
    }
}
