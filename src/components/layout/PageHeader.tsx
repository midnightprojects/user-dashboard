import React from 'react';
import SearchInput from '../search/SearchInput';
import styles from './PageHeader.module.css';

interface Props {
    title: string;
    searchValue?: string;
    onSearchChange?: (value: string) => void;
    searchPlaceholder?: string;
    searchAriaLabel?: string;
}

const PageHeader: React.FC<Props> = ({
    title,
    searchValue,
    onSearchChange,
    searchPlaceholder = "Search...",
    searchAriaLabel = "Search"
}) => {
    return (
        <div className={styles.headerContainer}>
            <h2 className={styles.headerTitle}>{title}</h2>
            {onSearchChange && (
                <SearchInput
                    value={searchValue || ''}
                    onChange={onSearchChange}
                    placeholder={searchPlaceholder}
                    ariaLabel={searchAriaLabel}
                />
            )}
        </div>
    );
};

export default PageHeader; 