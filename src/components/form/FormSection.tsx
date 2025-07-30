import React from 'react';
import './FormSection.css';

interface Props {
    title: string;
    children: React.ReactNode;
}

const FormSection: React.FC<Props> = ({ title, children }) => {
    return (
        <div className="form-section">
            <h3>{title}</h3>
            {children}
        </div>
    );
};

export default FormSection; 