import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
    const location = useLocation();

    return (
        <nav className="navigation">
            <h1>Dashboard</h1>
            <ul className="nav-links">
                <li>
                    <Link 
                        to="/" 
                        className={location.pathname === '/' ? 'active' : ''}
                    >
                        User List
                    </Link>
                </li>
                <li>
                    <Link 
                        to="/add-user" 
                        className={location.pathname === '/add-user' ? 'active' : ''}
                    >
                        Add User
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Header; 