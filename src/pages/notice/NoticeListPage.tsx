import React from 'react';
import NoticeList from '../../features/notice/ui/NoticeList';

const NoticeListPage: React.FC = () => {
    return (
        <div className="bg-white min-h-screen flex flex-col">
            <NoticeList />
        </div>
    );
};

export default NoticeListPage;