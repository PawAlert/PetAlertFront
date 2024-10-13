import axios from 'axios';
import { MissingPostsResponse, FetchMissingPostsParams } from '../model/types';

export const fetchMissingPosts = async (params: FetchMissingPostsParams): Promise<MissingPostsResponse> => {
    const response = await axios.get<MissingPostsResponse>(`${import.meta.env.VITE_APP_API_URL}/api/missing/list`, { params });
    return response.data;
};