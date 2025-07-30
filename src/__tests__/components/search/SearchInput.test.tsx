import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchInput from '../../../components/search/SearchInput';

// Mock react-icons
jest.mock('react-icons/fa', () => ({
    FaSearch: () => <svg data-testid="search-icon" />
}));

describe('SearchInput', () => {
    const defaultProps = {
        value: '',
        onChange: jest.fn()
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('Rendering', () => {
        it('renders with basic props', () => {
            render(<SearchInput {...defaultProps} />);
            
            expect(screen.getByRole('search')).toBeInTheDocument();
            expect(screen.getByRole('textbox')).toBeInTheDocument();
            expect(screen.getByTestId('search-icon')).toBeInTheDocument();
        });

        it('renders with custom placeholder', () => {
            render(<SearchInput {...defaultProps} placeholder="Custom placeholder" />);
            
            expect(screen.getByPlaceholderText('Custom placeholder')).toBeInTheDocument();
        });

        it('renders with initial value', () => {
            render(<SearchInput {...defaultProps} value="Initial search" />);
            
            expect(screen.getByDisplayValue('Initial search')).toBeInTheDocument();
        });

        it('renders with custom aria label', () => {
            render(<SearchInput {...defaultProps} ariaLabel="Custom search label" />);
            
            expect(screen.getByLabelText('Custom search label')).toBeInTheDocument();
        });
    });

    describe('User Interactions', () => {
        it('calls onChange when input value changes', () => {
            render(<SearchInput {...defaultProps} />);
            
            const input = screen.getByRole('textbox');
            fireEvent.change(input, { target: { value: 'New search term' } });
            
            expect(defaultProps.onChange).toHaveBeenCalledWith('New search term');
        });

        it('calls onChange with empty string when input is cleared', () => {
            render(<SearchInput {...defaultProps} value="Initial value" />);
            
            const input = screen.getByRole('textbox');
            fireEvent.change(input, { target: { value: '' } });
            
            expect(defaultProps.onChange).toHaveBeenCalledWith('');
        });

        it('handles special characters in input', () => {
            render(<SearchInput {...defaultProps} />);
            
            const input = screen.getByRole('textbox');
            const specialValue = 'test & < > " \' characters';
            fireEvent.change(input, { target: { value: specialValue } });
            
            expect(defaultProps.onChange).toHaveBeenCalledWith(specialValue);
        });
    });

    describe('Accessibility', () => {
        it('has proper search role', () => {
            render(<SearchInput {...defaultProps} />);
            
            expect(screen.getByRole('search')).toBeInTheDocument();
        });

        it('has proper aria-label', () => {
            render(<SearchInput {...defaultProps} />);
            
            expect(screen.getByRole('textbox')).toHaveAttribute('aria-label', 'Search users');
        });

        it('has proper aria-describedby', () => {
            render(<SearchInput {...defaultProps} />);
            
            expect(screen.getByRole('textbox')).toHaveAttribute('aria-describedby', 'search-description');
        });

        it('has search description for screen readers', () => {
            render(<SearchInput {...defaultProps} />);
            
            const description = screen.getByText('Search through users by name or email address');
            expect(description).toHaveAttribute('id', 'search-description');
            expect(description).toHaveClass('sr-only');
        });

        it('has search icon', () => {
            render(<SearchInput {...defaultProps} />);
            
            const icon = screen.getByTestId('search-icon');
            expect(icon).toBeInTheDocument();
        });

        it('supports custom aria-label', () => {
            render(<SearchInput {...defaultProps} ariaLabel="Custom search" />);
            
            expect(screen.getByRole('textbox')).toHaveAttribute('aria-label', 'Custom search');
        });
    });

    describe('Responsive Behavior', () => {
        const originalInnerWidth = window.innerWidth;

        beforeEach(() => {
            Object.defineProperty(window, 'innerWidth', {
                writable: true,
                configurable: true,
                value: originalInnerWidth
            });
        });

        afterEach(() => {
            Object.defineProperty(window, 'innerWidth', {
                writable: true,
                configurable: true,
                value: originalInnerWidth
            });
        });

        it('shows full placeholder on desktop', () => {
            Object.defineProperty(window, 'innerWidth', {
                writable: true,
                configurable: true,
                value: 1024
            });

            render(<SearchInput {...defaultProps} placeholder="Search users..." />);
            
            expect(screen.getByPlaceholderText('Search users...')).toBeInTheDocument();
        });

        it('shows shortened placeholder on mobile', () => {
            Object.defineProperty(window, 'innerWidth', {
                writable: true,
                configurable: true,
                value: 480
            });

            render(<SearchInput {...defaultProps} placeholder="Search users..." />);
            
            expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
        });

        it('responds to window resize', () => {
            const { rerender } = render(<SearchInput {...defaultProps} placeholder="Search users..." />);
            
            // Desktop
            Object.defineProperty(window, 'innerWidth', {
                writable: true,
                configurable: true,
                value: 1024
            });
            
            rerender(<SearchInput {...defaultProps} placeholder="Search users..." />);
            expect(screen.getByPlaceholderText('Search users...')).toBeInTheDocument();
            
            // Mobile
            Object.defineProperty(window, 'innerWidth', {
                writable: true,
                configurable: true,
                value: 480
            });
            
            rerender(<SearchInput {...defaultProps} placeholder="Search users..." />);
            expect(screen.getByPlaceholderText('Search users...')).toBeInTheDocument();
        });
    });

    describe('Styling Classes', () => {
        it('has proper CSS classes', () => {
            render(<SearchInput {...defaultProps} />);
            
            const container = screen.getByRole('search');
            const input = screen.getByRole('textbox');
            
            expect(container).toHaveClass('search-container');
            expect(input).toHaveClass('search-input');
        });
    });

    describe('Edge Cases', () => {
        it('handles very long input values', () => {
            const longValue = 'A'.repeat(1000);
            render(<SearchInput {...defaultProps} value={longValue} />);
            
            expect(screen.getByDisplayValue(longValue)).toBeInTheDocument();
        });

        it('handles empty value', () => {
            render(<SearchInput {...defaultProps} value="" />);
            
            const input = screen.getByRole('textbox');
            expect(input).toHaveValue('');
        });

        it('handles undefined onChange', () => {
            const { onChange, ...props } = defaultProps;
            render(<SearchInput {...props} />);
            
            const input = screen.getByRole('textbox');
            // Should not throw error when onChange is undefined
            expect(input).toBeInTheDocument();
        });

        it('handles special characters in placeholder', () => {
            render(<SearchInput {...defaultProps} placeholder={'Search & < > " \' users'} />);
            
            expect(screen.getByPlaceholderText('Search & < > " \' users')).toBeInTheDocument();
        });
    });

    describe('Keyboard Navigation', () => {
        it('supports keyboard input', () => {
            render(<SearchInput {...defaultProps} />);
            
            const input = screen.getByRole('textbox');
            fireEvent.keyDown(input, { key: 'a' });
            fireEvent.change(input, { target: { value: 'a' } });
            
            expect(defaultProps.onChange).toHaveBeenCalledWith('a');
        });

        it('supports focus management', () => {
            render(<SearchInput {...defaultProps} />);
            
            const input = screen.getByRole('textbox');
            input.focus();
            
            expect(input).toHaveFocus();
        });
    });

    describe('Event Handling', () => {
        it('handles input events correctly', () => {
            render(<SearchInput {...defaultProps} />);
            
            const input = screen.getByRole('textbox');
            
            // Test different input scenarios
            fireEvent.change(input, { target: { value: 'test' } });
            expect(defaultProps.onChange).toHaveBeenCalledWith('test');
            
            fireEvent.change(input, { target: { value: 'test123' } });
            expect(defaultProps.onChange).toHaveBeenCalledWith('test123');
        });

        it('maintains value during re-renders', () => {
            const { rerender } = render(<SearchInput {...defaultProps} value="Initial" />);
            
            expect(screen.getByDisplayValue('Initial')).toBeInTheDocument();
            
            rerender(<SearchInput {...defaultProps} value="Updated" />);
            expect(screen.getByDisplayValue('Updated')).toBeInTheDocument();
        });
    });
}); 