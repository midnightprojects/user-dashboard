import { Link, useLocation } from 'react-router-dom';
import { FaList, FaUserPlus } from 'react-icons/fa';
import { usePreload } from '../../hooks/usePreload';
import styles from './Header.module.css';

// Import functions for preloading
const preloadUserList = () => import('../../pages/user-list/UserList');
const preloadAddUser = () => import('../../pages/add-user/AddUser');

const Header = () => {
    const location = useLocation();
    const ListIcon = FaList as React.FC<React.SVGProps<SVGSVGElement>>;
    const UserPlusIcon = FaUserPlus as React.FC<React.SVGProps<SVGSVGElement>>;

    // Preload functions
    const preloadUserListPage = usePreload(preloadUserList);
    const preloadAddUserPage = usePreload(preloadAddUser);

    return (
        <header className={styles.navigation} role="banner">
            <h1>Dashboard</h1>
            <nav className={styles.segmentedControl} role="navigation" aria-label="Main navigation">
                <Link 
                    to="/" 
                    className={`${styles.segment} ${location.pathname === '/' ? styles.active : ''}`}
                    aria-current={location.pathname === '/' ? 'page' : undefined}
                    aria-label="View user list"
                    onMouseEnter={preloadUserListPage}
                    onFocus={preloadUserListPage}
                >
                    <ListIcon aria-hidden="true" />
                    <span>User List</span>
                </Link>
                <Link 
                    to="/add-user" 
                    className={`${styles.segment} ${location.pathname === '/add-user' ? styles.active : ''}`}
                    aria-current={location.pathname === '/add-user' ? 'page' : undefined}
                    aria-label="Add new user"
                    onMouseEnter={preloadAddUserPage}
                    onFocus={preloadAddUserPage}
                >
                    <UserPlusIcon aria-hidden="true" />
                    <span>Add User</span>
                </Link>
            </nav>
        </header>
    );
};

export default Header;