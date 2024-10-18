import React from "react";
import { useQuery } from "@tanstack/react-query";
import ReactPaginate from "react-paginate";
import { useMissingPostStore } from "../model/store";
import { fetchMissingPosts } from "../api/fetchMissingPosts";
import MissingPostCard from "./MissingPostCard";
import SearchFilters from "./SearchFilters";
import { MissingPostsResponse } from "../model/types";

export const MissingPostList: React.FC = () => {
  const { params, setParams } = useMissingPostStore();

  const { data, isLoading, error } = useQuery<MissingPostsResponse, Error>({
    queryKey: ["missingPosts", params],
    queryFn: () => fetchMissingPosts(params),
    refetchOnWindowFocus: false,
  });

  const handlePageChange = (selectedItem: { selected: number }) => {
    setParams({ page: selectedItem.selected });
  };

  if (isLoading) {
    return (
        <div className="flex justify-center items-center h-screen">
          Loading...
        </div>
    );
  }

  if (error) {
    return (
        <div className="text-red-500">Error: {error.message}</div>
    );
  }

  if (!data || !data.content || !Array.isArray(data.content)) {
    return <div className="text-red-500">데이터를 불러오는 데 문제가 발생했습니다.</div>;
  }

  return (
      <div className="container mx-auto px-4">
        <SearchFilters />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data.content.map((post) => (
              <MissingPostCard key={post.missingReportId} post={post} />
          ))}
        </div>
        {data.totalPages > 0 && (
            <ReactPaginate
                previousLabel={"이전"}
                nextLabel={"다음"}
                breakLabel={"..."}
                pageCount={data.totalPages}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageChange}
                containerClassName={"pagination flex justify-center mt-4 space-x-2"}
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
            />
        )}
      </div>
  );
};