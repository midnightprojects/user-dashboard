import {
    validateEmail,
    validateRequired,
    validateWebsite,
    getEmailError,
    getWebsiteError
} from '../../utils/validation';

describe('Validation Utils', () => {
    describe('validateEmail', () => {
        it('validates correct email formats', () => {
            const validEmails = [
                'test@example.com',
                'user.name@domain.co.uk',
                'user+tag@example.org',
                '123@numbers.com',
                'test.email@subdomain.example.com'
            ];

            validEmails.forEach(email => {
                expect(validateEmail(email)).toBe(true);
            });
        });

        it('rejects invalid email formats', () => {
            const invalidEmails = [
                'invalid-email',
                '@example.com',
                'user@',
                'user@.com',
                'user name@example.com',
                'user@example com'
            ];

            invalidEmails.forEach(email => {
                expect(validateEmail(email)).toBe(false);
            });
        });

        it('handles edge cases', () => {
            expect(validateEmail('')).toBe(false);
            expect(validateEmail('   ')).toBe(false);
            expect(validateEmail('a@b.c')).toBe(true); // Minimal valid email
        });
    });

    describe('validateRequired', () => {
        it('validates non-empty strings', () => {
            expect(validateRequired('test')).toBe(true);
            expect(validateRequired('  test  ')).toBe(true);
            expect(validateRequired('0')).toBe(true);
            expect(validateRequired('false')).toBe(true);
        });

        it('rejects empty or whitespace-only strings', () => {
            expect(validateRequired('')).toBe(false);
            expect(validateRequired('   ')).toBe(false);
            expect(validateRequired('\t\n')).toBe(false);
        });

        it('handles special characters', () => {
            expect(validateRequired('!@#$%^&*()')).toBe(true);
            expect(validateRequired('test & < > " \'')).toBe(true);
        });
    });

    describe('validateWebsite', () => {
        it('validates correct website URLs', () => {
            const validWebsites = [
                'http://example.com',
                'https://example.com',
                'http://www.example.com',
                'https://subdomain.example.com',
                'http://example.com/path',
                'https://example.com?param=value'
            ];

            validWebsites.forEach(website => {
                expect(validateWebsite(website)).toBe(true);
            });
        });

        it('rejects invalid website URLs', () => {
            const invalidWebsites = [
                'ftp://example.com',
                'example.com',
                'www.example.com',
                'not-a-url'
            ];

            invalidWebsites.forEach(website => {
                expect(validateWebsite(website)).toBe(false);
            });
        });

        it('allows empty strings (optional field)', () => {
            expect(validateWebsite('')).toBe(true);
            expect(validateWebsite('   ')).toBe(false);
        });
    });

    describe('getEmailError', () => {
        it('returns null for valid emails', () => {
            expect(getEmailError('test@example.com')).toBeNull();
            expect(getEmailError('user.name@domain.co.uk')).toBeNull();
        });

        it('returns error for empty email', () => {
            expect(getEmailError('')).toBe('Email is required');
            expect(getEmailError('   ')).toBe('Please enter a valid email address');
        });

        it('returns error for invalid email format', () => {
            expect(getEmailError('invalid-email')).toBe('Please enter a valid email address');
            expect(getEmailError('user@')).toBe('Please enter a valid email address');
            expect(getEmailError('@example.com')).toBe('Please enter a valid email address');
        });

        it('provides clear error messages', () => {
            const error = getEmailError('invalid');
            expect(error).toBe('Please enter a valid email address');
        });
    });

    describe('getWebsiteError', () => {
        it('returns null for valid websites', () => {
            expect(getWebsiteError('http://example.com')).toBeNull();
            expect(getWebsiteError('https://example.com')).toBeNull();
            expect(getWebsiteError('http://www.example.com')).toBeNull();
        });

        it('returns null for empty website (optional field)', () => {
            expect(getWebsiteError('')).toBeNull();
            expect(getWebsiteError('   ')).toBe('Website should start with http:// or https://');
        });

        it('returns error for invalid website format', () => {
            expect(getWebsiteError('example.com')).toBe('Website should start with http:// or https://');
            expect(getWebsiteError('www.example.com')).toBe('Website should start with http:// or https://');
            expect(getWebsiteError('ftp://example.com')).toBe('Website should start with http:// or https://');
        });

        it('provides clear error messages', () => {
            const error = getWebsiteError('invalid-url');
            expect(error).toBe('Website should start with http:// or https://');
        });
    });

    describe('Integration Tests', () => {
        it('works together for form validation', () => {
            // Simulate a form validation scenario
            const formData = {
                email: 'test@example.com',
                website: 'https://example.com'
            };

            const emailError = getEmailError(formData.email);
            const websiteError = getWebsiteError(formData.website);

            expect(emailError).toBeNull();
            expect(websiteError).toBeNull();
        });

        it('handles mixed valid/invalid data', () => {
            const emailError = getEmailError('invalid-email');
            const websiteError = getWebsiteError('https://valid.com');

            expect(emailError).toBe('Please enter a valid email address');
            expect(websiteError).toBeNull();
        });
    });

    describe('Edge Cases', () => {
        it('handles very long email addresses', () => {
            const longEmail = 'a'.repeat(100) + '@example.com';
            expect(validateEmail(longEmail)).toBe(true);
        });

        it('handles very long website URLs', () => {
            const longWebsite = 'https://' + 'a'.repeat(100) + '.com';
            expect(validateWebsite(longWebsite)).toBe(true);
        });

        it('handles special characters in validation', () => {
            expect(validateRequired('test & < > " \'')).toBe(true);
            expect(validateEmail('test+tag@example.com')).toBe(true);
        });

        it('handles unicode characters', () => {
            expect(validateRequired('testéñ中文')).toBe(true);
            expect(validateEmail('testé@example.com')).toBe(true);
        });
    });
}); 