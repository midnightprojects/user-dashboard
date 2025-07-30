import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '../header/Header';
import UserList from '../../pages/user-list/UserList';
import AddUser from '../../pages/add-user/AddUser';
import './Layout.css';

const Layout = () => {
    return (
        <BrowserRouter>
            <div className="layout">
                <Header />
                <main 
                    id="main-content" 
                    className="main-content full-width"
                    role="main"
                    aria-label="Main content"
                >
                    <Routes>
                        <Route path="/" element={<UserList />} />
                        <Route path="/add-user" element={<AddUser />} />
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    );
};

export default Layout; 