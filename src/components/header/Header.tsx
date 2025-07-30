import { Link, useLocation } from 'react-router-dom';
import { FaList, FaUserPlus } from 'react-icons/fa';
import './Header.css';

const Header = () => {
    const location = useLocation();
    const ListIcon = FaList as React.FC<React.SVGProps<SVGSVGElement>>;
    const UserPlusIcon = FaUserPlus as React.FC<React.SVGProps<SVGSVGElement>>;

    return (
        <nav className="navigation">
            <h1>Dashboard</h1>
            <div className="segmented-control">
                <Link 
                    to="/" 
                    className={`segment ${location.pathname === '/' ? 'active' : ''}`}
                >
                    <ListIcon />
                    <span>User List</span>
                </Link>
                <Link 
                    to="/add-user" 
                    className={`segment ${location.pathname === '/add-user' ? 'active' : ''}`}
                >
                    <UserPlusIcon />
                    <span>Add User</span>
                </Link>
            </div>
        </nav>
    );
};

export default Header; 