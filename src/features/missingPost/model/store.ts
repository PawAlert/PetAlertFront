import { create } from 'zustand';
import { FetchMissingPostsParams } from './types';

interface MissingPostStore {
    params: FetchMissingPostsParams;
    setParams: (params: Partial<FetchMissingPostsParams>) => void;
}

export const useMissingPostStore = create<MissingPostStore>((set) => ({
    params: {
        page: 0,
        sortDirection: 'ASC',
        statusFilter: 'MISSING',
    },
    setParams: (newParams) => {
        set((state) => ({
            params: { ...state.params, ...newParams },
        }));
    },
}));