import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
    userId: string;
    email: string;
    file: string;
    name: string;
}

interface UserStore {
    user: User | null;
    setUser: (user: User) => void;
    updateUser: (user: Partial<User>) => void;
    logout: () => void;
    isLoggedIn: () => boolean;
}

export const useUserStore = create<UserStore, [["zustand/persist", UserStore]]>(
    persist(
        (set, get) => ({
            user: null,
            setUser: (user) => set({ user }),
            updateUser: (updatedUser) => set((state) => {
                const user = state.user ? { ...state.user, ...updatedUser } : null;
                return { user };
            }),
            logout: () => {
                set({ user: null });
                localStorage.removeItem('user-storage');
            },
            isLoggedIn: () => get().user !== null,
        }),
        {
            name: 'user-storage',
        }
    )
);