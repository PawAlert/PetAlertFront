import React from 'react';
import { VolunteerActivity } from "../model/types.ts";
import VolunteerCard from "./VolunteerCard.tsx";
import { useNavigate } from 'react-router-dom';

interface VolunteerGridProps {
    activities: VolunteerActivity[];
}

export const VolunteerGrid: React.FC<VolunteerGridProps> = React.memo(({ activities }) => {
    const navigate = useNavigate();

    const handleActivityClick = (activity: VolunteerActivity) => {
        navigate(`/volunteer/${activity.id}`);
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {activities.map((activity) => (
                <VolunteerCard
                    key={activity.id}
                    activity={activity}
                    onClick={() => handleActivityClick(activity)}
                />
            ))}
        </div>
    );
});