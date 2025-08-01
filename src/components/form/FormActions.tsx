import React from 'react';
import styles from './FormActions.module.css';

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
        <div className={styles.formActions} role="group" aria-label="Form actions">
            <p id="form-instructions">
                Review the information and ensure all required fields are completed. Click "Add User" to save the new user to the system, or cancel to return to the user list.
            </p>
            <div className={styles.formActionsContainer}>
                <button 
                    type="button" 
                    className={styles.cancelButton}
                    onClick={onCancel}
                    aria-describedby="form-instructions"
                >
                    {cancelText}
                </button>
                <button 
                    type="submit" 
                    className={styles.submitButton}
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