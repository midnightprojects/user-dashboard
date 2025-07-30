export const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const validateRequired = (value: string): boolean => {
    return value.trim().length > 0;
};

export const validateWebsite = (website: string): boolean => {
    if (!website) return true; // Optional field
    return website.startsWith('http://') || website.startsWith('https://');
};

export const getEmailError = (email: string): string | null => {
    if (!email) return 'Email is required';
    if (!validateEmail(email)) return 'Please enter a valid email address';
    return null;
};

export const getWebsiteError = (website: string): string | null => {
    if (!website) return null; // Optional field
    if (!validateWebsite(website)) return 'Website should start with http:// or https://';
    return null;
}; 