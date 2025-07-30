import { useState, useCallback } from 'react';
import { FormData, FormErrors } from '../types/form';
import { validateRequired, getEmailError, getWebsiteError } from '../utils/validation';

export const useFormValidation = () => {
    const [errors, setErrors] = useState<FormErrors>({});

    const validateForm = useCallback((formData: FormData): boolean => {
        const newErrors: FormErrors = {};

        // Required fields validation
        if (!validateRequired(formData.name)) newErrors.name = 'Name is required';
        if (!validateRequired(formData.username)) newErrors.username = 'Username is required';
        if (!validateRequired(formData.phone)) newErrors.phone = 'Phone is required';
        if (!validateRequired(formData.street)) newErrors.street = 'Street is required';
        if (!validateRequired(formData.city)) newErrors.city = 'City is required';
        if (!validateRequired(formData.zipcode)) newErrors.zipcode = 'Zipcode is required';
        if (!validateRequired(formData.companyName)) newErrors.companyName = 'Company name is required';

        // Email validation
        const emailError = getEmailError(formData.email);
        if (emailError) newErrors.email = emailError;

        // Website validation
        const websiteError = getWebsiteError(formData.website);
        if (websiteError) newErrors.website = websiteError;

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }, []);

    const clearError = useCallback((field: keyof FormData) => {
        setErrors(prev => ({ ...prev, [field]: '' }));
    }, []);

    const setError = useCallback((field: keyof FormData, message: string) => {
        setErrors(prev => ({ ...prev, [field]: message }));
    }, []);

    const clearAllErrors = useCallback(() => {
        setErrors({});
    }, []);

    return {
        errors,
        validateForm,
        clearError,
        setError,
        clearAllErrors
    };
}; 