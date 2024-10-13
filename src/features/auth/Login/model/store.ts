import { create } from 'zustand';

interface AuthStore {
    token: string | null;
    setToken: (token: string) => void;
    clearAuth: () => void;
    isLoggedIn: () => boolean;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
    token: localStorage.getItem('token'),
    setToken: (token) => {
        set({ token });
        localStorage.setItem('token', token);
    },
    clearAuth: () => {
        set({ token: null });
        localStorage.removeItem('token');
    },
    isLoggedIn: () => !!get().token,
}));