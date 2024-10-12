import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../model/store.ts';

export const useAuth = () => {
    const navigate = useNavigate();
    const isLoggedIn = useAuthStore(state => state.isLoggedIn());
    const setToken = useAuthStore(state => state.setToken);
    const clearToken = useAuthStore(state => state.clearToken);

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/mypage/profile');
        } else {
            navigate('/login');
        }
    }, [isLoggedIn, navigate]);

    return {
        isLoggedIn,
        login: (token: string) => {
            setToken(token);
            navigate('/mypage/profile');
        },
        logout: () => {
            clearToken();
            navigate('/login');
        }
    };
};