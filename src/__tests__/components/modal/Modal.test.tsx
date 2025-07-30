import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Modal from '../../../components/modal/Modal';
import { User } from '../../../types/user';

describe('Modal', () => {
    const mockUser: User = {
        id: 1,
        name: 'John Doe',
        username: 'johndoe',
        email: 'john.doe@example.com',
        phone: '123-456-7890',
        website: 'https://johndoe.com',
        address: {
            street: '123 Main St',
            suite: 'Apt 4B',
            city: 'New York',
            zipcode: '10001'
        },
        company: {
            name: 'Tech Corp',
            catchPhrase: 'Innovation at its best',
            bs: 'synergize scalable supply-chains'
        }
    };

    const defaultProps = {
        isOpen: false,
        onClose: jest.fn(),
        user: null
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('Rendering', () => {
        it('renders when open with user data', () => {
            render(<Modal {...defaultProps} isOpen={true} user={mockUser} />);
            
            expect(screen.getByRole('dialog')).toBeInTheDocument();
            expect(screen.getByText('User Details')).toBeInTheDocument();
            expect(screen.getByText('John Doe')).toBeInTheDocument();
        });

        it('renders but is hidden when closed', () => {
            render(<Modal {...defaultProps} isOpen={false} user={null} />);
            
            expect(screen.getByRole('dialog')).toBeInTheDocument();
            expect(screen.getByRole('dialog')).not.toHaveClass('show');
        });

        it('renders all user information sections', () => {
            render(<Modal {...defaultProps} isOpen={true} user={mockUser} />);
            
            expect(screen.getByText('Basic Information')).toBeInTheDocument();
            expect(screen.getByText('Address')).toBeInTheDocument();
            expect(screen.getByText('Company')).toBeInTheDocument();
        });

        it('renders user details correctly', () => {
            render(<Modal {...defaultProps} isOpen={true} user={mockUser} />);
            
            // Basic Information
            expect(screen.getByText('John Doe')).toBeInTheDocument();
            expect(screen.getByText('johndoe')).toBeInTheDocument();
            expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
            expect(screen.getByText('123-456-7890')).toBeInTheDocument();
            expect(screen.getByText('https://johndoe.com')).toBeInTheDocument();
            
            // Address
            expect(screen.getByText('123 Main St')).toBeInTheDocument();
            expect(screen.getByText('Apt 4B')).toBeInTheDocument();
            expect(screen.getByText('New York')).toBeInTheDocument();
            expect(screen.getByText('10001')).toBeInTheDocument();
            
            // Company
            expect(screen.getByText('Tech Corp')).toBeInTheDocument();
            expect(screen.getByText('Innovation at its best')).toBeInTheDocument();
            expect(screen.getByText('synergize scalable supply-chains')).toBeInTheDocument();
        });

        it('renders close button', () => {
            render(<Modal {...defaultProps} isOpen={true} user={mockUser} />);
            
            expect(screen.getByRole('button', { name: /close modal/i })).toBeInTheDocument();
        });
    });

    describe('User Interactions', () => {
        it('calls onClose when close button is clicked', () => {
            render(<Modal {...defaultProps} isOpen={true} user={mockUser} />);
            
            const closeButton = screen.getByRole('button', { name: /close modal/i });
            fireEvent.click(closeButton);
            
            expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
        });

        it('calls onClose when overlay is clicked', () => {
            render(<Modal {...defaultProps} isOpen={true} user={mockUser} />);
            
            const overlay = screen.getByRole('dialog');
            fireEvent.click(overlay);
            
            expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
        });

        it('does not call onClose when modal content is clicked', () => {
            render(<Modal {...defaultProps} isOpen={true} user={mockUser} />);
            
            const modalContent = screen.getByRole('document');
            fireEvent.click(modalContent);
            
            expect(defaultProps.onClose).not.toHaveBeenCalled();
        });
    });

    describe('Keyboard Events', () => {
        it('calls onClose when Escape key is pressed', () => {
            render(<Modal {...defaultProps} isOpen={true} user={mockUser} />);
            
            fireEvent.keyDown(document, { key: 'Escape' });
            
            expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
        });

        it('does not call onClose for other keys', () => {
            render(<Modal {...defaultProps} isOpen={true} user={mockUser} />);
            
            fireEvent.keyDown(document, { key: 'Enter' });
            fireEvent.keyDown(document, { key: 'Space' });
            fireEvent.keyDown(document, { key: 'Tab' });
            
            expect(defaultProps.onClose).not.toHaveBeenCalled();
        });
    });

    describe('Accessibility', () => {
        it('has proper dialog role', () => {
            render(<Modal {...defaultProps} isOpen={true} user={mockUser} />);
            
            expect(screen.getByRole('dialog')).toBeInTheDocument();
        });

        it('has proper aria-modal attribute', () => {
            render(<Modal {...defaultProps} isOpen={true} user={mockUser} />);
            
            expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true');
        });

        it('has proper aria-labelledby', () => {
            render(<Modal {...defaultProps} isOpen={true} user={mockUser} />);
            
            expect(screen.getByRole('dialog')).toHaveAttribute('aria-labelledby', 'modal-title');
        });

        it('has proper aria-describedby', () => {
            render(<Modal {...defaultProps} isOpen={true} user={mockUser} />);
            
            expect(screen.getByRole('dialog')).toHaveAttribute('aria-describedby', 'modal-content');
        });

        it('has proper modal title with id', () => {
            render(<Modal {...defaultProps} isOpen={true} user={mockUser} />);
            
            const title = screen.getByText('User Details');
            expect(title).toHaveAttribute('id', 'modal-title');
        });

        it('has proper modal content with id', () => {
            render(<Modal {...defaultProps} isOpen={true} user={mockUser} />);
            
            const content = screen.getByText('Basic Information').closest('div');
            expect(content?.parentElement?.parentElement).toHaveAttribute('id', 'modal-content');
        });

        it('has proper close button accessibility', () => {
            render(<Modal {...defaultProps} isOpen={true} user={mockUser} />);
            
            const closeButton = screen.getByRole('button', { name: /close modal/i });
            expect(closeButton).toHaveAttribute('aria-label', 'Close modal');
            expect(closeButton).toHaveAttribute('type', 'button');
        });
    });

    describe('Focus Management', () => {
        it('focuses close button when modal opens', () => {
            render(<Modal {...defaultProps} isOpen={true} user={mockUser} />);
            
            const closeButton = screen.getByRole('button', { name: /close modal/i });
            expect(closeButton).toHaveFocus();
        });

        it('supports keyboard navigation', () => {
            render(<Modal {...defaultProps} isOpen={true} user={mockUser} />);
            
            const closeButton = screen.getByRole('button', { name: /close modal/i });
            const emailLink = screen.getByText('john.doe@example.com');
            
            // Focus should work on interactive elements
            closeButton.focus();
            expect(closeButton).toHaveFocus();
            
            emailLink.focus();
            expect(emailLink).toHaveFocus();
        });
    });

    describe('Links and Contact Information', () => {
        it('renders email as mailto link', () => {
            render(<Modal {...defaultProps} isOpen={true} user={mockUser} />);
            
            const emailLink = screen.getByText('john.doe@example.com');
            expect(emailLink).toHaveAttribute('href', 'mailto:john.doe@example.com');
        });

        it('renders phone as tel link', () => {
            render(<Modal {...defaultProps} isOpen={true} user={mockUser} />);
            
            const phoneLink = screen.getByText('123-456-7890');
            expect(phoneLink).toHaveAttribute('href', 'tel:123-456-7890');
        });

        it('renders website as external link', () => {
            render(<Modal {...defaultProps} isOpen={true} user={mockUser} />);
            
            const websiteLink = screen.getByText('https://johndoe.com');
            expect(websiteLink).toHaveAttribute('href', 'https://johndoe.com');
            expect(websiteLink).toHaveAttribute('target', '_blank');
            expect(websiteLink).toHaveAttribute('rel', 'noopener noreferrer');
        });
    });

    describe('Body Scroll Management', () => {
        const originalOverflow = document.body.style.overflow;

        beforeEach(() => {
            document.body.style.overflow = originalOverflow;
        });

        afterEach(() => {
            document.body.style.overflow = originalOverflow;
        });

        it('prevents body scroll when modal opens', () => {
            render(<Modal {...defaultProps} isOpen={true} user={mockUser} />);
            
            expect(document.body.style.overflow).toBe('hidden');
        });

        it('restores body scroll when modal closes', () => {
            const { unmount } = render(<Modal {...defaultProps} isOpen={true} user={mockUser} />);
            
            expect(document.body.style.overflow).toBe('hidden');
            
            unmount();
            
            expect(document.body.style.overflow).toBe('unset');
        });
    });

    describe('Edge Cases', () => {
        it('handles null user gracefully', () => {
            render(<Modal {...defaultProps} isOpen={true} user={null} />);
            
            expect(screen.getByRole('dialog')).toBeInTheDocument();
            expect(screen.getByText('User Details')).toBeInTheDocument();
            // Should not crash or show user data
        });

        it('handles user with empty fields', () => {
            const userWithEmptyFields: User = {
                ...mockUser,
                name: '',
                email: '',
                phone: '',
                website: '',
                address: {
                    street: '',
                    suite: '',
                    city: '',
                    zipcode: ''
                },
                company: {
                    name: '',
                    catchPhrase: '',
                    bs: ''
                }
            };

            render(<Modal {...defaultProps} isOpen={true} user={userWithEmptyFields} />);
            
            expect(screen.getByRole('dialog')).toBeInTheDocument();
            // Should render empty fields without crashing
        });

        it('handles very long user data', () => {
            const longValue = 'A'.repeat(1000);
            const userWithLongData: User = {
                ...mockUser,
                name: longValue,
                email: longValue + '@example.com',
                website: 'https://' + longValue + '.com'
            };

            render(<Modal {...defaultProps} isOpen={true} user={userWithLongData} />);
            
            expect(screen.getByText(longValue)).toBeInTheDocument();
        });

        it('handles special characters in user data', () => {
            const specialValue = 'Test & < > " \' characters';
            const userWithSpecialChars: User = {
                ...mockUser,
                name: specialValue,
                company: {
                    ...mockUser.company,
                    name: specialValue
                }
            };

            render(<Modal {...defaultProps} isOpen={true} user={userWithSpecialChars} />);
            
            expect(screen.getAllByText(specialValue)).toHaveLength(2);
        });
    });

    describe('Styling Classes', () => {
        it('has proper CSS classes', () => {
            render(<Modal {...defaultProps} isOpen={true} user={mockUser} />);
            
            const overlay = screen.getByRole('dialog');
            const content = screen.getByRole('document');
            
            expect(overlay).toHaveClass('modal-overlay', 'show');
            expect(content).toHaveClass('modal-content');
        });

        it('applies show class when modal is open', () => {
            render(<Modal {...defaultProps} isOpen={true} user={mockUser} />);
            
            const overlay = screen.getByRole('dialog');
            expect(overlay).toHaveClass('show');
        });

        it('does not apply show class when modal is closed', () => {
            render(<Modal {...defaultProps} isOpen={false} user={null} />);
            
            // Modal should render but not have show class
            expect(screen.getByRole('dialog')).toBeInTheDocument();
            expect(screen.getByRole('dialog')).not.toHaveClass('show');
        });
    });
}); 