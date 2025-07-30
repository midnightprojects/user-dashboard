import React from 'react';
import './FormSection.css';

interface Props {
    title: string;
    children: React.ReactNode;
    id?: string;
}

const FormSection: React.FC<Props> = ({ title, children, id }) => {
    return (
        <section className="form-section" id={id}>
            <h3>{title}</h3>
            <div role="group" aria-labelledby={`${id}-title`}>
                {children}
            </div>
        </section>
    );
};

export default FormSection; 