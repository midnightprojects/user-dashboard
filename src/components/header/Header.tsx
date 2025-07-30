import { Link, useLocation } from 'react-router-dom';
import { FaList, FaUserPlus } from 'react-icons/fa';
import { usePreload } from '../../hooks/usePreload';
import './Header.css';

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
        <header className="navigation" role="banner">
            <h1>Dashboard</h1>
            <nav className="segmented-control" role="navigation" aria-label="Main navigation">
                <Link 
                    to="/" 
                    className={`segment ${location.pathname === '/' ? 'active' : ''}`}
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
                    className={`segment ${location.pathname === '/add-user' ? 'active' : ''}`}
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