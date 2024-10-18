import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MissingPost } from '../model/types';

interface MissingPostCardProps {
    post: MissingPost;
}

const MissingPostCard: React.FC<MissingPostCardProps> = ({ post }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/missing-post/${post.missingReportId}`);
    };

    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer" onClick={handleClick}>
            <img className="w-full h-48 object-cover" src={post.petImageUrl} alt={post.petName} />
            <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{post.missingTitle}</h2>
                <p className="text-gray-600"><span className="font-semibold">Pet Name:</span> {post.petName}</p>
                <p className="text-gray-600"><span className="font-semibold">Date Lost:</span> {post.dateLost.join('-')}</p>
                <p className="text-gray-600"><span className="font-semibold">Address:</span>
                    {post.locationRecord.province}
                    {post.locationRecord.city}
                    {post.locationRecord.district}
                    {post.locationRecord.street}
                    {post.locationRecord.addressDetail}
                </p>
            </div>
        </div>
    );
};

export default MissingPostCard;