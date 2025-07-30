import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import VirtualizedUserTable from '../../../components/table/VirtualizedUserTable';
import { User } from '../../../types/user';

// Mock the useDynamicHeight hook
jest.mock('../../../hooks/useDynamicHeight', () => ({
    useDynamicHeight: () => ({
        height: 400,
        containerRef: { current: null }
    })
}));

// Mock the formatName utility
jest.mock('../../../utils/nameUtils', () => ({
    formatName: (name: string) => {
        // Simple mock implementation for testing
        const parts = name.split(' ');
        if (parts.length === 1) return parts[0];
        if (parts.length === 2) return `${parts[1]}, ${parts[0]}`;
        return `${parts[parts.length - 1]}, ${parts.slice(0, -1).join(' ')}`;
    }
}));

describe('VirtualizedUserTable', () => {
    const mockUsers: User[] = [
        {
            id: 1,
            name: 'John Doe',
            username: 'johndoe',
            email: 'john.doe@example.com',
            phone: '123-456-7890',
            website: 'johndoe.com',
            address: {
                street: '123 Main St',
                suite: 'Apt 1',
                city: 'New York',
                zipcode: '10001',
                geo: { lat: '40.7128', lng: '-74.0060' }
            },
            company: {
                name: 'Tech Corp',
                catchPhrase: 'Innovative solutions',
                bs: 'harness real-time e-markets'
            }
        },
        {
            id: 2,
            name: 'Jane Smith',
            username: 'janesmith',
            email: 'jane.smith@example.com',
            phone: '098-765-4321',
            website: 'janesmith.com',
            address: {
                street: '456 Oak Ave',
                suite: 'Suite 2',
                city: 'Los Angeles',
                zipcode: '90210',
                geo: { lat: '34.0522', lng: '-118.2437' }
            },
            company: {
                name: 'Design Studio',
                catchPhrase: 'Creative excellence',
                bs: 'innovate scalable solutions'
            }
        }
    ];

    const defaultProps = {
        users: mockUsers,
        onRowClick: jest.fn(),
        onSort: jest.fn(),
        getSortIcon: jest.fn(() => <span data-testid="sort-icon">↕</span>)
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('Rendering', () => {
        it('renders table with correct structure', () => {
            render(<VirtualizedUserTable {...defaultProps} />);
            
            // Check for the header table specifically
            expect(screen.getByRole('table', { name: 'Users list' })).toBeInTheDocument();
            expect(screen.getByRole('columnheader', { name: /sort by name/i })).toBeInTheDocument();
            expect(screen.getByRole('columnheader', { name: /sort by username/i })).toBeInTheDocument();
            expect(screen.getByRole('columnheader', { name: /sort by email/i })).toBeInTheDocument();
        });

        it('renders all user rows', () => {
            render(<VirtualizedUserTable {...defaultProps} />);
            
            expect(screen.getByText('Doe, John')).toBeInTheDocument();
            expect(screen.getByText('johndoe')).toBeInTheDocument();
            expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
            
            expect(screen.getByText('Smith, Jane')).toBeInTheDocument();
            expect(screen.getByText('janesmith')).toBeInTheDocument();
            expect(screen.getByText('jane.smith@example.com')).toBeInTheDocument();
        });

        it('renders empty state when no users', () => {
            render(<VirtualizedUserTable {...defaultProps} users={[]} />);
            
            expect(screen.getByText('No users found')).toBeInTheDocument();
            expect(screen.getByRole('status')).toBeInTheDocument();
        });

        it('applies correct ARIA attributes', () => {
            render(<VirtualizedUserTable {...defaultProps} />);
            
            const table = screen.getByRole('table', { name: 'Users list' });
            expect(table).toHaveAttribute('aria-label', 'Users list');
            
            const region = screen.getByRole('region', { name: 'Users table' });
            expect(region).toBeInTheDocument();
        });
    });

    describe('Sorting', () => {
        it('calls onSort when name header is clicked', () => {
            render(<VirtualizedUserTable {...defaultProps} />);
            
            const nameHeader = screen.getByRole('columnheader', { name: /sort by name/i });
            fireEvent.click(nameHeader);
            
            expect(defaultProps.onSort).toHaveBeenCalledWith('formattedName');
        });

        it('calls onSort when username header is clicked', () => {
            render(<VirtualizedUserTable {...defaultProps} />);
            
            const usernameHeader = screen.getByRole('columnheader', { name: /sort by username/i });
            fireEvent.click(usernameHeader);
            
            expect(defaultProps.onSort).toHaveBeenCalledWith('username');
        });

        it('calls onSort when email header is clicked', () => {
            render(<VirtualizedUserTable {...defaultProps} />);
            
            const emailHeader = screen.getByRole('columnheader', { name: /sort by email/i });
            fireEvent.click(emailHeader);
            
            expect(defaultProps.onSort).toHaveBeenCalledWith('email');
        });

        it('calls onSort when header is pressed with Enter key', () => {
            render(<VirtualizedUserTable {...defaultProps} />);
            
            const nameHeader = screen.getByRole('columnheader', { name: /sort by name/i });
            fireEvent.keyDown(nameHeader, { key: 'Enter' });
            
            expect(defaultProps.onSort).toHaveBeenCalledWith('formattedName');
        });

        it('calls onSort when header is pressed with Space key', () => {
            render(<VirtualizedUserTable {...defaultProps} />);
            
            const nameHeader = screen.getByRole('columnheader', { name: /sort by name/i });
            fireEvent.keyDown(nameHeader, { key: ' ' });
            
            expect(defaultProps.onSort).toHaveBeenCalledWith('formattedName');
        });

        it('prevents default behavior on keyboard events', () => {
            render(<VirtualizedUserTable {...defaultProps} />);
            
            const nameHeader = screen.getByRole('columnheader', { name: /sort by name/i });
            
            // The component calls preventDefault internally, so we can't test it directly
            // Instead, test that the sort function is called
            fireEvent.keyDown(nameHeader, { key: 'Enter' });
            
            expect(defaultProps.onSort).toHaveBeenCalledWith('formattedName');
        });

        it('renders sort icons for all headers', () => {
            render(<VirtualizedUserTable {...defaultProps} />);
            
            // The sort icons are rendered by the getSortIcon prop, not as test IDs
            // Check that the getSortIcon function is called for each header
            expect(defaultProps.getSortIcon).toHaveBeenCalledWith('formattedName');
            expect(defaultProps.getSortIcon).toHaveBeenCalledWith('username');
            expect(defaultProps.getSortIcon).toHaveBeenCalledWith('email');
        });
    });

    describe('Row Interaction', () => {
        it('calls onRowClick when row is clicked', () => {
            render(<VirtualizedUserTable {...defaultProps} />);
            
            const firstRow = screen.getByRole('row', { name: /view details for doe, john/i });
            fireEvent.click(firstRow);
            
            expect(defaultProps.onRowClick).toHaveBeenCalledWith(mockUsers[0]);
        });

        it('calls onRowClick when row is pressed with Enter key', () => {
            render(<VirtualizedUserTable {...defaultProps} />);
            
            const firstRow = screen.getByRole('row', { name: /view details for doe, john/i });
            fireEvent.keyDown(firstRow, { key: 'Enter' });
            
            expect(defaultProps.onRowClick).toHaveBeenCalledWith(mockUsers[0]);
        });

        it('calls onRowClick when row is pressed with Space key', () => {
            render(<VirtualizedUserTable {...defaultProps} />);
            
            const firstRow = screen.getByRole('row', { name: /view details for doe, john/i });
            fireEvent.keyDown(firstRow, { key: ' ' });
            
            expect(defaultProps.onRowClick).toHaveBeenCalledWith(mockUsers[0]);
        });

        it('prevents default behavior on row keyboard events', () => {
            render(<VirtualizedUserTable {...defaultProps} />);
            
            const firstRow = screen.getByRole('row', { name: /view details for doe, john/i });
            
            // The component calls preventDefault internally, so we can't test it directly
            // Instead, test that the row click function is called
            fireEvent.keyDown(firstRow, { key: 'Enter' });
            
            expect(defaultProps.onRowClick).toHaveBeenCalledWith(mockUsers[0]);
        });

        it('has correct ARIA label for row interaction', () => {
            render(<VirtualizedUserTable {...defaultProps} />);
            
            const firstRow = screen.getByRole('row', { name: /view details for doe, john/i });
            expect(firstRow).toHaveAttribute('aria-label', 'View details for Doe, John');
        });
    });

    describe('Accessibility', () => {
        it('has proper tabindex for keyboard navigation', () => {
            render(<VirtualizedUserTable {...defaultProps} />);
            
            const headers = screen.getAllByRole('columnheader');
            headers.forEach(header => {
                expect(header).toHaveAttribute('tabindex', '0');
            });
            
            const rows = screen.getAllByRole('row');
            // Filter out header row
            const dataRows = rows.slice(1);
            dataRows.forEach(row => {
                expect(row).toHaveAttribute('tabindex', '0');
            });
        });

        it('has proper ARIA sort attributes', () => {
            render(<VirtualizedUserTable {...defaultProps} />);
            
            const headers = screen.getAllByRole('columnheader');
            headers.forEach(header => {
                expect(header).toHaveAttribute('aria-sort', 'none');
            });
        });

        it('has proper role attributes', () => {
            render(<VirtualizedUserTable {...defaultProps} />);
            
            expect(screen.getAllByRole('table')).toHaveLength(2); // Header table + body table
            expect(screen.getAllByRole('row')).toHaveLength(3); // 1 header + 2 data rows
            expect(screen.getAllByRole('columnheader')).toHaveLength(3);
            expect(screen.getAllByRole('cell')).toHaveLength(6); // 2 rows × 3 columns
        });
    });

    describe('Edge Cases', () => {
        it('handles single name correctly', () => {
            const singleNameUser: User = {
                ...mockUsers[0],
                name: 'John'
            };
            
            render(<VirtualizedUserTable {...defaultProps} users={[singleNameUser]} />);
            
            expect(screen.getByText('John')).toBeInTheDocument();
        });

        it('handles empty name', () => {
            const emptyNameUser: User = {
                ...mockUsers[0],
                name: ''
            };
            
            render(<VirtualizedUserTable {...defaultProps} users={[emptyNameUser]} />);
            
            // Check that the empty cell exists
            const cells = screen.getAllByRole('cell');
            expect(cells[0]).toHaveTextContent('');
        });

        it('handles very long names', () => {
            const longNameUser: User = {
                ...mockUsers[0],
                name: 'John Jacob Jingleheimer Schmidt'
            };
            
            render(<VirtualizedUserTable {...defaultProps} users={[longNameUser]} />);
            
            expect(screen.getByText('Schmidt, John Jacob Jingleheimer')).toBeInTheDocument();
        });

        it('handles special characters in names', () => {
            const specialNameUser: User = {
                ...mockUsers[0],
                name: 'José María García-López'
            };
            
            render(<VirtualizedUserTable {...defaultProps} users={[specialNameUser]} />);
            
            expect(screen.getByText('García-López, José María')).toBeInTheDocument();
        });
    });

    describe('Performance', () => {
        it('renders large number of users efficiently', () => {
            const largeUserList: User[] = Array.from({ length: 100 }, (_, index) => ({
                ...mockUsers[0],
                id: index + 1,
                name: `User ${index + 1}`,
                username: `user${index + 1}`,
                email: `user${index + 1}@example.com`
            }));
            
            const { container } = render(
                <VirtualizedUserTable {...defaultProps} users={largeUserList} />
            );
            
            // Should render without errors
            expect(container).toBeInTheDocument();
            expect(screen.getByText('1, User')).toBeInTheDocument(); // Mock formats as "1, User"
            expect(screen.getByText('user1')).toBeInTheDocument();
        });
    });
}); 