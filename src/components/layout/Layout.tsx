import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Header from '../header/Header';
import styles from './Layout.module.css';

// Lazy load page components for code splitting
const UserList = lazy(() => import('../../pages/user-list/UserList'));
const AddUser = lazy(() => import('../../pages/add-user/AddUser'));

// Loading component for Suspense fallback
const PageLoader = () => (
    <div className={styles.pageLoader} role="status" aria-live="polite">
        <div className={styles.loaderSpinner}></div>
        <p>Loading page...</p>
    </div>
);

const Layout = () => {
    return (
        <BrowserRouter>
            <div className={styles.layout}>
                <Header />
                <main 
                    id="main-content" 
                    className={`${styles.mainContent} ${styles.fullWidth}`}
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