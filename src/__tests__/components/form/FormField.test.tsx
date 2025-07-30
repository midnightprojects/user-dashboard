import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FormField from '../../../components/form/FormField';

describe('FormField', () => {
    const defaultProps = {
        label: 'Test Field',
        id: 'test-field',
        type: 'text',
        value: '',
        onChange: jest.fn(),
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('Rendering', () => {
        it('renders with basic props', () => {
            render(<FormField {...defaultProps} />);
            
            expect(screen.getByLabelText('Test Field')).toBeInTheDocument();
            expect(screen.getByRole('textbox')).toBeInTheDocument();
        });

        it('renders with different input types', () => {
            const { rerender } = render(<FormField {...defaultProps} type="email" />);
            expect(screen.getByRole('textbox')).toHaveAttribute('type', 'email');
            
            rerender(<FormField {...defaultProps} type="tel" />);
            expect(screen.getByRole('textbox')).toHaveAttribute('type', 'tel');
            
            rerender(<FormField {...defaultProps} type="url" />);
            expect(screen.getByRole('textbox')).toHaveAttribute('type', 'url');
        });

        it('renders with placeholder', () => {
            render(<FormField {...defaultProps} placeholder="Enter your name" />);
            
            expect(screen.getByPlaceholderText('Enter your name')).toBeInTheDocument();
        });

        it('renders with initial value', () => {
            render(<FormField {...defaultProps} value="John Doe" />);
            
            expect(screen.getByDisplayValue('John Doe')).toBeInTheDocument();
        });
    });

    describe('Required Field', () => {
        it('shows required indicator when required is true', () => {
            render(<FormField {...defaultProps} required />);
            
            expect(screen.getByLabelText('required')).toBeInTheDocument();
            expect(screen.getByRole('textbox')).toHaveAttribute('aria-required', 'true');
        });

        it('does not show required indicator when required is false', () => {
            render(<FormField {...defaultProps} required={false} />);
            
            expect(screen.queryByLabelText('required')).not.toBeInTheDocument();
            expect(screen.getByRole('textbox')).toHaveAttribute('aria-required', 'false');
        });
    });

    describe('Error Handling', () => {
        it('displays error message when error is provided', () => {
            render(<FormField {...defaultProps} error="This field is required" />);
            
            expect(screen.getByText('This field is required')).toBeInTheDocument();
            expect(screen.getByRole('alert')).toBeInTheDocument();
        });

        it('applies error styling when error is present', () => {
            render(<FormField {...defaultProps} error="Error message" />);
            
            const input = screen.getByRole('textbox');
            expect(input).toHaveClass('error');
        });

        it('sets aria-invalid when error is present', () => {
            render(<FormField {...defaultProps} error="Error message" />);
            
            expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
        });

        it('does not set aria-invalid when no error', () => {
            render(<FormField {...defaultProps} />);
            
            expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'false');
        });

        it('associates error message with input via aria-describedby', () => {
            render(<FormField {...defaultProps} error="Error message" />);
            
            const input = screen.getByRole('textbox');
            const errorMessage = screen.getByRole('alert');
            
            expect(input).toHaveAttribute('aria-describedby', 'test-field-error');
            expect(errorMessage).toHaveAttribute('id', 'test-field-error');
        });
    });

    describe('User Interactions', () => {
        it('calls onChange when input value changes', () => {
            render(<FormField {...defaultProps} />);
            
            const input = screen.getByRole('textbox');
            fireEvent.change(input, { target: { value: 'New Value' } });
            
            expect(defaultProps.onChange).toHaveBeenCalledWith('New Value');
        });

        it('calls onChange with empty string when input is cleared', () => {
            render(<FormField {...defaultProps} value="Initial Value" />);
            
            const input = screen.getByRole('textbox');
            fireEvent.change(input, { target: { value: '' } });
            
            expect(defaultProps.onChange).toHaveBeenCalledWith('');
        });
    });

    describe('Accessibility', () => {
        it('has proper label association', () => {
            render(<FormField {...defaultProps} />);
            
            const input = screen.getByRole('textbox');
            const label = screen.getByText('Test Field');
            
            expect(input).toHaveAttribute('id', 'test-field');
            expect(label).toHaveAttribute('for', 'test-field');
        });

        it('supports custom aria-describedby', () => {
            render(<FormField {...defaultProps} ariaDescribedBy="custom-description" />);
            
            expect(screen.getByRole('textbox')).toHaveAttribute('aria-describedby', 'custom-description');
        });

        it('combines custom aria-describedby with error message', () => {
            render(
                <FormField 
                    {...defaultProps} 
                    ariaDescribedBy="custom-description" 
                    error="Error message" 
                />
            );
            
            expect(screen.getByRole('textbox')).toHaveAttribute(
                'aria-describedby', 
                'custom-description test-field-error'
            );
        });

        it('has proper ARIA live region for error messages', () => {
            render(<FormField {...defaultProps} error="Error message" />);
            
            const errorMessage = screen.getByRole('alert');
            expect(errorMessage).toHaveAttribute('aria-live', 'polite');
        });
    });

    describe('Edge Cases', () => {
        it('handles empty error message', () => {
            render(<FormField {...defaultProps} error="" />);
            
            expect(screen.queryByRole('alert')).not.toBeInTheDocument();
        });

        it('handles very long error messages', () => {
            const longError = 'A'.repeat(1000);
            render(<FormField {...defaultProps} error={longError} />);
            
            expect(screen.getByText(longError)).toBeInTheDocument();
        });

        it('handles special characters in label', () => {
            render(<FormField {...defaultProps} label="Field with & < > characters" />);
            
            expect(screen.getByLabelText('Field with & < > characters')).toBeInTheDocument();
        });

        it('handles special characters in placeholder', () => {
            render(<FormField {...defaultProps} placeholder="Enter & < > characters" />);
            
            expect(screen.getByPlaceholderText('Enter & < > characters')).toBeInTheDocument();
        });
    });

    describe('Form Integration', () => {
        it('works with form validation', () => {
            render(<FormField {...defaultProps} required />);
            
            const input = screen.getByRole('textbox');
            expect(input).toHaveAttribute('required');
        });

        it('maintains value during re-renders', () => {
            const { rerender } = render(<FormField {...defaultProps} value="Initial" />);
            
            expect(screen.getByDisplayValue('Initial')).toBeInTheDocument();
            
            rerender(<FormField {...defaultProps} value="Updated" />);
            expect(screen.getByDisplayValue('Updated')).toBeInTheDocument();
        });
    });
}); 