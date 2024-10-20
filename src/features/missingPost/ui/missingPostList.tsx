import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import ReactPaginate from "react-paginate";
import { useMissingPostStore } from "../model/store";
import { fetchMissingPosts } from "../api/fetchMissingPosts";
import MissingPostCard from "./MissingPostCard";
import SearchFilters from "./SearchFilters";
import { MissingPostsResponse } from "../model/types";

// SkeletonCard 컴포넌트 추가
const SkeletonCard: React.FC = () => (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4 animate-pulse">
        <div className="bg-gray-300 h-48 mb-4 rounded"></div>
        <div className="bg-gray-300 h-4 w-3/4 mb-2 rounded"></div>
        <div className="bg-gray-300 h-4 w-1/2 rounded"></div>
    </div>
);

export const MissingPostList: React.FC = () => {
    const { filters, setFilters } = useMissingPostStore();

    const { data, isLoading, error } = useQuery<MissingPostsResponse, Error>({
        queryKey: ["missingPosts", filters],
        queryFn: () => fetchMissingPosts(filters),
        refetchOnWindowFocus: false,
    });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [filters]);

    const handlePageChange = (selectedItem: { selected: number }) => {
        setFilters({ page: selectedItem.selected });
        window.scrollTo(0, 0);
    };

    if (error) {
        return (
            <div className="text-red-500">Error: {error.message}</div>
        );
    }

    return (
        <div className="container mx-auto px-4">
            <SearchFilters />
            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array(9).fill(0).map((_, index) => <SkeletonCard key={index} />)}
                </div>
            ) : data && data.data.content && data.data.content.length > 0 ? (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {data.data.content.map((post) => (
                            <MissingPostCard key={post.missingReportId} post={post} />
                        ))}
                    </div>
                    {data.data.totalPages > 0 && (
                        <ReactPaginate
                            previousLabel={"이전"}
                            nextLabel={"다음"}
                            breakLabel={"..."}
                            pageCount={data.data.totalPages}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={handlePageChange}
                            containerClassName={"pagination flex justify-center mt-8 space-x-2"}
                            pageClassName={
                                "bg-white border border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 text-sm font-medium"
                            }
                            pageLinkClassName={"page-link"}
                            previousClassName={
                                "bg-white border border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 text-sm font-medium"
                            }
                            previousLinkClassName={"page-link"}
                            nextClassName={
                                "bg-white border border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 text-sm font-medium"
                            }
                            nextLinkClassName={"page-link"}
                            breakClassName={
                                "bg-white border border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 text-sm font-medium"
                            }
                            breakLinkClassName={"page-link"}
                            activeClassName={"bg-blue-50 border-blue-500 text-blue-600 z-10"}
                            forcePage={filters.page}
                        />
                    )}
                </>
            ) : (
                <div className="text-center py-10 text-gray-600">
                    <p className="text-xl font-semibold">검색 결과가 없습니다.</p>
                    <p className="mt-2">다른 검색 조건을 시도해 보세요.</p>
                </div>
            )}
        </div>
    );
};