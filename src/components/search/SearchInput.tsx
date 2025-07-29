import React from 'react';
import './SearchInput.css';

interface SearchInputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

const SearchInput = ({ value, onChange, placeholder = "Search..." }: SearchInputProps) => {
    return (
        <div className="search-container">
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