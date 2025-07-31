import React from 'react';
import styles from './FormSection.module.css';

interface Props {
    title: string;
    children: React.ReactNode;
    id?: string;
}

const FormSection: React.FC<Props> = ({ title, children, id }) => {
    return (
        <section className={styles.formSection} id={id}>
            <h3 className={styles.sectionTitle}>{title}</h3>
            <div role="group" aria-labelledby={`${id}-title`}>
                {children}
            </div>
        </section>
    );
};

export default FormSection; 