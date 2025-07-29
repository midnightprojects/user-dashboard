import React, { useState } from 'react';
import { useUsers } from '../../hooks/useUsers';
import { User } from '../../types/user';
import Modal from '../../components/modal/Modal';
import './UserList.css';

const UserList = () => {
    const { users, loading, error } = useUsers();
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleRowClick = (user: User) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedUser(null);
    };

    return (
        <div className="user-list">
            <h2>User List</h2>
            
            {/* LOADING */}
            {loading && (
                <div className="loading">Loading users...</div>
            )}
            
            {/* ERROR */}
            {error && (
                <div className="error">Error: {error}</div>
            )}
            
            {/* TABLE */}
            {!loading && !error && (
                <div className="table-container">
                    <table className="users-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Username</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr 
                                    key={user.id} 
                                    className="user-row"
                                    onClick={() => handleRowClick(user)}
                                >
                                    <td>{user.name}</td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* MODAL */}
            <Modal 
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                user={selectedUser}
            />
        </div>
    );
};

export default UserList; 