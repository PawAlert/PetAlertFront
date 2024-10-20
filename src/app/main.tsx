import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import '../../index.css';
import { RouterProvider } from "react-router-dom";
import withRouter from "./routers/withRouter.tsx";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAuth } from "../features/auth/Login/customHook/useAuth.ts";
import {setupAxiosInterceptors} from "./ axiosConfig.ts";

const queryClient = new QueryClient();

// 앱 시작 시 인터셉터 설정
setupAxiosInterceptors();

function App() {
    const { login } = useAuth();

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const token = searchParams.get('token');
        if (token) {
            console.log('Token detected:', token);
            login(token);
            // URL에서 토큰 제거
            window.history.replaceState({}, document.title, window.location.pathname);
            // 새로고침
            window.location.reload();
        }
    }, [login]);

    return (
        <RouterProvider router={withRouter} />
    );
}

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <App />
        </QueryClientProvider>
    </StrictMode>
);