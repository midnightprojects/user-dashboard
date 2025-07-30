import React from 'react';
import './FormActions.css';

interface Props {
    onCancel: () => void;
    onSubmit?: () => void;
    submitText: string;
    cancelText?: string;
    isSubmitting?: boolean;
    submitDisabled?: boolean;
}

const FormActions: React.FC<Props> = ({
    onCancel,
    onSubmit,
    submitText,
    cancelText = 'Cancel',
    isSubmitting = false,
    submitDisabled = false
}) => {
    return (
        <div className="form-actions">
            <button 
                type="button" 
                className="cancel-button"
                onClick={onCancel}
            >
                {cancelText}
            </button>
            <button 
                type="submit" 
                className="submit-button"
                disabled={isSubmitting || submitDisabled}
                onClick={onSubmit}
            >
                {isSubmitting ? 'Submitting...' : submitText}
            </button>
        </div>
    );
};

export default FormActions; 