import React from 'react';
import {VolunteerActivity} from "../model/types.ts";
import {VolunteerCard} from "./ VolunteerCard.tsx";


interface VolunteerGridProps {
    activities: VolunteerActivity[];
    onActivityClick: (activity: VolunteerActivity) => void;
}

export const VolunteerGrid: React.FC<VolunteerGridProps> = React.memo(({ activities, onActivityClick }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {activities.map((activity) => (
                <VolunteerCard key={activity.id} activity={activity} onClick={onActivityClick} />
            ))}
        </div>
    );
});