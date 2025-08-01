import { useEffect, useState, lazy, Suspense } from 'react';
import { useUserStore } from '../../store/userStore';
import { useUsers } from '../../hooks/useUsers';
import { useSearch } from '../../hooks/useSearch';
import { useUserSort } from '../../hooks/useUserSort';
import SearchInput from '../../components/search/SearchInput';
import TableSkeleton from '../../components/table/TableSkeleton';
import { User } from '../../types/user';
import styles from './UserList.module.css';

// Lazy load the table component
const VirtualizedUserTable = lazy(() => import('../../components/table/VirtualizedUserTable'));
// Lazy load the modal component since it's only used when needed
const Modal = lazy(() => import('../../components/modal/Modal'));

// Loading component for table
const TableLoader = () => (
    <div className={styles.tableLoader} role="status" aria-live="polite">
        <div className={styles.loaderSpinner}></div>
        <p className={styles.tableLoaderText}>Loading table...</p>
    </div>
);
// Loading component for modal
const ModalLoader = () => (
    <div className={styles.modalLoader} role="status" aria-live="polite">
        <div className={styles.modalLoaderSpinner}></div>
        <p className={styles.modalLoaderText}>Loading modal...</p>
    </div>
);

const UserList = () => {
    const { users: globalUsers, setUsers } = useUserStore();
    const { users: apiUsers, loading: apiLoading, error: apiError } = useUsers();
    // Use global users if available, otherwise use API users
    const allUsers = globalUsers.length > 0 ? globalUsers : apiUsers;
    const isLoading = apiLoading;
    const error = apiError;
    // Initialize global state with API users on first load
    useEffect(() => {
        if (apiUsers.length > 0 && globalUsers.length === 0) {
            setUsers(apiUsers);
        }
    }, [apiUsers, globalUsers.length, setUsers]);
    const { searchTerm, setSearchTerm, filteredUsers } = useSearch(allUsers);
    const { handleSort, sortedUsers, getSortIcon } = useUserSort(filteredUsers);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const handleRowClick = (user: User) => {
        setSelectedUser(user);
    };
    const handleCloseModal = () => {
        setSelectedUser(null);
    };
    if (isLoading) {
        return (
            <div className={`${styles.userList} ${styles.pageFadeIn}`} role="region" aria-label="User list page">
                <div className={styles.headerContainer}>
                    <h2 className={styles.headerTitle}>User List</h2>
                    <SearchInput
                        value={searchTerm}
                        onChange={setSearchTerm}
                        placeholder="Search by name or email..."
                        ariaLabel="Search users by name or email"
                    />
                </div>
                <div className={styles.userTableContainer}>
                    <TableSkeleton />
                </div>
            </div>
        );
    }
    if (error) {
        return (
            <div className={styles.error} role="alert" aria-live="assertive">
                Error: {error}
            </div>
        );
    }
    return (
        <div className={`${styles.userList} ${styles.pageFadeIn}`} role="region" aria-label="User list page">
            <div className={styles.headerContainer}>
                <h2 className={styles.headerTitle}>User List</h2>
                <SearchInput
                    value={searchTerm}
                    onChange={setSearchTerm}
                    placeholder="Search by name or email..."
                    ariaLabel="Search users by name or email"
                />
            </div>
            <div 
                className={styles.userTableContainer}
                role="region" 
                aria-label="Users table"
                aria-live="polite"
                aria-atomic="true"
            >
                <Suspense fallback={<TableLoader />}>
                    <VirtualizedUserTable
                        users={sortedUsers}
                        onRowClick={handleRowClick}
                        onSort={handleSort}
                        getSortIcon={getSortIcon}
                    />
                </Suspense>
            </div>
            {selectedUser && (
                <Suspense fallback={<ModalLoader />}>
                    <Modal
                        isOpen={!!selectedUser}
                        onClose={handleCloseModal}
                        user={selectedUser}
                    />
                </Suspense>
            )}
        </div>
    );
};

export default UserList;