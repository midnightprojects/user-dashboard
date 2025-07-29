import { useState, useMemo } from 'react';
import { User } from '../types/user';

export const useSearch = (users: User[]) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredUsers = useMemo(() => {
        if (!searchTerm.trim()) return users;
        
        const term = searchTerm.toLowerCase();
        return users.filter(user => 
            user.name.toLowerCase().includes(term) ||
            user.email.toLowerCase().includes(term)
        );
    }, [users, searchTerm]);

    return {
        searchTerm,
        setSearchTerm,
        filteredUsers
    };
}; 