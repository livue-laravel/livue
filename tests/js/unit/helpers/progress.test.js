/**
 * Tests for progress bar helper.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

let progress;

beforeEach(async () => {
    vi.resetModules();
    vi.useFakeTimers();

    progress = await import('@/helpers/progress.js');

    // Reset DOM
    document.head.innerHTML = '';
    document.body.innerHTML = '';
});

afterEach(() => {
    vi.useRealTimers();

    // Clean up any progress bar elements
    document.querySelectorAll('.livue-progress-bar, .livue-progress-spinner, #livue-progress-styles')
        .forEach(el => el.remove());
});

describe('Progress Bar', () => {
    describe('start()', () => {
        it('should create progress bar elements', () => {
            progress.start();

            expect(document.querySelector('.livue-progress-bar')).not.toBeNull();
            expect(document.querySelector('.livue-progress-spinner')).not.toBeNull();
        });

        it('should inject styles', () => {
            progress.start();

            expect(document.getElementById('livue-progress-styles')).not.toBeNull();
        });

        it('should show the progress bar', () => {
            progress.start();

            const bar = document.querySelector('.livue-progress-bar');
            expect(bar.classList.contains('livue-progress-hidden')).toBe(false);
        });

        it('should set initial progress', () => {
            progress.start();

            expect(progress.isStarted()).toBe(true);
            expect(progress.getStatus()).toBeGreaterThan(0);
        });

        it('should track concurrent requests', () => {
            progress.start();
            progress.start();
            progress.start();

            // Still showing
            expect(progress.isStarted()).toBe(true);

            progress.done();
            progress.done();
            // Still showing after 2 done()
            expect(progress.isStarted()).toBe(true);

            progress.done();
            vi.advanceTimersByTime(500);
            // Now hidden after 3rd done()
            expect(progress.isStarted()).toBe(false);
        });
    });

    describe('set()', () => {
        it('should update progress value', () => {
            progress.start();
            progress.set(0.5);

            expect(progress.getStatus()).toBe(0.5);
        });

        it('should clamp value to minimum', () => {
            progress.start();
            progress.set(0.01);

            expect(progress.getStatus()).toBe(0.08); // Default minimum
        });

        it('should clamp value to maximum', () => {
            progress.start();
            progress.set(1.5);

            expect(progress.getStatus()).toBe(1);
        });

        it('should update bar transform', () => {
            progress.start();
            progress.set(0.5);

            const bar = document.querySelector('.livue-progress-bar');
            expect(bar.style.transform).toContain('-50%');
        });

        it('should do nothing if not started', () => {
            progress.set(0.5);

            expect(progress.getStatus()).toBeNull();
        });
    });

    describe('done()', () => {
        it('should complete the progress bar', () => {
            progress.start();
            progress.done();

            expect(progress.getStatus()).toBe(1);
        });

        it('should hide the bar after animation', () => {
            progress.start();
            progress.done();

            // After animation delay
            vi.advanceTimersByTime(500);

            const bar = document.querySelector('.livue-progress-bar');
            expect(bar.classList.contains('livue-progress-hidden')).toBe(true);
        });

        it('should reset status after fade', () => {
            progress.start();
            progress.done();

            vi.advanceTimersByTime(500);

            expect(progress.isStarted()).toBe(false);
            expect(progress.getStatus()).toBeNull();
        });

        it('should not hide if concurrent requests pending', () => {
            progress.start();
            progress.start(); // Two requests

            progress.done(); // One done

            vi.advanceTimersByTime(500);

            // Should still be showing
            expect(progress.isStarted()).toBe(true);
        });
    });

    describe('forceDone()', () => {
        it('should hide immediately regardless of pending count', () => {
            progress.start();
            progress.start();
            progress.start();

            progress.forceDone();

            vi.advanceTimersByTime(500);

            expect(progress.isStarted()).toBe(false);
        });
    });

    describe('trickle()', () => {
        it('should increment progress', () => {
            progress.start();
            const initial = progress.getStatus();

            progress.trickle();

            expect(progress.getStatus()).toBeGreaterThan(initial);
        });

        it('should increment less as progress increases', () => {
            progress.start();

            progress.set(0.1);
            const beforeTrickle1 = progress.getStatus();
            progress.trickle();
            const increment1 = progress.getStatus() - beforeTrickle1;

            progress.set(0.7);
            const beforeTrickle2 = progress.getStatus();
            progress.trickle();
            const increment2 = progress.getStatus() - beforeTrickle2;

            expect(increment2).toBeLessThan(increment1);
        });

        it('should not exceed 1', () => {
            progress.start();
            progress.set(0.99);

            for (let i = 0; i < 100; i++) {
                progress.trickle();
            }

            expect(progress.getStatus()).toBeLessThanOrEqual(1);
        });
    });

    describe('configure()', () => {
        it('should update configuration', () => {
            progress.configure({
                color: '#ff0000',
                height: '5px',
                showSpinner: false,
            });

            progress.start();

            // Check styles were updated
            const style = document.getElementById('livue-progress-styles');
            expect(style.textContent).toContain('#ff0000');
            expect(style.textContent).toContain('5px');
        });

        it('should allow hiding spinner', () => {
            progress.configure({ showSpinner: false });
            progress.start();

            expect(document.querySelector('.livue-progress-spinner')).toBeNull();
        });
    });

    describe('isStarted()', () => {
        it('should return false initially', () => {
            expect(progress.isStarted()).toBe(false);
        });

        it('should return true after start', () => {
            progress.start();
            expect(progress.isStarted()).toBe(true);
        });

        it('should return false after done', () => {
            progress.start();
            progress.done();
            vi.advanceTimersByTime(500);

            expect(progress.isStarted()).toBe(false);
        });
    });

    describe('getStatus()', () => {
        it('should return null when not started', () => {
            expect(progress.getStatus()).toBeNull();
        });

        it('should return current progress when started', () => {
            progress.start();
            progress.set(0.5);

            expect(progress.getStatus()).toBe(0.5);
        });
    });

    describe('default export', () => {
        it('should export all functions', () => {
            expect(progress.default.configure).toBe(progress.configure);
            expect(progress.default.start).toBe(progress.start);
            expect(progress.default.set).toBe(progress.set);
            expect(progress.default.trickle).toBe(progress.trickle);
            expect(progress.default.done).toBe(progress.done);
            expect(progress.default.forceDone).toBe(progress.forceDone);
            expect(progress.default.isStarted).toBe(progress.isStarted);
            expect(progress.default.getStatus).toBe(progress.getStatus);
        });
    });
});
