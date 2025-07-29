import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    return (
        <nav className="navigation">
            <h1>User Dashboard</h1>
            <ul className="nav-links">
                <li><Link to="/">User List</Link></li>
                <li><Link to="/add-user">Add User</Link></li>
            </ul>
        </nav>
    );
};

export default Header; 