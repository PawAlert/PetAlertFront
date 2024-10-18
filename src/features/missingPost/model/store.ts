import { create } from 'zustand';
import { FetchMissingPostsParams } from './types';

interface MissingPostStore {
    params: FetchMissingPostsParams;
    setParams: (newParams: Partial<FetchMissingPostsParams>) => void;
}

export const useMissingPostStore = create<MissingPostStore>((set) => ({
    params: {
        page: 0,
        size: 10,
        sortDirection: 'DESC', // 최신순을 기본값으로 설정
        statusFilter: '', // 전체를 기본값으로 설정
        sort: 'createdAt',
        status: '',
    },
    setParams: (newParams) =>
        set((state) => ({ params: { ...state.params, ...newParams } })),
}));