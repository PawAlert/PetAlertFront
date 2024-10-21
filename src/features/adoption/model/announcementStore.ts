import { create } from 'zustand';

interface MyAnnouncementStore {
    page: number;
    setPage: (page: number) => void;
}

export const useMyAnnouncementStore = create<MyAnnouncementStore>((set) => ({
    page: 0,
    setPage: (page) => set({ page }),
}));