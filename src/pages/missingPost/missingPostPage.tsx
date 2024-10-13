import React from 'react';
import { MissingPostList } from '../../features/missingPost';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../features/auth/Login/customHook/useAuth.ts";

const MissingPostListPage: React.FC = () => {
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth();

    const handleWriteClick = () => {
        if (isLoggedIn) {
            navigate('/missingForm');
        } else {
            alert('로그인이 필요합니다.');
            navigate('/login');
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">실종 게시글 목록</h1>
                <button
                    onClick={handleWriteClick}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    글쓰기
                </button>
            </div>
            <MissingPostList />
        </div>
    );
};

export default MissingPostListPage;