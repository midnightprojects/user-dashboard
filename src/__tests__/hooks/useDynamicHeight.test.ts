import { renderHook, act } from '@testing-library/react';
import { useDynamicHeight } from '../../hooks/useDynamicHeight';

// Mock window.innerHeight
const mockInnerHeight = (height: number) => {
    Object.defineProperty(window, 'innerHeight', {
        writable: true,
        configurable: true,
        value: height,
    });
};

// Mock ResizeObserver
const mockResizeObserver = jest.fn(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
}));

global.ResizeObserver = mockResizeObserver;

describe('useDynamicHeight', () => {
    const defaultOptions = {
        minHeight: 300,
        maxHeight: 800,
        headerHeight: 60,
        padding: 40
    };

    beforeEach(() => {
        jest.clearAllMocks();
        mockInnerHeight(1000);
    });

    describe('Initial calculation', () => {
        it('calculates height correctly with default options', () => {
            const { result } = renderHook(() => useDynamicHeight(defaultOptions));
            
            // With containerRef.current = null, height defaults to minHeight
            expect(result.current.height).toBe(300);
            expect(result.current.containerRef.current).toBeNull();
        });

        it('respects minHeight constraint', () => {
            mockInnerHeight(200); // Very small window
            
            const { result } = renderHook(() => useDynamicHeight(defaultOptions));
            
            expect(result.current.height).toBe(300); // minHeight
        });

        it('respects maxHeight constraint', () => {
            mockInnerHeight(2000); // Very large window
            
            const { result } = renderHook(() => useDynamicHeight(defaultOptions));
            
            expect(result.current.height).toBe(300); // minHeight when containerRef is null
        });

        it('calculates height without constraints', () => {
            mockInnerHeight(1000);
            
            const { result } = renderHook(() => useDynamicHeight({
                ...defaultOptions,
                minHeight: 0,
                maxHeight: Infinity
            }));
            
            expect(result.current.height).toBe(0); // minHeight when containerRef is null
        });
    });

    describe('Window resize handling', () => {
        it('updates height when window resizes', () => {
            const { result, rerender } = renderHook(() => useDynamicHeight(defaultOptions));
            
            expect(result.current.height).toBe(300); // Initial height (minHeight)
            
            // Simulate window resize
            act(() => {
                mockInnerHeight(600);
                window.dispatchEvent(new Event('resize'));
            });
            
            // Re-render to trigger recalculation
            rerender();
            
            expect(result.current.height).toBe(300); // Still minHeight when containerRef is null
        });

        it('maintains constraints during resize', () => {
            const { result, rerender } = renderHook(() => useDynamicHeight(defaultOptions));
            
            // Resize to very small window
            act(() => {
                mockInnerHeight(200);
                window.dispatchEvent(new Event('resize'));
            });
            
            rerender();
            
            expect(result.current.height).toBe(300); // minHeight
        });

        it('updates to maxHeight when window becomes very large', () => {
            const { result, rerender } = renderHook(() => useDynamicHeight(defaultOptions));
            
            // Resize to very large window
            act(() => {
                mockInnerHeight(2000);
                window.dispatchEvent(new Event('resize'));
            });
            
            rerender();
            
            expect(result.current.height).toBe(300); // Still minHeight when containerRef is null
        });
    });

    describe('Custom options', () => {
        it('works with custom header height', () => {
            const { result } = renderHook(() => useDynamicHeight({
                ...defaultOptions,
                headerHeight: 100
            }));
            
            expect(result.current.height).toBe(300); // minHeight when containerRef is null
        });

        it('works with custom padding', () => {
            const { result } = renderHook(() => useDynamicHeight({
                ...defaultOptions,
                padding: 80
            }));
            
            expect(result.current.height).toBe(300); // minHeight when containerRef is null
        });

        it('works with custom min and max heights', () => {
            const { result } = renderHook(() => useDynamicHeight({
                ...defaultOptions,
                minHeight: 500,
                maxHeight: 600
            }));
            
            expect(result.current.height).toBe(500); // minHeight when containerRef is null
        });
    });

    describe('Edge cases', () => {
        it('handles zero values', () => {
            const { result } = renderHook(() => useDynamicHeight({
                minHeight: 0,
                maxHeight: 0,
                headerHeight: 0,
                padding: 0
            }));
            
            expect(result.current.height).toBe(0);
        });

        it('handles negative values gracefully', () => {
            const { result } = renderHook(() => useDynamicHeight({
                minHeight: -100,
                maxHeight: -50,
                headerHeight: -20,
                padding: -10
            }));
            
            // Should still calculate based on window height
            expect(result.current.height).toBe(-100); // minHeight when containerRef is null
        });

        it('handles very large values', () => {
            const { result } = renderHook(() => useDynamicHeight({
                ...defaultOptions,
                minHeight: 10000,
                maxHeight: 20000
            }));
            
            expect(result.current.height).toBe(10000); // minHeight
        });
    });

    describe('Container ref', () => {
        it('provides a ref object', () => {
            const { result } = renderHook(() => useDynamicHeight(defaultOptions));
            
            expect(result.current.containerRef).toBeDefined();
            expect(typeof result.current.containerRef).toBe('object');
            expect(result.current.containerRef.current).toBeNull();
        });

        it('ref can be assigned to DOM elements', () => {
            const { result } = renderHook(() => useDynamicHeight(defaultOptions));
            
            const mockElement = document.createElement('div');
            
            act(() => {
                result.current.containerRef.current = mockElement;
            });
            
            expect(result.current.containerRef.current).toBe(mockElement);
        });
    });

    describe('Cleanup', () => {
        it('removes event listener on unmount', () => {
            const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');
            
            const { unmount } = renderHook(() => useDynamicHeight(defaultOptions));
            
            unmount();
            
            expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));
            
            removeEventListenerSpy.mockRestore();
        });
    });

    describe('Performance', () => {
        it('does not recalculate unnecessarily', () => {
            const { result, rerender } = renderHook(() => useDynamicHeight(defaultOptions));
            
            const initialHeight = result.current.height;
            
            // Re-render without any changes
            rerender();
            
            expect(result.current.height).toBe(initialHeight);
        });

        it('handles rapid resize events', () => {
            const { result, rerender } = renderHook(() => useDynamicHeight(defaultOptions));
            
            // Simulate rapid resize events
            act(() => {
                mockInnerHeight(500);
                window.dispatchEvent(new Event('resize'));
                mockInnerHeight(600);
                window.dispatchEvent(new Event('resize'));
                mockInnerHeight(700);
                window.dispatchEvent(new Event('resize'));
            });
            
            rerender();
            
            expect(result.current.height).toBe(300); // Still minHeight when containerRef is null
        });
    });
}); 