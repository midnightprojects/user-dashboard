import { useState } from 'react';
import { useUsers } from '../../hooks/useUsers';
import { useSearch } from '../../hooks/useSearch';
import { User } from '../../types/user';
import Modal from '../../components/modal/Modal';
import SearchInput from '../../components/search/SearchInput';
import { formatName } from '../../utils/nameUtils';
import './UserList.css';

const UserList = () => {
    const { users, loading, error } = useUsers();
    const { searchTerm, setSearchTerm, filteredUsers } = useSearch(users);
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
            <div className="header-container">
                <h2>User List</h2>
                
                <SearchInput
                    value={searchTerm}
                    onChange={setSearchTerm}
                    placeholder="Search by name or email..."
                />
            </div>
            
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
                            {filteredUsers.map(user => (
                                <tr 
                                    key={user.id} 
                                    className="user-row"
                                    onClick={() => handleRowClick(user)}
                                >
                                    <td>{formatName(user.name)}</td>
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