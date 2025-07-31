import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FormActions from '../../../components/form/FormActions';

describe('FormActions', () => {
    const defaultProps = {
        onCancel: jest.fn(),
        onSubmit: jest.fn(),
        submitText: 'Add User'
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('Rendering', () => {
        it('renders with basic props', () => {
            render(<FormActions {...defaultProps} />);
            
            expect(screen.getByText('Add User')).toBeInTheDocument();
            expect(screen.getByText('Cancel')).toBeInTheDocument();
        });

        it('renders with custom cancel text', () => {
            render(<FormActions {...defaultProps} cancelText="Go Back" />);
            
            expect(screen.getByText('Go Back')).toBeInTheDocument();
        });

        it('renders form instructions', () => {
            render(<FormActions {...defaultProps} />);
            
            expect(screen.getByText(/review the information above/i)).toBeInTheDocument();
        });

        it('renders submit button as submit type', () => {
            render(<FormActions {...defaultProps} />);
            
            const submitButton = screen.getByText('Add User');
            expect(submitButton).toHaveAttribute('type', 'submit');
        });

        it('renders cancel button as button type', () => {
            render(<FormActions {...defaultProps} />);
            
            const cancelButton = screen.getByText('Cancel');
            expect(cancelButton).toHaveAttribute('type', 'button');
        });
    });

    describe('Button Interactions', () => {
        it('calls onCancel when cancel button is clicked', () => {
            render(<FormActions {...defaultProps} />);
            
            const cancelButton = screen.getByText('Cancel');
            fireEvent.click(cancelButton);
            
            expect(defaultProps.onCancel).toHaveBeenCalledTimes(1);
        });

        it('calls onSubmit when submit button is clicked', () => {
            render(<FormActions {...defaultProps} />);
            
            const submitButton = screen.getByText('Add User');
            fireEvent.click(submitButton);
            
            expect(defaultProps.onSubmit).toHaveBeenCalledTimes(1);
        });

        it('does not call onSubmit when submit button is disabled', () => {
            render(<FormActions {...defaultProps} submitDisabled />);
            
            const submitButton = screen.getByText('Add User');
            fireEvent.click(submitButton);
            
            expect(defaultProps.onSubmit).not.toHaveBeenCalled();
        });

        it('does not call onSubmit when form is submitting', () => {
            render(<FormActions {...defaultProps} isSubmitting />);
            
            const submitButton = screen.getByText('Submitting...');
            fireEvent.click(submitButton);
            
            expect(defaultProps.onSubmit).not.toHaveBeenCalled();
        });
    });

    describe('Loading State', () => {
        it('shows loading text when isSubmitting is true', () => {
            render(<FormActions {...defaultProps} isSubmitting />);
            
            expect(screen.getByText('Submitting...')).toBeInTheDocument();
            expect(screen.queryByText('Add User')).not.toBeInTheDocument();
        });

        it('disables submit button when isSubmitting is true', () => {
            render(<FormActions {...defaultProps} isSubmitting />);
            
            const submitButton = screen.getByText('Submitting...');
            expect(submitButton).toBeDisabled();
        });

        it('sets aria-busy when isSubmitting is true', () => {
            render(<FormActions {...defaultProps} isSubmitting />);
            
            const submitButton = screen.getByText('Submitting...');
            expect(submitButton).toHaveAttribute('aria-busy', 'true');
        });

        it('does not set aria-busy when not submitting', () => {
            render(<FormActions {...defaultProps} />);
            
            const submitButton = screen.getByText('Add User');
            expect(submitButton).toHaveAttribute('aria-busy', 'false');
        });
    });

    describe('Disabled State', () => {
        it('disables submit button when submitDisabled is true', () => {
            render(<FormActions {...defaultProps} submitDisabled />);
            
            const submitButton = screen.getByText('Add User');
            expect(submitButton).toBeDisabled();
        });

        it('enables submit button when submitDisabled is false', () => {
            render(<FormActions {...defaultProps} submitDisabled={false} />);
            
            const submitButton = screen.getByText('Add User');
            expect(submitButton).not.toBeDisabled();
        });

        it('enables cancel button even when submit is disabled', () => {
            render(<FormActions {...defaultProps} submitDisabled />);
            
            const cancelButton = screen.getByText('Cancel');
            expect(cancelButton).not.toBeDisabled();
        });
    });

    describe('Accessibility', () => {
        it('has proper role and aria-label for form actions group', () => {
            render(<FormActions {...defaultProps} />);
            
            const actionsGroup = screen.getByRole('group');
            expect(actionsGroup).toHaveAttribute('aria-label', 'Form actions');
        });

        it('associates buttons with form instructions', () => {
            render(<FormActions {...defaultProps} />);
            
            const cancelButton = screen.getByText('Cancel');
            const submitButton = screen.getByText('Add User');
            
            expect(cancelButton).toHaveAttribute('aria-describedby', 'form-instructions');
            expect(submitButton).toHaveAttribute('aria-describedby', 'form-instructions');
        });

        it('has proper form instructions with id', () => {
            render(<FormActions {...defaultProps} />);
            
            const instructions = screen.getByText(/review the information above/i);
            expect(instructions).toHaveAttribute('id', 'form-instructions');
        });

        it('provides clear instructions for screen readers', () => {
            render(<FormActions {...defaultProps} />);
            
            const instructions = screen.getByText(/review the information above/i);
            expect(instructions).toHaveTextContent(/ensure all required fields are completed/i);
            expect(instructions).toHaveTextContent(/click "Add User" to save/i);
            expect(instructions).toHaveTextContent(/cancel to return to the user list/i);
        });
    });

    describe('Keyboard Navigation', () => {
        it('supports keyboard navigation between buttons', () => {
            render(<FormActions {...defaultProps} />);
            
            const cancelButton = screen.getByText('Cancel');
            const submitButton = screen.getByText('Add User');
            
            // Focus should work on both buttons
            cancelButton.focus();
            expect(cancelButton).toHaveFocus();
            
            submitButton.focus();
            expect(submitButton).toHaveFocus();
        });

        it('supports Enter key activation', () => {
            render(<FormActions {...defaultProps} />);
            
            const cancelButton = screen.getByText('Cancel');
            fireEvent.click(cancelButton);
            
            expect(defaultProps.onCancel).toHaveBeenCalled();
        });

        it('supports Space key activation', () => {
            render(<FormActions {...defaultProps} />);
            
            const submitButton = screen.getByText('Add User');
            fireEvent.click(submitButton);
            
            expect(defaultProps.onSubmit).toHaveBeenCalled();
        });
    });

    describe('Edge Cases', () => {
        it('handles missing onSubmit prop', () => {
            const { onCancel, submitText } = defaultProps;
            render(<FormActions onCancel={onCancel} submitText={submitText} />);
            
            const submitButton = screen.getByText('Add User');
            fireEvent.click(submitButton);
            
            // Should not throw error
            expect(submitButton).toBeInTheDocument();
        });

        it('handles very long button text', () => {
            const longText = 'A'.repeat(100);
            render(<FormActions {...defaultProps} submitText={longText} />);
            
            expect(screen.getByText(longText)).toBeInTheDocument();
        });

        it('handles special characters in button text', () => {
            const specialText = 'Submit & Save < > " \' data';
            render(<FormActions {...defaultProps} submitText={specialText} />);
            
            expect(screen.getByText(specialText)).toBeInTheDocument();
        });

        it('handles empty submit text', () => {
            render(<FormActions {...defaultProps} submitText="" />);
            
            const submitButton = screen.getByRole('button', { name: '' });
            expect(submitButton).toBeInTheDocument();
        });
    });

    describe('Styling Classes', () => {
        it('has proper CSS classes', () => {
            render(<FormActions {...defaultProps} />);
            
            const actionsGroup = screen.getByRole('group');
            const cancelButton = screen.getByText('Cancel');
            const submitButton = screen.getByText('Add User');
            
            expect(actionsGroup).toHaveClass('formActions');
            expect(cancelButton).toHaveClass('cancelButton');
            expect(submitButton).toHaveClass('submitButton');
        });

        it('maintains classes when disabled', () => {
            render(<FormActions {...defaultProps} submitDisabled />);
            
            const submitButton = screen.getByText('Add User');
            expect(submitButton).toHaveClass('submitButton');
        });
    });
}); 