import { useCallback } from 'react';

/**
 * Custom hook for preloading lazy-loaded components
 * @param importFn - The dynamic import function for the component
 * @returns A function to trigger preloading
 */
export const usePreload = (importFn: () => Promise<any>) => {
    const preload = useCallback(() => {
        // Start preloading the component
        importFn();
    }, [importFn]);

    return preload;
};

/**
 * Preload multiple components at once
 * @param importFns - Array of dynamic import functions
 * @returns A function to trigger preloading of all components
 */
export const usePreloadMultiple = (importFns: (() => Promise<any>)[]) => {
    const preloadAll = useCallback(() => {
        // Preload all components in parallel
        importFns.forEach(importFn => importFn());
    }, [importFns]);

    return preloadAll;
}; 