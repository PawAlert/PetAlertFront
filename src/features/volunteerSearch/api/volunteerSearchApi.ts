import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { SearchFilters, VolunteerSearchResponse, ActivityType } from "../model/types";

const API_BASE_URL = `${import.meta.env.VITE_APP_API_URL}/api/volunteer`;

export const useVolunteerSearch = (filters: SearchFilters, page: number, pageSize: number) => {
    return useQuery<VolunteerSearchResponse>({
        queryKey: ['volunteerSearch', filters, page, pageSize],
        queryFn: async () => {
            let url = `${API_BASE_URL}/search`;
            const params: Record<string, string | number> = { page, size: pageSize };

            if (filters.activityType !== '전체') {
                params.activityType = filters.activityType as keyof typeof ActivityType;
            }
            if (filters.province !== '전체') params.province = filters.province;
            if (filters.city !== '전체') params.city = filters.city;
            params.sortByClosest = filters.sortByClosest.toString();

            const queryString = new URLSearchParams(params as Record<string, string>).toString();
            url = queryString ? `${url}?${queryString}` : url;

            console.log('Fetching URL:', url);
            const response = await axios.get<VolunteerSearchResponse>(url);
            return response.data;
        },
    });
};