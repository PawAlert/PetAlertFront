import React, { useEffect, useState } from 'react';
import { getAnnouncements } from '../api/getAnnouncements';
import { Announcement } from '../model/types';
import AnnouncementCard from './AnnouncementCard';

const AnnouncementList: React.FC = () => {
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {announcements.map((announcement) => (
                    <AnnouncementCard key={announcement.id} announcement={announcement} />
                ))}
            </div>
            <div className="mt-4 flex justify-center">
                <button
                    onClick={() => setPage(page - 1)}
                    disabled={page === 0}
                    className="mx-2 px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
                >
                    Previous
                </button>
                <button
                    onClick={() => setPage(page + 1)}
                    disabled={page === totalPages - 1}
                    className="mx-2 px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default AnnouncementList;