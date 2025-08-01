import React from 'react';
import styles from './TableSkeleton.module.css';

const TableSkeleton: React.FC = () => {
    return (
        <div className={styles.skeletonContainer} role="status" aria-live="polite">
            <div className={styles.skeletonHeader}>
                <div className={styles.skeletonHeaderCell}></div>
                <div className={styles.skeletonHeaderCell}></div>
                <div className={styles.skeletonHeaderCell}></div>
            </div>
            <div className={styles.skeletonBody}>
                {Array.from({ length: 10 }).map((_, index) => (
                    <div key={index} className={styles.skeletonRow}>
                        <div className={styles.skeletonCell}></div>
                        <div className={styles.skeletonCell}></div>
                        <div className={styles.skeletonCell}></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TableSkeleton; 