import { useCallback, useEffect, useState, useRef } from 'react';

interface UseDynamicHeightOptions {
    minHeight?: number;
    maxHeight?: number;
    headerHeight?: number;
    padding?: number;
}

export const useDynamicHeight = (options: UseDynamicHeightOptions = {}) => {
    const {
        minHeight = 300,
        maxHeight = 800,
        headerHeight = 60,
        padding = 40
    } = options;

    const [height, setHeight] = useState(minHeight);
    const containerRef = useRef<HTMLDivElement>(null);

    const calculateHeight = useCallback(() => {
        if (!containerRef.current) return;
        
        const container = containerRef.current;
        const viewportHeight = window.innerHeight;
        const containerTop = container.offsetTop;
        
        const availableHeight = viewportHeight - containerTop - headerHeight - padding;
        const calculatedHeight = Math.max(minHeight, Math.min(availableHeight, maxHeight));
        
        setHeight(calculatedHeight);
    }, [minHeight, maxHeight, headerHeight, padding]);

    useEffect(() => {
        calculateHeight();
        window.addEventListener('resize', calculateHeight);
        return () => window.removeEventListener('resize', calculateHeight);
    }, [calculateHeight]);

    return { height, containerRef };
}; 