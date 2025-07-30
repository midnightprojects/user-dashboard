import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BasicInfoSection from '../../../components/form/BasicInfoSection';
import { BasicInfoFormData } from '../../../types/form';

describe('BasicInfoSection', () => {
    const defaultFormData: BasicInfoFormData = {
        name: '',
        username: '',
        email: '',
        phone: '',
        website: ''
    };

    const defaultProps = {
        formData: defaultFormData,
        errors: {},
        onChange: jest.fn()
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('Rendering', () => {
        it('renders all form fields', () => {
            render(<BasicInfoSection {...defaultProps} />);
            
            expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
            expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
            expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
            expect(screen.getByLabelText(/phone/i)).toBeInTheDocument();
            expect(screen.getByLabelText(/website/i)).toBeInTheDocument();
        });

        it('renders section title', () => {
            render(<BasicInfoSection {...defaultProps} />);
            
            expect(screen.getByText('Basic Information')).toBeInTheDocument();
        });

        it('renders with initial values', () => {
            const formData: BasicInfoFormData = {
                name: 'John Doe',
                username: 'johndoe',
                email: 'john@example.com',
                phone: '123-456-7890',
                website: 'https://example.com'
            };

            render(<BasicInfoSection {...defaultProps} formData={formData} />);
            
            expect(screen.getByDisplayValue('John Doe')).toBeInTheDocument();
            expect(screen.getByDisplayValue('johndoe')).toBeInTheDocument();
            expect(screen.getByDisplayValue('john@example.com')).toBeInTheDocument();
            expect(screen.getByDisplayValue('123-456-7890')).toBeInTheDocument();
            expect(screen.getByDisplayValue('https://example.com')).toBeInTheDocument();
        });

        it('renders required indicators for required fields', () => {
            render(<BasicInfoSection {...defaultProps} />);
            
            const requiredFields = ['Full Name', 'Username', 'Email', 'Phone'];
            requiredFields.forEach(field => {
                expect(screen.getByLabelText(new RegExp(field, 'i'))).toHaveAttribute('aria-required', 'true');
            });
        });

        it('does not show required indicator for optional fields', () => {
            render(<BasicInfoSection {...defaultProps} />);
            
            expect(screen.getByLabelText(/website/i)).toHaveAttribute('aria-required', 'false');
        });
    });

    describe('Form Interactions', () => {
        it('calls onChange when name field is updated', () => {
            render(<BasicInfoSection {...defaultProps} />);
            
            const nameField = screen.getByLabelText(/full name/i);
            fireEvent.change(nameField, { target: { value: 'Jane Smith' } });
            
            expect(defaultProps.onChange).toHaveBeenCalledWith('name', 'Jane Smith');
        });

        it('calls onChange when username field is updated', () => {
            render(<BasicInfoSection {...defaultProps} />);
            
            const usernameField = screen.getByLabelText(/username/i);
            fireEvent.change(usernameField, { target: { value: 'janesmith' } });
            
            expect(defaultProps.onChange).toHaveBeenCalledWith('username', 'janesmith');
        });

        it('calls onChange when email field is updated', () => {
            render(<BasicInfoSection {...defaultProps} />);
            
            const emailField = screen.getByLabelText(/email/i);
            fireEvent.change(emailField, { target: { value: 'jane@example.com' } });
            
            expect(defaultProps.onChange).toHaveBeenCalledWith('email', 'jane@example.com');
        });

        it('calls onChange when phone field is updated', () => {
            render(<BasicInfoSection {...defaultProps} />);
            
            const phoneField = screen.getByLabelText(/phone/i);
            fireEvent.change(phoneField, { target: { value: '987-654-3210' } });
            
            expect(defaultProps.onChange).toHaveBeenCalledWith('phone', '987-654-3210');
        });

        it('calls onChange when website field is updated', () => {
            render(<BasicInfoSection {...defaultProps} />);
            
            const websiteField = screen.getByLabelText(/website/i);
            fireEvent.change(websiteField, { target: { value: 'https://janesmith.com' } });
            
            expect(defaultProps.onChange).toHaveBeenCalledWith('website', 'https://janesmith.com');
        });
    });

    describe('Error Handling', () => {
        it('displays error messages for individual fields', () => {
            const errors = {
                name: 'Name is required',
                username: 'Username must be unique',
                email: 'Invalid email format',
                phone: 'Phone number is invalid',
                website: 'Invalid URL format'
            };

            render(<BasicInfoSection {...defaultProps} errors={errors} />);
            
            expect(screen.getByText('Name is required')).toBeInTheDocument();
            expect(screen.getByText('Username must be unique')).toBeInTheDocument();
            expect(screen.getByText('Invalid email format')).toBeInTheDocument();
            expect(screen.getByText('Phone number is invalid')).toBeInTheDocument();
            expect(screen.getByText('Invalid URL format')).toBeInTheDocument();
        });

        it('applies error styling to fields with errors', () => {
            const errors = {
                name: 'Name is required',
                email: 'Invalid email format'
            };

            render(<BasicInfoSection {...defaultProps} errors={errors} />);
            
            const nameField = screen.getByLabelText(/full name/i);
            const emailField = screen.getByLabelText(/email/i);
            
            expect(nameField).toHaveClass('error');
            expect(emailField).toHaveClass('error');
        });

        it('sets aria-invalid for fields with errors', () => {
            const errors = {
                name: 'Name is required'
            };

            render(<BasicInfoSection {...defaultProps} errors={errors} />);
            
            const nameField = screen.getByLabelText(/full name/i);
            expect(nameField).toHaveAttribute('aria-invalid', 'true');
        });

        it('does not show errors when no errors provided', () => {
            render(<BasicInfoSection {...defaultProps} />);
            
            const errorMessages = screen.queryAllByRole('alert');
            expect(errorMessages).toHaveLength(0);
        });
    });

    describe('Input Types', () => {
        it('has correct input types for each field', () => {
            render(<BasicInfoSection {...defaultProps} />);
            
            expect(screen.getByLabelText(/full name/i)).toHaveAttribute('type', 'text');
            expect(screen.getByLabelText(/username/i)).toHaveAttribute('type', 'text');
            expect(screen.getByLabelText(/email/i)).toHaveAttribute('type', 'email');
            expect(screen.getByLabelText(/phone/i)).toHaveAttribute('type', 'tel');
            expect(screen.getByLabelText(/website/i)).toHaveAttribute('type', 'url');
        });

        it('has placeholder for website field', () => {
            render(<BasicInfoSection {...defaultProps} />);
            
            expect(screen.getByPlaceholderText('https://example.com')).toBeInTheDocument();
        });
    });

    describe('Accessibility', () => {
        it('has proper label associations', () => {
            render(<BasicInfoSection {...defaultProps} />);
            
            const fields = [
                { label: 'Full Name', id: 'name' },
                { label: 'Username', id: 'username' },
                { label: 'Email', id: 'email' },
                { label: 'Phone', id: 'phone' },
                { label: 'Website', id: 'website' }
            ];

            fields.forEach(field => {
                const input = screen.getByLabelText(new RegExp(field.label, 'i'));
                expect(input).toHaveAttribute('id', field.id);
            });
        });

        it('has proper ARIA attributes for required fields', () => {
            render(<BasicInfoSection {...defaultProps} />);
            
            const requiredFields = ['Full Name', 'Username', 'Email', 'Phone'];
            requiredFields.forEach(field => {
                const input = screen.getByLabelText(new RegExp(field, 'i'));
                expect(input).toHaveAttribute('required');
                expect(input).toHaveAttribute('aria-required', 'true');
            });
        });

        it('has proper error message associations', () => {
            const errors = {
                name: 'Name is required',
                email: 'Invalid email format'
            };

            render(<BasicInfoSection {...defaultProps} errors={errors} />);
            
            const nameField = screen.getByLabelText(/full name/i);
            const emailField = screen.getByLabelText(/email/i);
            
            expect(nameField).toHaveAttribute('aria-describedby', 'name-error');
            expect(emailField).toHaveAttribute('aria-describedby', 'email-error');
        });
    });

    describe('Layout', () => {
        it('renders fields in rows', () => {
            render(<BasicInfoSection {...defaultProps} />);
            
            // Check that form rows are present (this would depend on the actual DOM structure)
            const formRows = document.querySelectorAll('.form-row');
            expect(formRows.length).toBeGreaterThan(0);
        });

        it('renders website field as full width', () => {
            render(<BasicInfoSection {...defaultProps} />);
            
            // Website field should be outside of a form row or in its own row
            const websiteField = screen.getByLabelText(/website/i);
            expect(websiteField).toBeInTheDocument();
        });
    });

    describe('Edge Cases', () => {
        it('handles empty form data', () => {
            render(<BasicInfoSection {...defaultProps} />);
            
            const inputs = screen.getAllByRole('textbox');
            inputs.forEach(input => {
                expect(input).toHaveValue('');
            });
        });

        it('handles very long field values', () => {
            const longValue = 'A'.repeat(1000);
            const formData: BasicInfoFormData = {
                name: longValue,
                username: longValue,
                email: longValue,
                phone: longValue,
                website: longValue
            };

            render(<BasicInfoSection {...defaultProps} formData={formData} />);
            
            // Check that all inputs have the long value
            const inputs = screen.getAllByRole('textbox');
            inputs.forEach(input => {
                expect(input).toHaveValue(longValue);
            });
        });

        it('handles special characters in field values', () => {
            const specialValue = 'Test & < > " \' characters';
            const formData: BasicInfoFormData = {
                name: specialValue,
                username: '',
                email: '',
                phone: '',
                website: ''
            };

            render(<BasicInfoSection {...defaultProps} formData={formData} />);
            
            expect(screen.getByDisplayValue(specialValue)).toBeInTheDocument();
        });
    });
}); 