<?php

use LiVue\Tests\Fixtures\DownloadComponent;

describe('Downloads & Redirects', function () {

    describe('Downloads', function () {

        it('triggers file download', function () {
            livue(DownloadComponent::class)
                ->call('downloadFile')
                ->assertFileDownloaded();
        });

        it('triggers file download with correct filename', function () {
            livue(DownloadComponent::class)
                ->call('downloadFile')
                ->assertFileDownloaded('report.pdf');
        });

        it('triggers content download', function () {
            livue(DownloadComponent::class)
                ->call('downloadCsvContent')
                ->assertFileDownloaded('export.csv');
        });

        it('asserts no download when none triggered', function () {
            livue(DownloadComponent::class)
                ->call('noAction')
                ->assertNoFileDownloaded();
        });

    });

    describe('Redirects', function () {

        it('triggers redirect', function () {
            livue(DownloadComponent::class)
                ->call('redirectToHome')
                ->assertRedirect();
        });

        it('triggers redirect with correct URL', function () {
            livue(DownloadComponent::class)
                ->call('redirectToHome')
                ->assertRedirect('/home');
        });

        it('triggers SPA navigation', function () {
            livue(DownloadComponent::class)
                ->call('navigateToProfile')
                ->assertNavigate('/profile');
        });

        it('asserts no redirect when none triggered', function () {
            livue(DownloadComponent::class)
                ->call('noAction')
                ->assertNoRedirect();
        });

    });

});
