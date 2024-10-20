import axios from 'axios';
import { MissingPostsResponse, FetchMissingPostsParams } from '../model/types';

export const fetchMissingPosts = async (filters: FetchMissingPostsParams): Promise<MissingPostsResponse> => {
    const token = localStorage.getItem('token');
    const headers: Record<string, string> = {};

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await axios.get<MissingPostsResponse>(
        // `http://localhost:8080/api/missing/search`,
        `${import.meta.env.VITE_APP_API_URL}/api/missing/search`,
        {
            params: filters,
            headers,
        }
    );
    console.log('API Response:', response);

    return response.data;
};

export const fetchLatestMissingPosts = async (limit: number = 6): Promise<MissingPostsResponse> => {
    const params: FetchMissingPostsParams = {
        page: 0,
        size: limit,
        sortByClosest: true,
        status: 'MISSING'
    };
    return fetchMissingPosts(params);
};