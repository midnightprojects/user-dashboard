import { create } from 'zustand';
import { User } from '../types/user';

interface UserStore {
    users: User[];
    isLoading: boolean;
    error: string | null;
    addUser: (user: User) => void;
    setUsers: (users: User[]) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    clearError: () => void;
}

export const useUserStore = create<UserStore>((set, get) => ({
    users: [],
    isLoading: false,
    error: null,
    
    addUser: (newUser: User) => {
        set((state) => ({
            users: [newUser, ...state.users]
        }));
    },
    
    setUsers: (users: User[]) => {
        set({ users });
    },
    
    setLoading: (loading: boolean) => {
        set({ isLoading: loading });
    },
    
    setError: (error: string | null) => {
        set({ error });
    },
    
    clearError: () => {
        set({ error: null });
    }
})); 