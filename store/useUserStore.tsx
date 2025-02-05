import { create } from 'zustand';

interface User {
    userId: number;
    email: string;
    file: string;
    name: string;
}

interface UserStore {
    user: User | null;
    setUser: (user: User) => void;
    logout: () => void; //로그아웃
    isLoggedIn: () => boolean;
}

export const useUserStore = create<UserStore>((set, get) => ({
    user: null,
    setUser: (user) => set({user}),
    logout: () => set({ user : null }),
    isLoggedIn: () => get().user !== null,
}));
