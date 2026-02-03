<?php

namespace LiVue\Tests\Fixtures;

use LiVue\Component;

class DownloadComponent extends Component
{
    public string $filename = 'report.pdf';

    public function downloadFile(): void
    {
        $this->download('/path/to/file.pdf', $this->filename);
    }

    public function downloadCsvContent(): void
    {
        parent::downloadContent('CSV content here', 'export.csv');
    }

    public function redirectToHome(): void
    {
        $this->redirect('/home');
    }

    public function navigateToProfile(): void
    {
        $this->redirect('/profile', navigate: true);
    }

    public function redirectWithFlash(): void
    {
        $this->redirect('/dashboard');
    }

    public function noAction(): void
    {
        // Does nothing
    }

    public function render(): string
    {
        return 'fixtures.download-component';
    }
}
