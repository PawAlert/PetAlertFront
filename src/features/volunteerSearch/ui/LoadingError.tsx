import React from 'react';

interface LoadingErrorProps {
    isLoading: boolean;
    isError: boolean;
    error: Error | null;
}

export const LoadingError: React.FC<LoadingErrorProps> = ({ isLoading, isError, error }) => {
    if (isLoading) {
        return <div className="text-center py-4">Loading...</div>;
    }

    if (isError) {
        return <div className="text-center py-4 text-red-500">Error: {error?.message}</div>;
    }

    return null;
};