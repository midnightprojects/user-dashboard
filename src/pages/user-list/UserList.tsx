import { useUsers } from '../../hooks/useUsers';
import './UserList.css';

const UserList = () => {
    const { users, loading, error } = useUsers();

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
                                <tr key={user.id} className="user-row">
                                    <td>{user.name}</td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default UserList; 