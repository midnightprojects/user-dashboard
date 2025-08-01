export interface Address {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
        lat: string;
        lng: string;
    };
}

export interface Company {
    name: string;
    catchPhrase: string;
    bs: string;
}

export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    address: Address;
    phone: string;
    website: string;
    company: Company;
}

export interface UserListState {
    users: User[];
    loading: boolean;
    error: string | null;
    searchTerm: string;
    sortField: keyof User | null;
    sortDirection: 'asc' | 'desc';
} 