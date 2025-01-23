import { create } from 'zustand';

interface User {
    id: number;
    name: string;
    profileImage: string;
}

interface UserStore {
    users: User[];
    setUsers: (users: User[]) => void;
}

export const useUserStore = create<UserStore>((set) => ({
    users: [],
    setUsers: (users) => set({ users }),
}));
