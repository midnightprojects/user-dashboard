import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '../header/Header';
import UserList from '../../pages/user-list/UserList';
import AddUser from '../../pages/add-user/AddUser';
import './Layout.css';

const Layout = () => {
    return (
        <Router>
            <div className="layout">
                <Header />
                
                <main className="main-content">
                    <Routes>
                        <Route path="/" element={<UserList />} />
                        <Route path="/add-user" element={<AddUser />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
};

export default Layout; 