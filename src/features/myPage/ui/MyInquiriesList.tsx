import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getMyInquiries } from '../api/getMyInquiries';
import { Inquiry } from '../model/types';
import { useAuth } from '../../auth/Login/customHook/useAuth';

const MyInquiriesList: React.FC = () => {
    const [inquiries, setInquiries] = useState<Inquiry[]>([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const { userInfo } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (userInfo?.uid === 'bc50a30d-8da4-4d10-a5a9-6bba1b4c2b6e') {
            fetchInquiries();
        } else {
            setError('접근 권한이 없습니다.');
            setIsLoading(false);
        }
    }, [page, userInfo]);

    const fetchInquiries = async () => {
        try {
            setIsLoading(true);
            const response = await getMyInquiries(page);
            setInquiries(response.data.content);
            setTotalPages(response.data.totalPages);
            setIsLoading(false);
        } catch (error) {
            console.error('Failed to fetch inquiries:', error);
            setError('문의 목록을 불러오는데 실패했습니다.');
            setIsLoading(false);
        }
    };

    if (isLoading) return <div>로딩 중...</div>;
    if (error) return <div className="text-red-500">{error}</div>;
    if (!inquiries || inquiries.length === 0) return <div>문의 내역이 없습니다.</div>;

    return (
        <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-4">문의 목록</h2>
            <div className="space-y-4">
                {inquiries.map((inquiry) => (
                    <div key={inquiry.id} className="bg-white shadow-md rounded-lg p-4">
                        <p className="font-semibold">유형: {inquiry.type}</p>
                        <p>이름: {inquiry.name}</p>
                        <p>이메일: {inquiry.email}</p>
                        <p>전화번호: {inquiry.phoneNumber}</p>
                        <p className="mt-2 truncate">{inquiry.content}</p>
                        <Link
                            to={`/myPage/inquiries/${inquiry.id}`}
                            className="mt-2 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
                        >
                            상세 보기
                        </Link>
                    </div>
                ))}
            </div>
            <div className="mt-6 flex justify-center">
                <button
                    onClick={() => setPage((prev) => Math.max(0, prev - 1))}
                    disabled={page === 0}
                    className="mx-2 px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300 transition duration-300"
                >
                    이전
                </button>
                <button
                    onClick={() => setPage((prev) => prev + 1)}
                    disabled={page === totalPages - 1}
                    className="mx-2 px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300 transition duration-300"
                >
                    다음
                </button>
            </div>
        </div>
    );
};

export default MyInquiriesList;