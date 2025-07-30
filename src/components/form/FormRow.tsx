import React from 'react';
import './FormRow.css';

interface Props {
    children: React.ReactNode;
}

const FormRow: React.FC<Props> = ({ children }) => {
    return (
        <div className="form-row">
            {children}
        </div>
    );
};

export default FormRow; 