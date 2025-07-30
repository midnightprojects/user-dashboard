import { useState, useMemo } from 'react';

type SortDirection = 'asc' | 'desc';

export const useSort = <T extends Record<string, any>>(items: T[]) => {
    const [sortField, setSortField] = useState<keyof T | null>(null);
    const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

    const handleSort = (field: keyof T) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    const sortedItems = useMemo(() => {
        if (!sortField) return items;

        return [...items].sort((a, b) => {
            const aValue = a[sortField];
            const bValue = b[sortField];

            if (typeof aValue === 'string' && typeof bValue === 'string') {
                const comparison = aValue.toLowerCase().localeCompare(bValue.toLowerCase());
                return sortDirection === 'asc' ? comparison : -comparison;
            }

            if (typeof aValue === 'number' && typeof bValue === 'number') {
                return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
            }

            return 0;
        });
    }, [items, sortField, sortDirection]);

    return {
        sortField,
        sortDirection,
        handleSort,
        sortedItems
    };
}; 