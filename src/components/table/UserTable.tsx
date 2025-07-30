import React from 'react';
import { User } from '../../types/user';
import { formatName } from '../../utils/nameUtils';
import './UserTable.css';

type SortField = 'formattedName' | 'username' | 'email';

interface Props {
    users: User[];
    onRowClick: (user: User) => void;
    onSort: (field: SortField) => void;
    getSortIcon: (field: SortField) => React.ReactNode;
}

const UserTable: React.FC<Props> = ({ 
    users, 
    onRowClick, 
    onSort, 
    getSortIcon 
}) => {
    return (
        <div className="table-container">
            <table className="users-table">
                <thead>
                    <tr>
                        <th 
                            className="sortable-header"
                            onClick={() => onSort('formattedName')}
                        >
                            Name {getSortIcon('formattedName')}
                        </th>
                        <th 
                            className="sortable-header"
                            onClick={() => onSort('username')}
                        >
                            Username {getSortIcon('username')}
                        </th>
                        <th 
                            className="sortable-header"
                            onClick={() => onSort('email')}
                        >
                            Email {getSortIcon('email')}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr 
                            key={user.id} 
                            className="user-row"
                            onClick={() => onRowClick(user)}
                        >
                            <td>{formatName(user.name)}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserTable; 