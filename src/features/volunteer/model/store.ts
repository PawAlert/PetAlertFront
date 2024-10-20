import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {SearchFilters, VolunteerActivity} from "./types.ts";
import {fetchVolunteerActivities} from "../api/volunteerSearchApi.ts";

interface VolunteerSearchStore {
    filters: SearchFilters;
    pageNumber: number;
    pageSize: number;
    setFilters: (filters: Partial<SearchFilters>) => void;
    setPage: (page: number) => void;
    setPageSize: (size: number) => void;
}

export const useVolunteerSearchStore = create<VolunteerSearchStore>()(
    persist(
        (set) => ({
            filters: {
                activityType: '전체',
                province: '전체',
                city: '전체',
                sortByClosest: false,
            },
            pageNumber: 0,
            pageSize: 10,
            setFilters: (newFilters) =>
                set((state) => ({ filters: { ...state.filters, ...newFilters } })),
            setPage: (page) => set({ pageNumber: page }),
            setPageSize: (size) => set({ pageSize: size }),
        }),
        {
            name: 'volunteer-search-store',
        }
    )
);

interface VolunteerStore {
    activities: VolunteerActivity[];
    fetchActivities: (sortByClosest?: boolean) => Promise<void>;
}

export const useVolunteerStore = create<VolunteerStore>((set) => ({
    activities: [],
    fetchActivities: async (sortByClosest = false) => {
        const activities = await fetchVolunteerActivities(sortByClosest);
        set({ activities });
    },
}));