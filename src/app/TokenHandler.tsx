import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {useAuth} from "../features/auth/Login/customHook/useAuth.ts";

const TokenHandler: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const navigate = useNavigate();
    const { login } = useAuth();

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const token = searchParams.get('token');
        if (token) {
            console.log('Token detected:', token);
            login(token);
            // URL에서 토큰 제거
            navigate(window.location.pathname, { replace: true });
        }
    }, [navigate, login]);

    return <>{children}</>;
};

export default TokenHandler;