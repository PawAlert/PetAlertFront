import React from 'react';
import { MissingPost } from '../model/types';

interface LatestMissingPostCardProps {
    post: MissingPost;
}

const LatestMissingPostCard: React.FC<LatestMissingPostCardProps> = ({ post }) => {
    return (
        <div className="border border-gray-200 overflow-hidden flex flex-col w-[271px]">
            <img className="w-full h-48 object-cover" src={post.petImageUrl} alt={post.petName} />
            <div className="p-3 flex flex-col justify-between flex-grow mt-3">
                <div>
                    <p className="text-sm text-gray-600 mb-1">이름 : {post.petName}</p>
                    <p className="text-sm text-gray-600 mb-1 truncate">
                        실종위치 : {post.locationRecord.province} {post.locationRecord.city} {post.locationRecord.district}
                    </p>
                    <p className="text-sm text-gray-600">실종 날짜 : {post.dateLost.join('.')}</p>
                </div>
            </div>
        </div>
    );
};

export default LatestMissingPostCard;