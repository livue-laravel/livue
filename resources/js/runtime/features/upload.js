/**
 * File upload module for LiVue.
 *
 * Uploads files to the dedicated /livue/upload endpoint using FormData.
 * Uses XMLHttpRequest (not fetch) for upload progress event support.
 */

import { getToken } from '../helpers/csrf.js';

/**
 * Build the upload endpoint URL from the configured prefix.
 *
 * @returns {string}
 */
function buildUploadUrl() {
    var meta = document.querySelector('meta[name="livue-prefix"]');
    var prefix = meta ? meta.getAttribute('content') : 'livue';

    return '/' + prefix + '/upload';
}

/**
 * Upload a single file for a component property.
 *
 * @param {File} file - The File object from the input
 * @param {string} componentName - Component name (from memo)
 * @param {string} property - Property name this file maps to
 * @param {string} uploadToken - HMAC token from memo.uploads[property].token
 * @param {Function} [onProgress] - Progress callback receiving 0-100
 * @returns {Promise<object>} Server response with ref + display metadata
 */
export function uploadFile(file, componentName, property, uploadToken, onProgress) {
    return new Promise(function (resolve, reject) {
        var formData = new FormData();
        formData.append('file', file);
        formData.append('component', componentName);
        formData.append('property', property);
        formData.append('checksum', uploadToken);

        var xhr = new XMLHttpRequest();
        var url = buildUploadUrl();

        xhr.open('POST', url, true);

        // CSRF token
        var token = getToken();
        if (token) {
            xhr.setRequestHeader('X-CSRF-TOKEN', token);
        }

        xhr.setRequestHeader('Accept', 'application/json');

        // Progress tracking
        if (onProgress && xhr.upload) {
            xhr.upload.addEventListener('progress', function (e) {
                if (e.lengthComputable) {
                    var percent = Math.round((e.loaded / e.total) * 100);
                    onProgress(percent);
                }
            });
        }

        xhr.onload = function () {
            var data;

            try {
                data = JSON.parse(xhr.responseText);
            } catch (e) {
                reject(new Error('Invalid server response'));
                return;
            }

            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(data);
            } else {
                var error = new Error(data.error || data.message || 'Upload failed');
                error.status = xhr.status;
                error.data = data;
                reject(error);
            }
        };

        xhr.onerror = function () {
            reject(new Error('Network error during upload'));
        };

        xhr.send(formData);
    });
}

/**
 * Remove temporary uploaded files from the server.
 *
 * Sends encrypted refs to the remove endpoint so the server
 * can delete the corresponding temp files. Failures are silently
 * ignored (the scheduled purge will handle stragglers).
 *
 * @param {string[]} refs - Array of encrypted ref strings
 * @returns {Promise<void>}
 */
export function removeUploadFromServer(refs) {
    if (!refs || refs.length === 0) return Promise.resolve();

    var url = buildUploadUrl() + '-remove';
    var token = getToken();

    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-CSRF-TOKEN': token || '',
        },
        body: JSON.stringify({ refs: refs }),
    }).catch(function () {
        // Silently ignore - purge command will clean up
    });
}

/**
 * Upload multiple files in a single batch request.
 *
 * @param {FileList|File[]} files
 * @param {string} componentName
 * @param {string} property
 * @param {string} uploadToken
 * @param {Function} [onProgress] - Called with overall progress 0-100
 * @returns {Promise<{results: object[], errors: object[]}>}
 */
export function uploadFiles(files, componentName, property, uploadToken, onProgress) {
    return new Promise(function (resolve, reject) {
        var fileArray = Array.from(files);
        var formData = new FormData();

        // Append all files as files[]
        fileArray.forEach(function (file) {
            formData.append('files[]', file);
        });

        formData.append('component', componentName);
        formData.append('property', property);
        formData.append('checksum', uploadToken);

        var xhr = new XMLHttpRequest();
        var url = buildUploadUrl();

        xhr.open('POST', url, true);

        // CSRF token
        var token = getToken();
        if (token) {
            xhr.setRequestHeader('X-CSRF-TOKEN', token);
        }

        xhr.setRequestHeader('Accept', 'application/json');

        // Progress tracking
        if (onProgress && xhr.upload) {
            xhr.upload.addEventListener('progress', function (e) {
                if (e.lengthComputable) {
                    var percent = Math.round((e.loaded / e.total) * 100);
                    onProgress({ overall: percent });
                }
            });
        }

        xhr.onload = function () {
            var data;

            try {
                data = JSON.parse(xhr.responseText);
            } catch (e) {
                reject(new Error('Invalid server response'));
                return;
            }

            if (xhr.status >= 200 && xhr.status < 300) {
                // Server returns { results: [], errors: [] }
                resolve({
                    results: data.results || [],
                    errors: data.errors || [],
                });
            } else {
                var error = new Error(data.error || data.message || 'Upload failed');
                error.status = xhr.status;
                error.data = data;
                reject(error);
            }
        };

        xhr.onerror = function () {
            reject(new Error('Network error during upload'));
        };

        xhr.send(formData);
    });
}
