import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import styles from './SearchInput.module.css';

interface Props {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    ariaLabel?: string;
}

const SearchInput = ({ 
    value, 
    onChange, 
    placeholder = "Search...",
    ariaLabel = "Search users"
}: Props) => {
    const [isMobile, setIsMobile] = useState(false);
    const SearchIcon = FaSearch as React.FC<React.SVGProps<SVGSVGElement>>;

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 480);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const mobilePlaceholder = "Search";
    const displayPlaceholder = isMobile ? mobilePlaceholder : placeholder;

    return (
        <div className={styles.searchContainer} role="search">
            <SearchIcon className={styles.searchIcon} aria-hidden="true" />
            <input
                type="text"
                placeholder={displayPlaceholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className={styles.searchInput}
                aria-label={ariaLabel}
                aria-describedby="search-description"
            />
            <div id="search-description" className={styles.srOnly}>
                Search through users by name or email address
            </div>
        </div>
    );
};

export default SearchInput; 