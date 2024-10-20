import React from 'react';
import { CreateNoticeForm } from '../../features/notice';

const CreateNoticePage: React.FC = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">공지사항 작성</h1>
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <CreateNoticeForm />
            </div>
        </div>
    );
};

export default CreateNoticePage;