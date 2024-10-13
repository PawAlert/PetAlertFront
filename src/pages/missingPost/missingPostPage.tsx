import React from 'react';
import MissingPost from "../../features/missingPost/ui/missingPost.tsx";

const MissingPostListPage: React.FC = () => {
    return (
        <>
            <h1>실종 게시글 목록</h1>
            <MissingPost/>
        </>
    )
};

export default MissingPostListPage;