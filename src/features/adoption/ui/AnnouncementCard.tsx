import React from 'react';
import { Link } from 'react-router-dom';
import { Announcement } from '../model/types';

interface AnnouncementCardProps {
    announcement: Announcement;
}

const AnnouncementCard: React.FC<AnnouncementCardProps> = ({ announcement }) => {
    return (
        <Link to={`/adoption/${announcement.id}`} className="block">
            <div className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
                <img src={announcement.firstImageUrl} alt={announcement.title} className="w-full h-48 object-cover rounded-t-lg" />
                <h3 className="text-lg font-semibold mt-2">{announcement.title}</h3>
                <p>동물 종류: {announcement.animalType}</p>
                <p>발견 장소: {announcement.foundLocation}</p>
                <p>입양 가능일: {announcement.adoptionAvailableDate.join('-')}</p>
            </div>
        </Link>
    );
};

export default AnnouncementCard;