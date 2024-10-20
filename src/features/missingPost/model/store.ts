import { create } from 'zustand';

interface MissingPostFilters {
    status: string;
    province: string;
    city: string;
    sortByClosest: boolean;
    page: number;
    size: number;
}

interface MissingPostStore {
    filters: MissingPostFilters;
    setFilters: (newFilters: Partial<MissingPostFilters>) => void;
}

export const useMissingPostStore = create<MissingPostStore>((set) => ({
    filters: {
        status: '',
        province: '',
        city: '',
        sortByClosest: true,
        page: 0,
        size: 9,
    },
    setFilters: (newFilters) =>
        set((state) => ({ filters: { ...state.filters, ...newFilters } })),
}));