import axios from 'axios';
import {useAuthStore} from "../features/auth/Login/model/store.ts";

export const setupAxiosInterceptors = () => {
    axios.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response && (error.response.status === 401 || error.response.status === 403 ||
                (error.response.status === 500 && error.response.data?.data?.exception === "NullPointerException"))) {
                console.log('Token expired or invalid. Logging out...');
                const { clearAuth } = useAuthStore.getState();
                clearAuth();
                localStorage.removeItem('token');
                localStorage.removeItem('uid');
                localStorage.removeItem('volunteer-search-store');
                window.location.href = '/login';
            }
            return Promise.reject(error);
        }
    );
};