import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import './SearchInput.css';

interface Props {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

const SearchInput = ({ value, onChange, placeholder = "Search..." }: Props) => {
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
        <div className="search-container">
            <SearchIcon className="search-icon" />
            <input
                type="text"
                placeholder={displayPlaceholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="search-input"
            />
        </div>
    );
};

export default SearchInput; 