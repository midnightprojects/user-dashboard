import { formatName } from '../../utils/nameUtils';

describe('formatName', () => {
    describe('Basic name formatting', () => {
        it('formats two-part names correctly', () => {
            expect(formatName('John Doe')).toBe('Doe, John');
            expect(formatName('Jane Smith')).toBe('Smith, Jane');
            expect(formatName('Bob Wilson')).toBe('Wilson, Bob');
        });

        it('handles single names', () => {
            expect(formatName('John')).toBe('John');
            expect(formatName('Madonna')).toBe('Madonna');
            expect(formatName('Cher')).toBe('Cher');
        });

        it('handles three or more part names', () => {
            expect(formatName('John Jacob Smith')).toBe('Smith, John Jacob');
            expect(formatName('Mary Jane Wilson')).toBe('Wilson, Mary Jane');
            expect(formatName('Robert John Smith Jr')).toBe('Jr, Robert John Smith');
        });
    });

    describe('Title removal', () => {
        it('removes common titles', () => {
            expect(formatName('Mr. John Doe')).toBe('Doe, John');
            expect(formatName('Mrs. Jane Smith')).toBe('Smith, Jane');
            expect(formatName('Ms. Mary Wilson')).toBe('Wilson, Mary');
            expect(formatName('Dr. Robert Brown')).toBe('Brown, Robert');
            expect(formatName('Prof. David Johnson')).toBe('Johnson, David');
        });

        it('removes titles without periods', () => {
            expect(formatName('Mr John Doe')).toBe('Doe, Mr John');
            expect(formatName('Mrs Jane Smith')).toBe('Smith, Jane');
            expect(formatName('Dr Robert Brown')).toBe('Brown, Dr Robert');
        });

        it('removes various title formats', () => {
            expect(formatName('Sir John Smith')).toBe('Smith, John');
            expect(formatName('Madam Jane Wilson')).toBe('Wilson, Jane');
            expect(formatName('Lord Robert Brown')).toBe('Brown, Robert');
            expect(formatName('Lady Mary Johnson')).toBe('Johnson, Mary');
        });

        it('handles case insensitive title removal', () => {
            expect(formatName('mr. John Doe')).toBe('Doe, John');
            expect(formatName('MRS. Jane Smith')).toBe('Smith, Jane');
            expect(formatName('Dr. Robert Brown')).toBe('Brown, Robert');
        });
    });

    describe('Roman numerals', () => {
        it('handles Roman numerals correctly', () => {
            expect(formatName('John Smith III')).toBe('Smith, John III');
            expect(formatName('Robert Johnson IV')).toBe('Johnson, Robert IV');
            expect(formatName('William Brown V')).toBe('Brown, William V');
            expect(formatName('David Wilson VI')).toBe('Wilson, David VI');
        });

        it('handles complex names with Roman numerals', () => {
            expect(formatName('John Jacob Smith III')).toBe('Smith, John Jacob III');
            expect(formatName('Robert John Johnson IV')).toBe('Johnson, Robert John IV');
        });

        it('distinguishes between Roman numerals and regular names', () => {
            expect(formatName('John Smith III')).toBe('Smith, John III');
            expect(formatName('John Smith III Jr')).toBe('Jr, John Smith III');
        });
    });

    describe('Edge cases', () => {
        it('handles empty string', () => {
            expect(formatName('')).toBe('undefined, ');
        });

        it('handles whitespace only', () => {
            expect(formatName('   ')).toBe('undefined, ');
        });

        it('handles extra whitespace', () => {
            expect(formatName('  John   Doe  ')).toBe('Doe, John');
            expect(formatName('  Mr.   John   Doe  ')).toBe('Doe, John');
        });

        it('handles names with multiple spaces', () => {
            expect(formatName('John    Doe')).toBe('Doe, John');
            expect(formatName('Mary   Jane   Wilson')).toBe('Wilson, Mary Jane');
        });
    });

    describe('Special characters and international names', () => {
        it('handles names with hyphens', () => {
            expect(formatName('Jean-Pierre Dupont')).toBe('Dupont, Jean-Pierre');
            expect(formatName('Mary-Jane Smith')).toBe('Smith, Mary-Jane');
        });

        it('handles names with apostrophes', () => {
            expect(formatName("O'Connor")).toBe("O'Connor");
            expect(formatName("Mary O'Connor")).toBe("O'Connor, Mary");
        });

        it('handles accented characters', () => {
            expect(formatName('José García')).toBe('García, José');
            expect(formatName('François Dubois')).toBe('Dubois, François');
        });

        it('handles names with dots', () => {
            expect(formatName('St. John Smith')).toBe('Smith, St. John');
            expect(formatName('Van der Berg')).toBe('Berg, Van der');
        });
    });

    describe('Complex scenarios', () => {
        it('handles names with titles and Roman numerals', () => {
            expect(formatName('Dr. John Smith III')).toBe('Smith, John III');
            expect(formatName('Prof. Robert Johnson IV')).toBe('Johnson, Robert IV');
        });

        it('handles very long names', () => {
            expect(formatName('John Jacob Jingleheimer Schmidt')).toBe('Schmidt, John Jacob Jingleheimer');
        });

        it('handles names with multiple titles', () => {
            expect(formatName('Dr. Mr. John Doe')).toBe('Doe, Mr. John');
            expect(formatName('Prof. Dr. Jane Smith')).toBe('Smith, Dr. Jane');
        });

        it('handles names with numbers', () => {
            expect(formatName('John Smith 2nd')).toBe('2nd, John Smith');
            expect(formatName('Robert Johnson 3rd')).toBe('3rd, Robert Johnson');
        });
    });

    describe('Real-world examples', () => {
        it('handles common name patterns', () => {
            expect(formatName('William Shakespeare')).toBe('Shakespeare, William');
            expect(formatName('Albert Einstein')).toBe('Einstein, Albert');
            expect(formatName('Marie Curie')).toBe('Curie, Marie');
            expect(formatName('Leonardo da Vinci')).toBe('Vinci, Leonardo da');
        });

        it('handles modern names', () => {
            expect(formatName('Barack Obama')).toBe('Obama, Barack');
            expect(formatName('Hillary Clinton')).toBe('Clinton, Hillary');
            expect(formatName('Donald Trump')).toBe('Trump, Donald');
        });
    });
}); 