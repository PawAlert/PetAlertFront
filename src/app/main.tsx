import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../../index.css';
import { RouterProvider } from "react-router-dom";
import withRouter from "./routers/withRouter.tsx";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// QueryClient 인스턴스 생성
const queryClient = new QueryClient();



createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={withRouter} />
        </QueryClientProvider>
    </StrictMode>
);