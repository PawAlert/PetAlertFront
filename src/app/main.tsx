import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../../index.css';
import { RouterProvider } from "react-router-dom";
import withRouter from "./routers/withRouter.tsx";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import TokenHandler from './TokenHandler'; // TokenHandler 컴포넌트를 import

const queryClient = new QueryClient();

const Root = () => (
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <TokenHandler>
                <RouterProvider router={withRouter} />
            </TokenHandler>
        </QueryClientProvider>
    </StrictMode>
);

createRoot(document.getElementById('root')!).render(<Root />);