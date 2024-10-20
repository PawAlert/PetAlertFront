import React from 'react';
import { useNavigate } from 'react-router-dom';
import { VolunteerActivity, ActivityType } from '../model/types';
import { FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaClock } from 'react-icons/fa';

interface VolunteerCardProps {
    activity: VolunteerActivity;
    onClick?: (activity: VolunteerActivity) => void;  // onClick을 선택적 prop으로 추가
}

const VolunteerCard: React.FC<VolunteerCardProps> = ({ activity, onClick }) => {
    const navigate = useNavigate();

    const formatDate = (date: number[]) => {
        return `${date[0]}년 ${date[1]}월 ${date[2]}일`;
    };

    const handleClick = () => {
        if (onClick) {
            onClick(activity);
        } else {
            navigate(`/volunteer/${activity.id}`);
        }
    };

    function getActivityTypeInKorean(type: string): string {
        return ActivityType[type as keyof typeof ActivityType] || '알 수 없음';
    }

    return (
        <div
            className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 cursor-pointer"
            onClick={handleClick}
        >
            <div className="relative">
                <img src={activity.images[0]} alt={activity.title} className="w-full h-48 object-cover"/>
                <div
                    className="absolute top-0 right-0 bg-blue-500 text-white px-2 py-1 m-2 rounded-md text-sm font-semibold">
                    {getActivityTypeInKorean(activity.activityType)}
                </div>
            </div>
            <div className="p-6">
                <h3 className="font-bold text-xl mb-3 text-gray-800">{activity.title}</h3>
                <div className="space-y-2">
                    <p className="text-gray-600 flex items-center">
                        <FaCalendarAlt className="mr-2 text-blue-500" />
                        {formatDate(activity.date)}
                    </p>
                    <p className="text-gray-600 flex items-center">
                        <FaMapMarkerAlt className="mr-2 text-red-500" />
                        {activity.location.province} {activity.location.city} {activity.location.district}
                    </p>
                    <p className="text-gray-600 flex items-center">
                        <FaUsers className="mr-2 text-green-500" />
                        필요 인원: {activity.requiredVolunteers}명
                    </p>
                    <p className="text-gray-600 flex items-center">
                        <FaClock className="mr-2 text-purple-500" />
                        {activity.startTime[0]}:{activity.startTime[1].toString().padStart(2, '0')} -
                        {activity.endTime[0]}:{activity.endTime[1].toString().padStart(2, '0')}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default VolunteerCard;