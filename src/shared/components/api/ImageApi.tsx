import axios from "axios";

// todo : 실제 배포주소로 변경하기
const api = axios.create({
    baseURL: `${import.meta.env.VITE_APP_API_URL}/api`
});


// 토큰 자동 넣기
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

//이미지 여러장
export const uploadListImagesToS3 = async (files: File[]): Promise<string[]> => {
    const formData = new FormData();
    files.forEach((file) => {
        formData.append('image', file);
    });

    const response = await api.post('/s3ImageList', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return response.data;
};

// 이미지 한장
export const oneImageToS3 = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('image', file);

    const response = await api.post('/s3Image', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return response.data;
};
