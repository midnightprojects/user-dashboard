import React from 'react';
import { FaSearch } from 'react-icons/fa';
import './SearchInput.css';

interface Props {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

const SearchInput = ({ value, onChange, placeholder = "Search..." }: Props) => {
    const SearchIcon = FaSearch as React.FC<React.SVGProps<SVGSVGElement>>;
    
    return (
        <div className="search-container">
            <SearchIcon className="search-icon" />
            <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="search-input"
            />
        </div>
    );
};

export default SearchInput; 