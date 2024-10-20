import React, { useCallback } from 'react';
import {
    SearchFilters,
    VolunteerGrid,
    Pagination,
    NoResults,
    LoadingError,
    useVolunteerSearch,
    useVolunteerSearchStore,
    VolunteerSearchFiltersType
} from '../../features/volunteer';

export const VolunteerSearchPage: React.FC = () => {
    const { filters, pageNumber, pageSize, setPage, setFilters } = useVolunteerSearchStore();

    const { data, isLoading, isError, error } = useVolunteerSearch(
        filters,
        pageNumber,
        pageSize
    );

    const handlePageChange = useCallback((page: number) => {
        setPage(page);
    }, [setPage]);

    const handleFilterChange = useCallback((newFilters: Partial<VolunteerSearchFiltersType>) => {
        setFilters(newFilters);
        setPage(0);
    }, [setFilters, setPage]);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">봉사활동</h1>
            <SearchFilters onFilterChange={handleFilterChange} />
            <LoadingError isLoading={isLoading} isError={isError} error={error as Error | null} />
            {!isLoading && !isError && data && (
                <>
                    {data.data.content.length > 0 ? (
                        <>
                            <VolunteerGrid activities={data.data.content} />
                            <Pagination
                                currentPage={data.data.number}
                                totalPages={data.data.totalPages}
                                onPageChange={handlePageChange}
                            />
                        </>
                    ) : (
                        <NoResults />
                    )}
                </>
            )}
        </div>
    );
};

export default VolunteerSearchPage;