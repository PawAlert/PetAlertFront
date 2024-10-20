import { create } from "zustand";
import { Notice } from '../model/noticesModel.ts';

interface NoticesStore {
    draftNotice: Partial<Notice>;
    setDraftNotice: (notice: Partial<Notice>) => void;
    resetDraftNotice: () => void;
}

export const useNoticesStore = create<NoticesStore>((set) => ({
    draftNotice: {},
    setDraftNotice: (notice) => set((state) => ({ draftNotice: { ...state.draftNotice, ...notice } })),
    resetDraftNotice: () => set({ draftNotice: {} }),
}));