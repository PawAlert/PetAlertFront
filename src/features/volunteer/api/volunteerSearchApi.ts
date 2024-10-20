import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import {SearchFilters, VolunteerSearchResponse, ActivityType, VolunteerActivity} from "../model/types.ts";

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

export const fetchVolunteerActivities = async (sortByClosest: boolean = false) => {
    try {
        const response = await axios.get<{ data: { content: VolunteerActivity[] } }>(
            `${import.meta.env.VITE_APP_API_URL}/api/volunteer/search?sortByClosest=${sortByClosest}`
        );
        return response.data.data.content.slice(0, 3); // 최신 3개만 반환
    } catch (error) {
        console.error('Error fetching volunteer activities:', error);
        return [];
    }
};