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
    ariaDescribedBy?: string;
}

const FormField: React.FC<Props> = ({
    label,
    id,
    type,
    value,
    onChange,
    error,
    placeholder,
    required = false,
    ariaDescribedBy
}) => {
    const errorId = `${id}-error`;
    const describedBy = [ariaDescribedBy, error && errorId].filter(Boolean).join(' ');

    return (
        <div className="form-group">
            <label htmlFor={id}>
                {label} {required && <span aria-label="required">*</span>}
            </label>
            <input
                type={type}
                id={id}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className={error ? 'error' : ''}
                placeholder={placeholder}
                required={required}
                aria-describedby={describedBy || undefined}
                aria-invalid={error ? 'true' : 'false'}
                aria-required={required}
            />
            {error && (
                <span 
                    id={errorId} 
                    className="error-message" 
                    role="alert" 
                    aria-live="polite"
                >
                    {error}
                </span>
            )}
        </div>
    );
};

export default FormField; 