import React from 'react';
import MyAnnouncementList from '../../features/adoption/ui/MyAnnouncementList';

const MyAnnouncementsPage: React.FC = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-4">내 입양 공고 목록</h1>
            <MyAnnouncementList />
        </div>
    );
};

export default MyAnnouncementsPage;