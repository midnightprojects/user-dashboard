import React from 'react';
import { User } from '../../types/user';
import { formatName } from '../../utils/nameUtils';
import { useDynamicHeight } from '../../hooks/useDynamicHeight';
import './VirtualizedUserTable.css';

type SortField = 'formattedName' | 'username' | 'email';

interface Props {
    users: User[];
    onRowClick: (user: User) => void;
    onSort: (field: SortField) => void;
    getSortIcon: (field: SortField) => React.ReactNode;
}

const VirtualizedUserTable: React.FC<Props> = ({ 
    users, 
    onRowClick, 
    onSort, 
    getSortIcon 
}) => {
    const { height: tableHeight, containerRef } = useDynamicHeight({
        minHeight: 300,
        maxHeight: 800,
        headerHeight: 60,
        padding: 40
    });

    const handleKeyDown = (event: React.KeyboardEvent, user: User) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            onRowClick(user);
        }
    };

    const handleHeaderKeyDown = (event: React.KeyboardEvent, field: SortField) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            onSort(field);
        }
    };

    return (
        <div className="table-container" role="region" aria-label="Users table" ref={containerRef}>
            <table className="users-table" role="table" aria-label="Users list">
                <thead>
                    <tr role="row">
                        <th 
                            className="sortable-header"
                            onClick={() => onSort('formattedName')}
                            onKeyDown={(e) => handleHeaderKeyDown(e, 'formattedName')}
                            role="columnheader"
                            scope="col"
                            tabIndex={0}
                            aria-sort="none"
                            aria-label="Sort by name"
                        >
                            Name {getSortIcon('formattedName')}
                        </th>
                        <th 
                            className="sortable-header"
                            onClick={() => onSort('username')}
                            onKeyDown={(e) => handleHeaderKeyDown(e, 'username')}
                            role="columnheader"
                            scope="col"
                            tabIndex={0}
                            aria-sort="none"
                            aria-label="Sort by username"
                        >
                            Username {getSortIcon('username')}
                        </th>
                        <th 
                            className="sortable-header"
                            onClick={() => onSort('email')}
                            onKeyDown={(e) => handleHeaderKeyDown(e, 'email')}
                            role="columnheader"
                            scope="col"
                            tabIndex={0}
                            aria-sort="none"
                            aria-label="Sort by email"
                        >
                            Email {getSortIcon('email')}
                        </th>
                    </tr>
                </thead>
            </table>
            <div style={{ maxHeight: `${tableHeight}px`, overflow: 'auto' }}>
                <table className="users-table" style={{ borderTop: 'none' }}>
                    <tbody>
                        {users.map((user) => (
                            <tr 
                                key={user.id} 
                                className="user-row"
                                onClick={() => onRowClick(user)}
                                onKeyDown={(e) => handleKeyDown(e, user)}
                                role="row"
                                tabIndex={0}
                                aria-label={`View details for ${formatName(user.name)}`}
                            >
                                <td role="cell">{formatName(user.name)}</td>
                                <td role="cell">{user.username}</td>
                                <td role="cell">{user.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {users.length === 0 && (
                <div className="no-results" role="status" aria-live="polite">
                    No users found
                </div>
            )}
        </div>
    );
};

export default VirtualizedUserTable; 