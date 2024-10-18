import React from 'react';
import { Link } from 'react-router-dom';
import { VolunteerActivity } from "../model/types";

interface VolunteerCardProps {
    activity: VolunteerActivity;
    onClick: (activity: VolunteerActivity) => void;
}

export const VolunteerCard: React.FC<VolunteerCardProps> = React.memo(({ activity }) => {
    return (
        <Link to={`/volunteer/${activity.id}`} className="block">
            <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow duration-200">
                <img src={activity.images[0]} alt={activity.title} className="w-full h-48 object-cover mb-4" />
                <h3 className="text-xl font-bold mb-2">{activity.title}</h3>
                <p className="text-gray-600 mb-2">{activity.description.substring(0, 100)}...</p>
                <p className="text-sm text-gray-500 mb-1">Date: {activity.date.join('-')}</p>
                <p className="text-sm text-gray-500 mb-1">Type: {activity.activityType}</p>
                <p className="text-sm text-gray-500 mb-1">Location: {activity.location.city}, {activity.location.province}</p>
                <p className="text-sm text-gray-500 mb-1">Required Volunteers: {activity.requiredVolunteers}</p>
                <p className="text-sm text-gray-500">Organization: {activity.organizationName}</p>
            </div>
        </Link>
    );
});