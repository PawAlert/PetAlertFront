import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchLatestMissingPosts } from '../api/fetchMissingPosts';
import { Link } from 'react-router-dom';
import LatestMissingPostCard from "./LatestMissingPostCard.tsx";
import { MissingPostsResponse, MissingPost } from '../model/types';

export const LatestMissingPosts: React.FC = () => {
    const { data, isLoading, error } = useQuery<MissingPostsResponse, Error>({
        queryKey: ['latestMissingPosts'],
        queryFn: () => fetchLatestMissingPosts(6),
    });

    console.log('Query Data:', data);

    const handleLinkClick = () => {
        window.scrollTo(0, 0);
    };

    if (isLoading) return <div className="text-center py-10">Loading...</div>;
    if (error) return <div className="text-center py-10 text-red-500">Error loading latest missing posts: {error.message}</div>;

    // 데이터가 없거나 content가 없는 경우를 처리
    if (!data || !data.data || !Array.isArray(data.data.content) || data.data.content.length === 0) {
        return <div className="text-center py-10">No data available</div>;
    }

    const missingPosts: MissingPost[] = data.data.content;

    return (
        <div className="bg-white py-8">
            <div className="max-w-[1000px] mx-auto px-4">
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold mb-2">잃어버린 가족을 찾는 공간</h2>
                    <p className="text-sm text-gray-600">직접 관심이 가져올 수 있습니다. 다시 만날 수 있도록 힘을 모아주세요.</p>
                </div>
                <div className="flex justify-end mb-4">
                    <Link to="/missingPostList"
                          onClick={handleLinkClick}
                          className="inline-block bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-semibold py-2 px-4">
                        Read more
                    </Link>
                </div>
                <div className="flex flex-wrap gap-[50px] justify-center">
                    {missingPosts.map((post) => (
                        <LatestMissingPostCard key={post.missingReportId} post={post}/>
                    ))}
                </div>
            </div>
        </div>
    );
};