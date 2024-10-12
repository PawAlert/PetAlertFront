import { create } from 'zustand';

interface AuthStore {
    token: string | null;
    setToken: (token: string) => void;
    clearToken: () => void;
    isLoggedIn: () => boolean;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
    token: localStorage.getItem('token'), // 초기 상태를 로컬 스토리지에서 가져옴
    setToken: (token) => {
        set({ token });
        localStorage.setItem('token', token);
    },
    clearToken: () => {
        set({ token: null });
        localStorage.removeItem('token');
    },
    isLoggedIn: () => !!get().token,
}));