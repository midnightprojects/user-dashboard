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
        <div className="form-actions" role="group" aria-label="Form actions">
            <p id="form-instructions">
                Review the information above and ensure all required fields are completed. Click "Add User" to save the new user to the system, or cancel to return to the user list.
            </p>
            <div className="form-actions-container">
                <button 
                    type="button" 
                    className="cancel-button"
                    onClick={onCancel}
                    aria-describedby="form-instructions"
                >
                    {cancelText}
                </button>
                <button 
                    type="submit" 
                    className="submit-button"
                    disabled={isSubmitting || submitDisabled}
                    onClick={onSubmit}
                    aria-describedby="form-instructions"
                    aria-busy={isSubmitting}
                >
                    {isSubmitting ? 'Submitting...' : submitText}
                </button>
            </div>
        </div>
    );
};

export default FormActions; 