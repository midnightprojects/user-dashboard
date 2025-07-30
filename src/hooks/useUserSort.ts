import { useState, useMemo } from 'react';
import { User } from '../types/user';
import { formatName } from '../utils/nameUtils';

type SortField = keyof User | 'formattedName' | null;
type SortDirection = 'asc' | 'desc';

export const useUserSort = (users: User[]) => {
    const [sortField, setSortField] = useState<SortField>(null);
    const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

    const handleSort = (field: SortField) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    const sortedUsers = useMemo(() => {
        if (!sortField) return users;

        return [...users].sort((a, b) => {
            let aValue: string | number;
            let bValue: string | number;

            if (sortField === 'formattedName') {
                aValue = formatName(a.name);
                bValue = formatName(b.name);
            } else {
                aValue = a[sortField] as string | number;
                bValue = b[sortField] as string | number;
            }

            if (typeof aValue === 'string' && typeof bValue === 'string') {
                const comparison = aValue.toLowerCase().localeCompare(bValue.toLowerCase());
                return sortDirection === 'asc' ? comparison : -comparison;
            }

            if (typeof aValue === 'number' && typeof bValue === 'number') {
                return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
            }

            return 0;
        });
    }, [users, sortField, sortDirection]);

    const getSortIcon = (field: SortField) => {
        if (sortField !== field) return '';
        return sortDirection === 'asc' ? ' ↑' : ' ↓';
    };

    return {
        sortField,
        sortDirection,
        handleSort,
        sortedUsers,
        getSortIcon
    };
}; 