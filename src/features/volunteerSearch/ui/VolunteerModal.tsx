import React from 'react';
import {VolunteerActivity} from "../model/types.ts";

interface VolunteerModalProps {
    activity: VolunteerActivity | null;
    onClose: () => void;
}

export const VolunteerModal: React.FC<VolunteerModalProps> = ({ activity, onClose }) => {
    if (!activity) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <h2 className="text-2xl font-bold mb-4">{activity.title}</h2>
                <img src={activity.imageUrl} alt={activity.title} className="w-full h-64 object-cover mb-4" />
                <p className="mb-2">{activity.description}</p>
                <p className="mb-2"><strong>Date:</strong> {activity.date}</p>
                <p className="mb-2"><strong>Type:</strong> {activity.activityType}</p>
                <p className="mb-2"><strong>Location:</strong> {activity.location.address}, {activity.location.city}, {activity.location.province}</p>
                <p className="mb-2"><strong>Required Volunteers:</strong> {activity.requiredVolunteers}</p>
                <p className="mb-2"><strong>Organization:</strong> {activity.organizationName}</p>
                <button
                    onClick={onClose}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Close
                </button>
            </div>
        </div>
    );
};