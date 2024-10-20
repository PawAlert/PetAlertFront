import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MissingPost } from '../model/types';
import { FaPaw, FaCalendarAlt, FaMapMarkerAlt, FaExclamationCircle } from 'react-icons/fa';

interface MissingPostCardProps {
    post: MissingPost;
}

const MissingPostCard: React.FC<MissingPostCardProps> = ({ post }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/missing-post/${post.missingReportId}`);
    };

    const formatAddress = (location: typeof post.locationRecord) => {
        return [
            location.province,
            location.city,
            location.district,
            location.street,
            location.addressDetail
        ].filter(Boolean).join(' ');
    };

    const getStatusInfo = (status: string) => {
        const statusMap: { [key: string]: { text: string; color: string; icon: JSX.Element } } = {
            MISSING: { text: '실종', color: 'text-red-600 bg-red-100', icon: <FaExclamationCircle className="mr-1" /> },
            FOUND: { text: '발견', color: 'text-green-600 bg-green-100', icon: <FaExclamationCircle className="mr-1" /> },
            RESOLVED: { text: '해결', color: 'text-blue-600 bg-blue-100', icon: <FaExclamationCircle className="mr-1" /> },
            TEMPORARY_CARE: { text: '임시보호', color: 'text-yellow-600 bg-yellow-100', icon: <FaExclamationCircle className="mr-1" /> },
            CLOSED: { text: '종료', color: 'text-gray-600 bg-gray-100', icon: <FaExclamationCircle className="mr-1" /> }
        };
        return statusMap[status] || { text: '알 수 없음', color: 'text-gray-600 bg-gray-100', icon: <FaExclamationCircle className="mr-1" /> };
    };

    const statusInfo = getStatusInfo(post.missingStatus);

    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300" onClick={handleClick}>
            <img className="w-full h-48 object-cover" src={post.petImageUrl} alt={post.petName} />
            <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{post.missingTitle}</h2>
                <p className="text-gray-600 flex items-center mb-1">
                    <FaPaw className="mr-2 text-gray-500" />
                    <span className="font-semibold">반려동물 이름:</span> {post.petName}
                </p>
                <p className="text-gray-600 flex items-center mb-1">
                    <FaCalendarAlt className="mr-2 text-gray-500" />
                    <span className="font-semibold">날짜:</span> {post.dateLost.join('-')}
                </p>
                <p className="text-gray-600 flex items-center mb-2">
                    <FaMapMarkerAlt className="mr-2 text-gray-500" />
                    <span className="font-semibold">위치:</span> {formatAddress(post.locationRecord)}
                </p>
                <p className="mt-2">
                    <span className={`font-semibold px-2 py-1 rounded-full ${statusInfo.color} flex items-center inline-flex`}>
                        {statusInfo.icon}
                        {statusInfo.text}
                    </span>
                </p>
            </div>
        </div>
    );
};

export default MissingPostCard;