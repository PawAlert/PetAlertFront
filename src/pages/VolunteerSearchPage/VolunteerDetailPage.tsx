import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { VolunteerActivity } from '../../features/volunteerSearch/model/types';

export const VolunteerDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    const { data, isLoading, isError } = useQuery<{ data: VolunteerActivity }>({
        queryKey: ['volunteerDetail', id],
        queryFn: async () => {
            const response = await axios.get<{ data: VolunteerActivity }>(`${import.meta.env.VITE_APP_API_URL}/api/volunteer/detail/${id}`);
            return response.data;
        }
    });


    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading volunteer activity</div>;
    if (!data) return null;

    const activity = data.data;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">{activity.title}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <img src={activity.images[0]} alt={activity.title} className="w-full h-64 object-cover mb-4" />
                    <p className="text-gray-700 mb-4">{activity.description}</p>
                    <p className="mb-2"><strong>Date:</strong> {activity.date.join('-')}</p>
                    <p className="mb-2"><strong>Time:</strong> {activity.startTime.join(':')} - {activity.endTime.join(':')}</p>
                    <p className="mb-2"><strong>Type:</strong> {activity.activityType}</p>
                    <p className="mb-2"><strong>Required Volunteers:</strong> {activity.requiredVolunteers}</p>
                    <p className="mb-2"><strong>Required Skills:</strong> {activity.requiredSkills}</p>
                </div>
                <div>
                    <h2 className="text-2xl font-bold mb-4">Location</h2>
                    <p className="mb-2">{activity.location.addressDetail}</p>
                    <p className="mb-2">{activity.location.street}, {activity.location.district}</p>
                    <p className="mb-2">{activity.location.city}, {activity.location.province}</p>
                    <p className="mb-4">{activity.location.postcode}</p>
                    <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
                    <p className="mb-2"><strong>Organization:</strong> {activity.organizationName}</p>
                    <p className="mb-2"><strong>Contact Person:</strong> {activity.contactName}</p>
                    <p className="mb-2"><strong>Email:</strong> {activity.contactEmail}</p>
                    <p className="mb-2"><strong>Phone:</strong> {activity.contactPhone}</p>
                </div>
            </div>
        </div>
    );
};