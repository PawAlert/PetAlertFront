import axios from 'axios';

const getAuthToken = () => localStorage.getItem('token');

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = getAuthToken();
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export const createChatRoom = async (missingPostId: string, receiverUid: string) => {
    const senderUid = localStorage.getItem('uid'); // 현재 로그인한 사용자의 UID
    const response = await axiosInstance.post('/api/chat/create', {
        missingPostId,
        receiverUid,
        senderUid
    });
    return response.data;
};

export const enterChatRoom = async (chatRoomId: string) => {
    const response = await axiosInstance.post(`/api/chat/enter/${chatRoomId}`);
    return response.data;
};

export const getChatRooms = async () => {
    const userId = localStorage.getItem('uid');
    if (!userId) {
        throw new Error('유저아이디가 없습니다.');
    }
    const response = await axiosInstance.get(`/api/chat/rooms?userId=${userId}`);
    return response.data;
};

export const getChatMessages = async (chatRoomId: string) => {
    const response = await axiosInstance.get(`/api/chat/room/${chatRoomId}/messages`);
    return response.data;
};