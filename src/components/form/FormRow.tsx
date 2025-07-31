import React from 'react';
import styles from './FormRow.module.css';

interface Props {
    children: React.ReactNode;
}

const FormRow: React.FC<Props> = ({ children }) => {
    return (
        <div className={styles.formRow}>
            {children}
        </div>
    );
};

export default FormRow; 