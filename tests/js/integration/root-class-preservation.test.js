/**
 * Reproduction: hardcoded root class on a LiVue component template
 * gets cleared during Vue mount.
 *
 * Setup mirrors how Primix widgets render: the component template's
 * first element has a hardcoded class (set via @class([...]) in the
 * Blade template, e.g. an Anonymous Blade Component wrapper).
 *
 * Server output (which becomes el.outerHTML before mount) is:
 *   <div data-livue-id="..." data-livue-snapshot="..."
 *        class="some-base-class" style="--foo: 1;" v-cloak>
 *     ... inner content ...
 *   </div>
 *
 * After Vue mounts, the wrapper div's class/style attributes
 * should still be present.
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import LiVueComponent from '@/core/component.js';

beforeEach(() => {
    document.body.innerHTML = '';
    document.head.innerHTML = '<meta name="csrf-token" content="test-csrf-token">';
});

afterEach(() => {
    vi.clearAllMocks();
});

describe('Root element class preservation', () => {

    it('preserves hardcoded class on the wrapper after Vue mount', async () => {
        const snapshot = {
            state: { count: 0 },
            memo: {
                id: 'livue-test-1',
                name: 'counter',
                checksum: 'x',
            },
        };

        const wrapper = document.createElement('div');
        wrapper.setAttribute('data-livue-id', 'livue-test-1');
        wrapper.setAttribute(
            'data-livue-snapshot',
            JSON.stringify(snapshot).replace(/"/g, '&quot;')
        );
        // Use property to bypass attribute encoding for the test
        wrapper.dataset.livueSnapshot = JSON.stringify(snapshot);
        wrapper.className = 'primix-widget primix-widget-boxed';
        wrapper.setAttribute('style', '--px-widget-border: red;');
        wrapper.setAttribute('v-cloak', '');
        wrapper.innerHTML = '<span>{{ count }}</span>';

        document.body.appendChild(wrapper);

        const component = new LiVueComponent(wrapper);

        // Allow Vue's microtasks (mount + nextTick) to complete
        await new Promise((resolve) => setTimeout(resolve, 50));

        const post = document.querySelector('[data-livue-id="livue-test-1"]');
        expect(post).toBe(wrapper); // same node

        expect(wrapper.className).toBe('primix-widget primix-widget-boxed');
        expect(wrapper.getAttribute('style')).toBe('--px-widget-border: red;');
        // v-cloak should be removed by Vue's mount
        expect(wrapper.hasAttribute('v-cloak')).toBe(false);
    });

});
