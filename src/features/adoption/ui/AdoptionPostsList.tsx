import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAnnouncements } from '../api/getAnnouncements';
import { useAuth } from '../../auth/Login/customHook/useAuth';

interface Announcement {
    id: number;
    title: string;
    status: string;
    animalType: string;
    adoptionAvailableDate: number[];
    announcementExpiryDate: number[];
    firstImageUrl: string;
}

const AdoptionPostsList: React.FC = () => {
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const { userInfo } = useAuth();
    const isOfficialUser = userInfo?.userRoles === 'ROLE_OFFICIAL_USER';
    const isAdmin = userInfo?.userRoles === 'ROLE_ADMIN';

    useEffect(() => {
        fetchAnnouncements();
    }, [page]);

    const fetchAnnouncements = async () => {
        try {
            const response = await getAnnouncements(page);
            setAnnouncements(response.data.content);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error('Failed to fetch announcements:', error);
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">입양글 목록</h2>
            {(isOfficialUser || isAdmin) && (
                <Link to="/adoption/create" className="mb-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    입양글 작성하기
                </Link>
            )}
            <div className="grid grid-cols-3 gap-4">
                {announcements.map((announcement) => (
                    <div key={announcement.id} className="border rounded-lg p-4">
                        <img src={announcement.firstImageUrl} alt={announcement.title} className="w-full h-48 object-cover mb-2 rounded" />
                        <h3 className="font-semibold">{announcement.title}</h3>
                        <p>동물 종류: {announcement.animalType}</p>
                        <p>상태: {announcement.status}</p>
                        <Link to={`/adoption/${announcement.id}`} className="text-blue-500 hover:underline">
                            자세히 보기
                        </Link>
                    </div>
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

export default AdoptionPostsList;