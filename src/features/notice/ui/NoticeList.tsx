import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getNotices } from '../api/noticesApi';
import { NoticeListItem } from '../model/noticesModel';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

const ITEMS_PER_PAGE = 7;

const NoticeList: React.FC = () => {
    const [page, setPage] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');

    const { data, isLoading, error } = useQuery({
        queryKey: ['notices', page, ITEMS_PER_PAGE],
        queryFn: () => getNotices(page, ITEMS_PER_PAGE)
    });

    if (isLoading) return <div>로딩 중...</div>;
    if (error) return <div>에러가 발생했습니다: {(error as Error).message}</div>;

    const notices = data?.data?.content || [];
    const totalPages = data?.data?.totalPages || 0;

    const formatDate = (dateArray: number[]) => {
        const [year, month, day] = dateArray;
        return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    };

    const getTypeLabel = (type: string) => {
        switch (type) {
            case 'GENERAL': return '일반';
            case 'URGENT': return '긴급';
            case 'EVENT': return '이벤트';
            case 'MAINTENANCE': return '유지보수';
            default: return type;
        }
    };

    return (
        <div className="flex-1 p-8">
            <h1 className="text-2xl font-bold mb-6">공지사항</h1>
            <div className="mb-4 flex items-center">
                <div className="relative flex-grow mr-2">
                    <input
                        type="text"
                        placeholder="공지사항 검색"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-2 pl-10 border rounded"
                    />
                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
                <button className="bg-blue-500 text-white px-4 py-2 rounded">
                    검색
                </button>
            </div>
            <table className="w-full border-collapse">
                <thead>
                <tr className="bg-gray-100">
                    <th className="border p-2 text-left">번호</th>
                    <th className="border p-2 text-left">제목</th>
                    <th className="border p-2 text-left">유형</th>
                    <th className="border p-2 text-left">우선순위</th>
                    <th className="border p-2 text-left">작성일</th>
                </tr>
                </thead>
                <tbody>
                {notices.map((notice: NoticeListItem, index: number) => (
                    <tr key={index} className="hover:bg-gray-50">
                        <td className="border p-2">{index + 1 + page * ITEMS_PER_PAGE}</td>
                        <td className="border p-2">
                            {notice.type === 'URGENT' && <span className="text-red-500 font-bold mr-1">[긴급]</span>}
                            {notice.title}
                        </td>
                        <td className="border p-2">{getTypeLabel(notice.type)}</td>
                        <td className="border p-2">{notice.priority}</td>
                        <td className="border p-2">{formatDate(notice.validFrom)}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="mt-4 flex justify-center items-center">
                <button
                    onClick={() => setPage(prev => Math.max(0, prev - 1))}
                    disabled={page === 0}
                    className="px-3 py-1 bg-gray-200 text-gray-600 rounded disabled:bg-gray-100 disabled:text-gray-400 mr-2"
                >
                    이전
                </button>
                <span className="mx-2">페이지 {page + 1} / {totalPages}</span>
                <button
                    onClick={() => setPage(prev => Math.min(totalPages - 1, prev + 1))}
                    disabled={page === totalPages - 1}
                    className="px-3 py-1 bg-blue-500 text-white rounded disabled:bg-gray-300 ml-2"
                >
                    다음
                </button>
            </div>
        </div>
    );
};

export default NoticeList;