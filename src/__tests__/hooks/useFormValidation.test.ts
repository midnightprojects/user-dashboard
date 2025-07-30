import { renderHook, act } from '@testing-library/react';
import { useFormValidation } from '../../hooks/useFormValidation';
import { FormData } from '../../types/form';

describe('useFormValidation', () => {
    const mockFormData: FormData = {
        name: 'John Doe',
        username: 'johndoe',
        email: 'john@example.com',
        phone: '123-456-7890',
        website: 'https://example.com',
        street: '123 Main St',
        suite: 'Apt 4B',
        city: 'New York',
        zipcode: '10001',
        companyName: 'Tech Corp',
        catchPhrase: 'Innovation at its best',
        bs: 'synergize scalable supply-chains'
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('Initial State', () => {
        it('initializes with empty errors', () => {
            const { result } = renderHook(() => useFormValidation());
            
            expect(result.current.errors).toEqual({});
        });

        it('provides all required methods', () => {
            const { result } = renderHook(() => useFormValidation());
            
            expect(typeof result.current.validateForm).toBe('function');
            expect(typeof result.current.clearError).toBe('function');
            expect(typeof result.current.setError).toBe('function');
            expect(typeof result.current.clearAllErrors).toBe('function');
        });
    });

    describe('validateForm', () => {
        it('returns true for valid form data', () => {
            const { result } = renderHook(() => useFormValidation());
            
            act(() => {
                const isValid = result.current.validateForm(mockFormData);
                expect(isValid).toBe(true);
            });
            
            expect(result.current.errors).toEqual({});
        });

        it('returns false and sets errors for invalid form data', () => {
            const { result } = renderHook(() => useFormValidation());
            
            const invalidFormData: FormData = {
                ...mockFormData,
                name: '',
                email: 'invalid-email',
                website: 'invalid-url'
            };
            
            act(() => {
                const isValid = result.current.validateForm(invalidFormData);
                expect(isValid).toBe(false);
            });
            
            expect(result.current.errors).toEqual({
                name: 'Name is required',
                email: 'Please enter a valid email address',
                website: 'Website should start with http:// or https://'
            });
        });

        it('validates all required fields', () => {
            const { result } = renderHook(() => useFormValidation());
            
            const emptyFormData: FormData = {
                name: '',
                username: '',
                email: '',
                phone: '',
                website: '',
                street: '',
                suite: '',
                city: '',
                zipcode: '',
                companyName: '',
                catchPhrase: '',
                bs: ''
            };
            
            act(() => {
                const isValid = result.current.validateForm(emptyFormData);
                expect(isValid).toBe(false);
            });
            
            expect(result.current.errors).toEqual({
                name: 'Name is required',
                username: 'Username is required',
                phone: 'Phone is required',
                street: 'Street is required',
                city: 'City is required',
                zipcode: 'Zipcode is required',
                companyName: 'Company name is required',
                email: 'Email is required'
            });
        });

        it('handles partial validation errors', () => {
            const { result } = renderHook(() => useFormValidation());
            
            const partialInvalidData: FormData = {
                ...mockFormData,
                name: '',
                email: 'invalid-email'
            };
            
            act(() => {
                const isValid = result.current.validateForm(partialInvalidData);
                expect(isValid).toBe(false);
            });
            
            expect(result.current.errors).toEqual({
                name: 'Name is required',
                email: 'Please enter a valid email address'
            });
        });

        it('allows empty website (optional field)', () => {
            const { result } = renderHook(() => useFormValidation());
            
            const formDataWithoutWebsite: FormData = {
                ...mockFormData,
                website: ''
            };
            
            act(() => {
                const isValid = result.current.validateForm(formDataWithoutWebsite);
                expect(isValid).toBe(true);
            });
            
            expect(result.current.errors).toEqual({});
        });
    });

    describe('clearError', () => {
        it('clears specific field error', () => {
            const { result } = renderHook(() => useFormValidation());
            
            // First, set some errors
            act(() => {
                result.current.validateForm({
                    ...mockFormData,
                    name: '',
                    email: 'invalid-email'
                });
            });
            
            expect(result.current.errors.name).toBe('Name is required');
            expect(result.current.errors.email).toBe('Please enter a valid email address');
            
            // Clear name error
            act(() => {
                result.current.clearError('name');
            });
            
            expect(result.current.errors.name).toBe('');
            expect(result.current.errors.email).toBe('Please enter a valid email address');
        });

        it('handles clearing non-existent errors', () => {
            const { result } = renderHook(() => useFormValidation());
            
            act(() => {
                result.current.clearError('name');
            });
            
            expect(result.current.errors).toEqual({ name: '' });
        });
    });

    describe('setError', () => {
        it('sets error for specific field', () => {
            const { result } = renderHook(() => useFormValidation());
            
            act(() => {
                result.current.setError('name', 'Custom name error');
            });
            
            expect(result.current.errors.name).toBe('Custom name error');
        });

        it('overwrites existing errors', () => {
            const { result } = renderHook(() => useFormValidation());
            
            act(() => {
                result.current.setError('name', 'First error');
            });
            
            expect(result.current.errors.name).toBe('First error');
            
            act(() => {
                result.current.setError('name', 'Second error');
            });
            
            expect(result.current.errors.name).toBe('Second error');
        });

        it('preserves other errors when setting new ones', () => {
            const { result } = renderHook(() => useFormValidation());
            
            act(() => {
                result.current.setError('name', 'Name error');
                result.current.setError('email', 'Email error');
            });
            
            expect(result.current.errors).toEqual({
                name: 'Name error',
                email: 'Email error'
            });
        });
    });

    describe('clearAllErrors', () => {
        it('clears all errors', () => {
            const { result } = renderHook(() => useFormValidation());
            
            // Set some errors
            act(() => {
                result.current.setError('name', 'Name error');
                result.current.setError('email', 'Email error');
            });
            
            expect(Object.keys(result.current.errors)).toHaveLength(2);
            
            // Clear all errors
            act(() => {
                result.current.clearAllErrors();
            });
            
            expect(result.current.errors).toEqual({});
        });

        it('works when no errors exist', () => {
            const { result } = renderHook(() => useFormValidation());
            
            act(() => {
                result.current.clearAllErrors();
            });
            
            expect(result.current.errors).toEqual({});
        });
    });

    describe('Error State Management', () => {
        it('maintains error state across re-renders', () => {
            const { result, rerender } = renderHook(() => useFormValidation());
            
            act(() => {
                result.current.setError('name', 'Name error');
            });
            
            rerender();
            
            expect(result.current.errors.name).toBe('Name error');
        });

        it('handles multiple validation cycles', () => {
            const { result } = renderHook(() => useFormValidation());
            
            // First validation - invalid
            act(() => {
                const isValid1 = result.current.validateForm({
                    ...mockFormData,
                    name: ''
                });
                expect(isValid1).toBe(false);
            });
            
            expect(result.current.errors.name).toBe('Name is required');
            
            // Second validation - valid
            act(() => {
                const isValid2 = result.current.validateForm(mockFormData);
                expect(isValid2).toBe(true);
            });
            
            expect(result.current.errors).toEqual({});
        });
    });

    describe('Edge Cases', () => {
        it('handles very long field values', () => {
            const { result } = renderHook(() => useFormValidation());
            
            const longValue = 'A'.repeat(1000);
            const formDataWithLongValues: FormData = {
                ...mockFormData,
                name: longValue,
                email: longValue + '@example.com'
            };
            
            act(() => {
                const isValid = result.current.validateForm(formDataWithLongValues);
                expect(isValid).toBe(true);
            });
            
            expect(result.current.errors).toEqual({});
        });

        it('handles special characters in field values', () => {
            const { result } = renderHook(() => useFormValidation());
            
            const specialValue = 'Test & < > " \' characters';
            const formDataWithSpecialChars: FormData = {
                ...mockFormData,
                name: specialValue
            };
            
            act(() => {
                const isValid = result.current.validateForm(formDataWithSpecialChars);
                expect(isValid).toBe(true);
            });
            
            expect(result.current.errors).toEqual({});
        });

        it('handles empty form data', () => {
            const { result } = renderHook(() => useFormValidation());
            
            const emptyFormData: FormData = {
                name: '',
                username: '',
                email: '',
                phone: '',
                website: '',
                street: '',
                suite: '',
                city: '',
                zipcode: '',
                companyName: '',
                catchPhrase: '',
                bs: ''
            };
            
            act(() => {
                const isValid = result.current.validateForm(emptyFormData);
                expect(isValid).toBe(false);
            });
            
            expect(Object.keys(result.current.errors).length).toBeGreaterThan(0);
        });
    });
}); 