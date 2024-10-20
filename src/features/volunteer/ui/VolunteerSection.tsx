import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useVolunteerStore } from '../model/store';
import VolunteerCard from './VolunteerCard';

const VolunteerSection: React.FC = () => {
    const { activities, fetchActivities } = useVolunteerStore();

    useEffect(() => {
        fetchActivities();
    }, [fetchActivities]);

    return (
        <section className="py-16 bg-gray-100">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8">봉사활동</h2>
                <p className="text-center mb-6 text-gray-600">
                    작은 관심이 기적을 일으킬 수 있습니다. 다시 만날 수 있도록 힘을 모아주세요.
                </p>
                <div className="flex justify-end mb-8">
                    <Link
                        to="/volunteer"
                        className="bg-white text-black border border-black py-2 px-6 rounded-md hover:bg-gray-100 transition duration-300"
                    >
                        Read more
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {activities.slice(0, 3).map((activity) => (
                        <VolunteerCard key={activity.id} activity={activity} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default VolunteerSection;