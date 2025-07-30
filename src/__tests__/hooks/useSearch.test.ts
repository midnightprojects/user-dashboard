import { renderHook, act } from '@testing-library/react';
import { useSearch } from '../../hooks/useSearch';
import { User } from '../../types/user';

describe('useSearch', () => {
    const mockUsers: User[] = [
        {
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
        },
        {
            id: 2,
            name: 'Jane Smith',
            username: 'janesmith',
            email: 'jane.smith@example.com',
            phone: '987-654-3210',
            website: 'https://janesmith.com',
            address: {
                street: '456 Oak Ave',
                suite: 'Suite 10',
                city: 'Los Angeles',
                zipcode: '90210'
            },
            company: {
                name: 'Design Studio',
                catchPhrase: 'Creative solutions',
                bs: 'revolutionize end-to-end systems'
            }
        },
        {
            id: 3,
            name: 'Bob Johnson',
            username: 'bobjohnson',
            email: 'bob.johnson@example.com',
            phone: '555-123-4567',
            website: 'https://bobjohnson.com',
            address: {
                street: '789 Pine Rd',
                suite: 'Unit 5',
                city: 'Chicago',
                zipcode: '60601'
            },
            company: {
                name: 'Marketing Pro',
                catchPhrase: 'Results-driven marketing',
                bs: 'implement strategic initiatives'
            }
        }
    ];

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('Initial State', () => {
        it('initializes with empty search term', () => {
            const { result } = renderHook(() => useSearch(mockUsers));
            
            expect(result.current.searchTerm).toBe('');
        });

        it('returns all users when search term is empty', () => {
            const { result } = renderHook(() => useSearch(mockUsers));
            
            expect(result.current.filteredUsers).toEqual(mockUsers);
        });

        it('provides setSearchTerm function', () => {
            const { result } = renderHook(() => useSearch(mockUsers));
            
            expect(typeof result.current.setSearchTerm).toBe('function');
        });
    });

    describe('Search by Name', () => {
        it('filters users by name (case insensitive)', () => {
            const { result } = renderHook(() => useSearch(mockUsers));
            
            act(() => {
                result.current.setSearchTerm('john');
            });
            
            expect(result.current.searchTerm).toBe('john');
            expect(result.current.filteredUsers).toHaveLength(2);
            expect(result.current.filteredUsers.some(user => user.name === 'John Doe')).toBe(true);
            expect(result.current.filteredUsers.some(user => user.name === 'Bob Johnson')).toBe(true);
        });

        it('finds partial name matches', () => {
            const { result } = renderHook(() => useSearch(mockUsers));
            
            act(() => {
                result.current.setSearchTerm('jane');
            });
            
            expect(result.current.filteredUsers).toHaveLength(1);
            expect(result.current.filteredUsers[0].name).toBe('Jane Smith');
        });

        it('handles case insensitive search', () => {
            const { result } = renderHook(() => useSearch(mockUsers));
            
            act(() => {
                result.current.setSearchTerm('JANE');
            });
            
            expect(result.current.filteredUsers).toHaveLength(1);
            expect(result.current.filteredUsers[0].name).toBe('Jane Smith');
        });

        it('returns empty array when no name matches', () => {
            const { result } = renderHook(() => useSearch(mockUsers));
            
            act(() => {
                result.current.setSearchTerm('nonexistent');
            });
            
            expect(result.current.filteredUsers).toHaveLength(0);
        });
    });

    describe('Search by Email', () => {
        it('filters users by email (case insensitive)', () => {
            const { result } = renderHook(() => useSearch(mockUsers));
            
            act(() => {
                result.current.setSearchTerm('jane.smith');
            });
            
            expect(result.current.filteredUsers).toHaveLength(1);
            expect(result.current.filteredUsers[0].email).toBe('jane.smith@example.com');
        });

        it('finds partial email matches', () => {
            const { result } = renderHook(() => useSearch(mockUsers));
            
            act(() => {
                result.current.setSearchTerm('example.com');
            });
            
            expect(result.current.filteredUsers).toHaveLength(3);
        });

        it('handles email domain search', () => {
            const { result } = renderHook(() => useSearch(mockUsers));
            
            act(() => {
                result.current.setSearchTerm('@example');
            });
            
            expect(result.current.filteredUsers).toHaveLength(3);
        });
    });

    describe('Search Behavior', () => {
        it('trims whitespace from search term', () => {
            const { result } = renderHook(() => useSearch(mockUsers));
            
            act(() => {
                result.current.setSearchTerm('  john  ');
            });
            
            expect(result.current.searchTerm).toBe('  john  ');
            expect(result.current.filteredUsers).toHaveLength(0);
        });

        it('returns all users when search term is only whitespace', () => {
            const { result } = renderHook(() => useSearch(mockUsers));
            
            act(() => {
                result.current.setSearchTerm('   ');
            });
            
            expect(result.current.filteredUsers).toEqual(mockUsers);
        });

        it('updates search term when setSearchTerm is called', () => {
            const { result } = renderHook(() => useSearch(mockUsers));
            
            act(() => {
                result.current.setSearchTerm('test');
            });
            
            expect(result.current.searchTerm).toBe('test');
        });
    });

    describe('Multiple Matches', () => {
        it('finds users matching both name and email', () => {
            const { result } = renderHook(() => useSearch(mockUsers));
            
            act(() => {
                result.current.setSearchTerm('jane');
            });
            
            expect(result.current.filteredUsers).toHaveLength(1);
            expect(result.current.filteredUsers[0].name).toBe('Jane Smith');
        });

        it('returns multiple users when search term matches multiple users', () => {
            const { result } = renderHook(() => useSearch(mockUsers));
            
            act(() => {
                result.current.setSearchTerm('example.com');
            });
            
            expect(result.current.filteredUsers).toHaveLength(3);
        });
    });

    describe('Edge Cases', () => {
        it('handles empty users array', () => {
            const { result } = renderHook(() => useSearch([]));
            
            act(() => {
                result.current.setSearchTerm('test');
            });
            
            expect(result.current.filteredUsers).toEqual([]);
        });

        it('handles users with empty name or email', () => {
            const usersWithEmptyFields: User[] = [
                {
                    ...mockUsers[0],
                    name: '',
                    email: ''
                }
            ];
            
            const { result } = renderHook(() => useSearch(usersWithEmptyFields));
            
            act(() => {
                result.current.setSearchTerm('test');
            });
            
            expect(result.current.filteredUsers).toHaveLength(0);
        });

        it('handles very long search terms', () => {
            const { result } = renderHook(() => useSearch(mockUsers));
            
            const longSearchTerm = 'A'.repeat(1000);
            
            act(() => {
                result.current.setSearchTerm(longSearchTerm);
            });
            
            expect(result.current.searchTerm).toBe(longSearchTerm);
            expect(result.current.filteredUsers).toHaveLength(0);
        });

        it('handles special characters in search', () => {
            const { result } = renderHook(() => useSearch(mockUsers));
            
            act(() => {
                result.current.setSearchTerm('test & < > " \'');
            });
            
            expect(result.current.searchTerm).toBe('test & < > " \'');
            expect(result.current.filteredUsers).toHaveLength(0);
        });
    });

    describe('State Updates', () => {
        it('updates filtered results when search term changes', () => {
            const { result } = renderHook(() => useSearch(mockUsers));
            
            // Initial state
            expect(result.current.filteredUsers).toHaveLength(3);
            
            // Search for 'john'
            act(() => {
                result.current.setSearchTerm('john');
            });
            
            expect(result.current.filteredUsers).toHaveLength(2);
            
            // Search for 'jane'
            act(() => {
                result.current.setSearchTerm('jane');
            });
            
            expect(result.current.filteredUsers).toHaveLength(1);
            expect(result.current.filteredUsers[0].name).toBe('Jane Smith');
            
            // Clear search
            act(() => {
                result.current.setSearchTerm('');
            });
            
            expect(result.current.filteredUsers).toHaveLength(3);
        });

        it('maintains search state across re-renders', () => {
            const { result, rerender } = renderHook(() => useSearch(mockUsers));
            
            act(() => {
                result.current.setSearchTerm('john');
            });
            
            rerender();
            
            expect(result.current.searchTerm).toBe('john');
            expect(result.current.filteredUsers).toHaveLength(2);
        });
    });

    describe('Performance', () => {
        it('handles large user lists efficiently', () => {
            const largeUserList: User[] = Array.from({ length: 1000 }, (_, index) => ({
                ...mockUsers[0],
                id: index + 1,
                name: `User ${index + 1}`,
                email: `user${index + 1}@example.com`
            }));
            
            const { result } = renderHook(() => useSearch(largeUserList));
            
            act(() => {
                result.current.setSearchTerm('user500');
            });
            
            expect(result.current.filteredUsers).toHaveLength(1);
            expect(result.current.filteredUsers[0].name).toBe('User 500');
        });

        it('handles rapid search term changes', () => {
            const { result } = renderHook(() => useSearch(mockUsers));
            
            act(() => {
                result.current.setSearchTerm('john');
                result.current.setSearchTerm('jane');
                result.current.setSearchTerm('bob');
            });
            
            expect(result.current.searchTerm).toBe('bob');
            expect(result.current.filteredUsers).toHaveLength(1);
            expect(result.current.filteredUsers[0].name).toBe('Bob Johnson');
        });
    });
}); 