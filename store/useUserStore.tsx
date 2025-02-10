import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
    userId: number;
    email: string;
    file: string;
    name: string;
}

interface UserStore {
    user: User | null;
    setUser: (user: User) => void;
    logout: () => void;
    isLoggedIn: () => boolean;
}

export const useUserStore = create<UserStore, [["zustand/persist", UserStore]]>(
    persist(
        (set, get) => ({
            user: null,
            setUser: (user) => set({ user }),
            logout: () => set({ user: null }),
            isLoggedIn: () => get().user !== null,
        }),
        {
            name: 'user-storage',
        }
    )
);