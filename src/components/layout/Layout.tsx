import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Header from '../header/Header';
import './Layout.css';

// Lazy load page components for code splitting
const UserList = lazy(() => import('../../pages/user-list/UserList'));
const AddUser = lazy(() => import('../../pages/add-user/AddUser'));

// Loading component for Suspense fallback
const PageLoader = () => (
    <div className="page-loader" role="status" aria-live="polite">
        <div className="loader-spinner"></div>
        <p>Loading page...</p>
    </div>
);

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
                    <Suspense fallback={<PageLoader />}>
                        <Routes>
                            <Route path="/" element={<UserList />} />
                            <Route path="/add-user" element={<AddUser />} />
                        </Routes>
                    </Suspense>
                </main>
            </div>
        </BrowserRouter>
    );
};

export default Layout; 