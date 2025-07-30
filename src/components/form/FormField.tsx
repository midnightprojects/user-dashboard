import React from 'react';
import './FormField.css';

interface Props {
    label: string;
    id: string;
    type: string;
    value: string;
    onChange: (value: string) => void;
    error?: string;
    placeholder?: string;
    required?: boolean;
}

const FormField: React.FC<Props> = ({
    label,
    id,
    type,
    value,
    onChange,
    error,
    placeholder,
    required = false
}) => {
    return (
        <div className="form-group">
            <label htmlFor={id}>
                {label} {required && '*'}
            </label>
            <input
                type={type}
                id={id}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className={error ? 'error' : ''}
                placeholder={placeholder}
                aria-describedby={error ? `${id}-error` : undefined}
            />
            {error && <span id={`${id}-error`} className="error-message">{error}</span>}
        </div>
    );
};

export default FormField; 