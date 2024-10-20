import React from 'react';
import { Link } from 'react-router-dom';

interface Notice {
    id: number;
    title: string;
    date: string;
}

const notices: Notice[] = [
    { id: 1, title: "9월 봉사활동 안내", date: "2024-10-10" },
    { id: 2, title: "가을철 반려동물 관리 팁", date: "2024-10-10" },
    { id: 3, title: "10월 봉사활동 안내", date: "2024-10-10" },
];

const NoticeSection: React.FC = () => {
    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">공지사항</h2>
                    <Link to="/notices" className="text-blue-600 hover:text-blue-800 transition duration-300">
                        더보기 &gt;
                    </Link>
                </div>
                <div className="bg-white rounded-lg shadow-md">
                    {notices.map((notice) => (
                        <div key={notice.id} className="border-b last:border-b-0 p-4 hover:bg-gray-50 transition duration-300">
                            <Link to={`/notice/${notice.id}`} className="flex justify-between items-center">
                                <span className="text-lg">{notice.title}</span>
                                <span className="text-sm text-gray-500">{notice.date}</span>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default NoticeSection;