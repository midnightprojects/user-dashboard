import { useEffect, useState } from 'react';

interface UsePageTransitionOptions {
    duration?: number;
    onEnter?: () => void;
    onExit?: () => void;
}

export const usePageTransition = (options: UsePageTransitionOptions = {}) => {
    const { duration = 300, onEnter, onExit } = options;
    const [isEntering, setIsEntering] = useState(true);
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        // Trigger enter animation
        setIsEntering(true);
        onEnter?.();

        // Clear entering state after animation
        const enterTimer = setTimeout(() => {
            setIsEntering(false);
        }, duration);

        return () => {
            clearTimeout(enterTimer);
        };
    }, [duration, onEnter]);

    const triggerExit = (callback?: () => void) => {
        setIsExiting(true);
        onExit?.();

        setTimeout(() => {
            setIsExiting(false);
            callback?.();
        }, duration);
    };

    return {
        isEntering,
        isExiting,
        triggerExit,
        className: isEntering ? 'page-enter page-enter-active' : 
                  isExiting ? 'page-exit page-exit-active' : ''
    };
}; 