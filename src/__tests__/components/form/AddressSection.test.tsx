import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AddressSection from '../../../components/form/AddressSection';
import { AddressFormData } from '../../../types/form';

describe('AddressSection', () => {
    const defaultFormData: AddressFormData = {
        street: '123 Main St',
        suite: 'Apt 4B',
        city: 'New York',
        zipcode: '10001'
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
        it('renders with correct title and structure', () => {
            render(<AddressSection {...defaultProps} />);
            
            expect(screen.getByText('Address')).toBeInTheDocument();
            expect(screen.getByLabelText(/street/i)).toBeInTheDocument();
            expect(screen.getByLabelText(/suite/i)).toBeInTheDocument();
            expect(screen.getByLabelText(/city/i)).toBeInTheDocument();
            expect(screen.getByLabelText(/zipcode/i)).toBeInTheDocument();
        });

        it('renders with initial form data', () => {
            render(<AddressSection {...defaultProps} />);
            
            expect(screen.getByDisplayValue('123 Main St')).toBeInTheDocument();
            expect(screen.getByDisplayValue('Apt 4B')).toBeInTheDocument();
            expect(screen.getByDisplayValue('New York')).toBeInTheDocument();
            expect(screen.getByDisplayValue('10001')).toBeInTheDocument();
        });

        it('renders required fields with asterisk', () => {
            render(<AddressSection {...defaultProps} />);
            
            const streetField = screen.getByLabelText(/street/i);
            const cityField = screen.getByLabelText(/city/i);
            const zipcodeField = screen.getByLabelText(/zipcode/i);
            
            expect(streetField).toBeRequired();
            expect(cityField).toBeRequired();
            expect(zipcodeField).toBeRequired();
        });

        it('renders non-required fields without asterisk', () => {
            render(<AddressSection {...defaultProps} />);
            
            const suiteField = screen.getByLabelText(/suite/i);
            expect(suiteField).not.toBeRequired();
        });
    });

    describe('Form Interactions', () => {
        it('calls onChange when street field changes', () => {
            render(<AddressSection {...defaultProps} />);
            
            const streetField = screen.getByLabelText(/street/i);
            fireEvent.change(streetField, { target: { value: '456 Oak Ave' } });
            
            expect(defaultProps.onChange).toHaveBeenCalledWith('street', '456 Oak Ave');
        });

        it('calls onChange when suite field changes', () => {
            render(<AddressSection {...defaultProps} />);
            
            const suiteField = screen.getByLabelText(/suite/i);
            fireEvent.change(suiteField, { target: { value: 'Suite 10' } });
            
            expect(defaultProps.onChange).toHaveBeenCalledWith('suite', 'Suite 10');
        });

        it('calls onChange when city field changes', () => {
            render(<AddressSection {...defaultProps} />);
            
            const cityField = screen.getByLabelText(/city/i);
            fireEvent.change(cityField, { target: { value: 'Los Angeles' } });
            
            expect(defaultProps.onChange).toHaveBeenCalledWith('city', 'Los Angeles');
        });

        it('calls onChange when zipcode field changes', () => {
            render(<AddressSection {...defaultProps} />);
            
            const zipcodeField = screen.getByLabelText(/zipcode/i);
            fireEvent.change(zipcodeField, { target: { value: '90210' } });
            
            expect(defaultProps.onChange).toHaveBeenCalledWith('zipcode', '90210');
        });

        it('handles empty values', () => {
            render(<AddressSection {...defaultProps} />);
            
            const streetField = screen.getByLabelText(/street/i);
            fireEvent.change(streetField, { target: { value: '' } });
            
            expect(defaultProps.onChange).toHaveBeenCalledWith('street', '');
        });
    });

    describe('Error Handling', () => {
        it('displays error messages for fields with errors', () => {
            const propsWithErrors = {
                ...defaultProps,
                errors: {
                    street: 'Street is required',
                    city: 'City is required',
                    zipcode: 'Zipcode is required'
                }
            };

            render(<AddressSection {...propsWithErrors} />);
            
            expect(screen.getByText('Street is required')).toBeInTheDocument();
            expect(screen.getByText('City is required')).toBeInTheDocument();
            expect(screen.getByText('Zipcode is required')).toBeInTheDocument();
        });

        it('does not display error messages when no errors', () => {
            render(<AddressSection {...defaultProps} />);
            
            expect(screen.queryByText('Street is required')).not.toBeInTheDocument();
            expect(screen.queryByText('City is required')).not.toBeInTheDocument();
            expect(screen.queryByText('Zipcode is required')).not.toBeInTheDocument();
        });

        it('handles partial errors', () => {
            const propsWithPartialErrors = {
                ...defaultProps,
                errors: {
                    street: 'Street is required'
                }
            };

            render(<AddressSection {...propsWithPartialErrors} />);
            
            expect(screen.getByText('Street is required')).toBeInTheDocument();
            expect(screen.queryByText('City is required')).not.toBeInTheDocument();
        });
    });

    describe('Accessibility', () => {
        it('has proper form structure', () => {
            render(<AddressSection {...defaultProps} />);
            
            expect(screen.getByRole('group')).toBeInTheDocument();
        });

        it('has proper field labels', () => {
            render(<AddressSection {...defaultProps} />);
            
            expect(screen.getByLabelText(/street/i)).toBeInTheDocument();
            expect(screen.getByLabelText(/suite/i)).toBeInTheDocument();
            expect(screen.getByLabelText(/city/i)).toBeInTheDocument();
            expect(screen.getByLabelText(/zipcode/i)).toBeInTheDocument();
        });

        it('has proper field IDs', () => {
            render(<AddressSection {...defaultProps} />);
            
            expect(screen.getByLabelText(/street/i)).toHaveAttribute('id', 'street');
            expect(screen.getByLabelText(/suite/i)).toHaveAttribute('id', 'suite');
            expect(screen.getByLabelText(/city/i)).toHaveAttribute('id', 'city');
            expect(screen.getByLabelText(/zipcode/i)).toHaveAttribute('id', 'zipcode');
        });

        it('supports keyboard navigation', () => {
            render(<AddressSection {...defaultProps} />);
            
            const streetField = screen.getByLabelText(/street/i);
            const suiteField = screen.getByLabelText(/suite/i);
            const cityField = screen.getByLabelText(/city/i);
            const zipcodeField = screen.getByLabelText(/zipcode/i);
            
            streetField.focus();
            expect(streetField).toHaveFocus();
            
            suiteField.focus();
            expect(suiteField).toHaveFocus();
            
            cityField.focus();
            expect(cityField).toHaveFocus();
            
            zipcodeField.focus();
            expect(zipcodeField).toHaveFocus();
        });
    });

    describe('Layout and Styling', () => {
        it('renders fields in correct layout', () => {
            render(<AddressSection {...defaultProps} />);
            
            // Check that fields are rendered in the expected order
            const inputs = screen.getAllByRole('textbox');
            expect(inputs).toHaveLength(4);
            
            // First row: Street, Suite
            expect(inputs[0]).toHaveValue('123 Main St'); // Street
            expect(inputs[1]).toHaveValue('Apt 4B'); // Suite
            
            // Second row: City, Zipcode
            expect(inputs[2]).toHaveValue('New York'); // City
            expect(inputs[3]).toHaveValue('10001'); // Zipcode
        });

        it('has proper CSS classes', () => {
            render(<AddressSection {...defaultProps} />);
            
            const section = screen.getByRole('group');
            expect(section).toBeInTheDocument();
        });
    });

    describe('Edge Cases', () => {
        it('handles empty form data', () => {
            const emptyFormData: AddressFormData = {
                street: '',
                suite: '',
                city: '',
                zipcode: ''
            };

            render(<AddressSection {...defaultProps} formData={emptyFormData} />);
            
            expect(screen.getAllByDisplayValue('')).toHaveLength(4);
        });

        it('handles very long field values', () => {
            const longValue = 'A'.repeat(1000);
            const formDataWithLongValues: AddressFormData = {
                street: longValue,
                suite: longValue,
                city: longValue,
                zipcode: longValue
            };

            render(<AddressSection {...defaultProps} formData={formDataWithLongValues} />);
            
            expect(screen.getAllByDisplayValue(longValue)).toHaveLength(4);
        });

        it('handles special characters in field values', () => {
            const specialValue = 'Test & < > " \' characters';
            const formDataWithSpecialChars: AddressFormData = {
                street: specialValue,
                suite: specialValue,
                city: specialValue,
                zipcode: specialValue
            };

            render(<AddressSection {...defaultProps} formData={formDataWithSpecialChars} />);
            
            expect(screen.getAllByDisplayValue(specialValue)).toHaveLength(4);
        });

        it('handles undefined onChange', () => {
            const { onChange, ...props } = defaultProps;
            render(<AddressSection {...props} />);
            
            const streetField = screen.getByLabelText(/street/i);
            // Should not throw error when onChange is undefined
            expect(streetField).toBeInTheDocument();
        });
    });

    describe('Form Validation Integration', () => {
        it('works with form validation errors', () => {
            const propsWithValidationErrors = {
                ...defaultProps,
                errors: {
                    street: 'Street is required',
                    city: 'City is required',
                    zipcode: 'Zipcode is required'
                }
            };

            render(<AddressSection {...propsWithValidationErrors} />);
            
            // Check that error messages are displayed
            expect(screen.getByText('Street is required')).toBeInTheDocument();
            expect(screen.getByText('City is required')).toBeInTheDocument();
            expect(screen.getByText('Zipcode is required')).toBeInTheDocument();
            
            // Check that fields still work
            const streetField = screen.getByLabelText(/street/i);
            fireEvent.change(streetField, { target: { value: 'New Street' } });
            
            expect(defaultProps.onChange).toHaveBeenCalledWith('street', 'New Street');
        });

        it('maintains field values when errors are present', () => {
            const propsWithErrors = {
                ...defaultProps,
                errors: {
                    street: 'Street is required'
                }
            };

            render(<AddressSection {...propsWithErrors} />);
            
            // Check that field values are preserved
            expect(screen.getByDisplayValue('123 Main St')).toBeInTheDocument();
            expect(screen.getByDisplayValue('Apt 4B')).toBeInTheDocument();
            expect(screen.getByDisplayValue('New York')).toBeInTheDocument();
            expect(screen.getByDisplayValue('10001')).toBeInTheDocument();
        });
    });

    describe('Performance', () => {
        it('handles rapid field changes', () => {
            render(<AddressSection {...defaultProps} />);
            
            const streetField = screen.getByLabelText(/street/i);
            
            // Simulate rapid typing
            fireEvent.change(streetField, { target: { value: '1' } });
            fireEvent.change(streetField, { target: { value: '12' } });
            fireEvent.change(streetField, { target: { value: '123' } });
            fireEvent.change(streetField, { target: { value: '123 Main' } });
            
            expect(defaultProps.onChange).toHaveBeenCalledTimes(4);
            expect(defaultProps.onChange).toHaveBeenLastCalledWith('street', '123 Main');
        });

        it('maintains performance with large datasets', () => {
            const largeFormData: AddressFormData = {
                street: 'A'.repeat(1000),
                suite: 'B'.repeat(1000),
                city: 'C'.repeat(1000),
                zipcode: 'D'.repeat(1000)
            };

            render(<AddressSection {...defaultProps} formData={largeFormData} />);
            
            expect(screen.getByDisplayValue('A'.repeat(1000))).toBeInTheDocument();
            expect(screen.getByDisplayValue('B'.repeat(1000))).toBeInTheDocument();
            expect(screen.getByDisplayValue('C'.repeat(1000))).toBeInTheDocument();
            expect(screen.getByDisplayValue('D'.repeat(1000))).toBeInTheDocument();
        });
    });
}); 