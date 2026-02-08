/**
 * Tests for the LiVue upload module.
 *
 * Tests the removeUploadFromServer function that sends
 * encrypted refs to the server to delete temporary files.
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { removeUploadFromServer } from '@/features/upload.js';

describe('Upload Module', () => {

    beforeEach(() => {
        // Reset fetch mock
        globalThis.fetch = vi.fn(() => Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ deleted: 1 }),
        }));

        // Ensure CSRF meta tag exists
        document.head.innerHTML = '<meta name="csrf-token" content="test-csrf-token">';

        // Ensure livue-prefix meta tag does NOT exist (use default)
        var prefixMeta = document.querySelector('meta[name="livue-prefix"]');
        if (prefixMeta) prefixMeta.remove();
    });

    describe('removeUploadFromServer()', () => {

        it('should send POST to /livue/upload-remove with refs', async () => {
            await removeUploadFromServer(['ref-1', 'ref-2']);

            expect(globalThis.fetch).toHaveBeenCalledTimes(1);

            var call = globalThis.fetch.mock.calls[0];
            expect(call[0]).toBe('/livue/upload-remove');
            expect(call[1].method).toBe('POST');
            expect(call[1].headers['Content-Type']).toBe('application/json');
            expect(call[1].headers['Accept']).toBe('application/json');
            expect(call[1].headers['X-CSRF-TOKEN']).toBe('test-csrf-token');

            var body = JSON.parse(call[1].body);
            expect(body.refs).toEqual(['ref-1', 'ref-2']);
        });

        it('should not call fetch when refs is empty', async () => {
            await removeUploadFromServer([]);

            expect(globalThis.fetch).not.toHaveBeenCalled();
        });

        it('should not call fetch when refs is null', async () => {
            await removeUploadFromServer(null);

            expect(globalThis.fetch).not.toHaveBeenCalled();
        });

        it('should not call fetch when refs is undefined', async () => {
            await removeUploadFromServer(undefined);

            expect(globalThis.fetch).not.toHaveBeenCalled();
        });

        it('should silently ignore fetch errors', async () => {
            globalThis.fetch = vi.fn(() => Promise.reject(new Error('Network error')));

            // Should not throw
            await expect(removeUploadFromServer(['ref-1'])).resolves.toBeUndefined();
        });

        it('should use custom prefix from meta tag', async () => {
            var meta = document.createElement('meta');
            meta.name = 'livue-prefix';
            meta.content = 'custom-prefix';
            document.head.appendChild(meta);

            await removeUploadFromServer(['ref-1']);

            var call = globalThis.fetch.mock.calls[0];
            expect(call[0]).toBe('/custom-prefix/upload-remove');
        });

        it('should send single ref in array', async () => {
            await removeUploadFromServer(['single-ref']);

            var body = JSON.parse(globalThis.fetch.mock.calls[0][1].body);
            expect(body.refs).toEqual(['single-ref']);
        });

    });

});
