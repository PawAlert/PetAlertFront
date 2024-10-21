import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMyAnnouncements } from '../api/getMyAnnouncements';
import AnnouncementCard from './AnnouncementCard';
import { Link } from 'react-router-dom';
import {useMyAnnouncementStore} from "../model/announcementStore.ts";

const MyAnnouncementList: React.FC = () => {
    const { page, setPage } = useMyAnnouncementStore();

    const { data, isLoading, error } = useQuery({
        queryKey: ['myAnnouncements', page],
        queryFn: () => getMyAnnouncements(page),
    });

    if (isLoading) return <div>로딩 중...</div>;
    if (error) return <div>에러가 발생했습니다: {(error as Error).message}</div>;

    const announcements = data?.data.content || [];
    const totalPages = data?.data.totalPages || 0;

    return (
        <div>
            <div className="mb-4">
                <Link to="/adoption/create" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    새 공고 작성
                </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {announcements.map((announcement) => (
                    <AnnouncementCard key={announcement.id} announcement={announcement} />
                ))}
            </div>
            <div className="mt-4 flex justify-center">
                <button
                    onClick={() => setPage(Math.max(0, page - 1))}
                    disabled={page === 0}
                    className="mx-2 px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
                >
                    이전
                </button>
                <span className="mx-2">페이지 {page + 1} / {totalPages}</span>
                <button
                    onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
                    disabled={page === totalPages - 1}
                    className="mx-2 px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
                >
                    다음
                </button>
            </div>
        </div>
    );
};

export default MyAnnouncementList;