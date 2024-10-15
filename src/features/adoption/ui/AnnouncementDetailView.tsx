import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAnnouncementDetail } from '../api/getAnnouncementDetail';
import { AnnouncementDetail } from '../model/types';

const AnnouncementDetailView: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [announcement, setAnnouncement] = useState<AnnouncementDetail | null>(null);

    useEffect(() => {
        const fetchAnnouncementDetail = async () => {
            try {
                const data = await getAnnouncementDetail(Number(id));
                setAnnouncement(data);
            } catch (error) {
                console.error('Error fetching announcement detail:', error);
            }
        };

        fetchAnnouncementDetail();
    }, [id]);

    if (!announcement) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">{announcement.title}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <img src={announcement.imageUrls[0]} alt={announcement.animalName} className="w-full h-auto rounded-lg shadow-lg" />
                    <div className="mt-4 flex space-x-2">
                        {announcement.imageUrls.slice(1).map((url, index) => (
                            <img key={index} src={url} alt={`${announcement.animalName} ${index + 2}`} className="w-24 h-24 object-cover rounded-md" />
                        ))}
                    </div>
                </div>
                <div>
                    <p className="text-gray-700 mb-4">{announcement.content}</p>
                    <h2 className="text-2xl font-semibold mb-2">동물 정보</h2>
                    <ul className="list-disc list-inside mb-4">
                        <li>종류: {announcement.animalType}</li>
                        <li>품종: {announcement.breed}</li>
                        <li>이름: {announcement.animalName}</li>
                        <li>나이: {announcement.estimatedAge}살</li>
                        <li>성별: {announcement.gender}</li>
                        <li>중성화 여부: {announcement.isNeutered ? '예' : '아니오'}</li>
                        <li>체중: {announcement.weight}kg</li>
                        <li>색상: {announcement.color}</li>
                    </ul>
                    <h2 className="text-2xl font-semibold mb-2">보호소 정보</h2>
                    <p>{announcement.shelterName}</p>
                    <p>{announcement.shelterLocation.address} {announcement.shelterLocation.addressDetail}</p>
                    <h2 className="text-2xl font-semibold mt-4 mb-2">입양 요구사항</h2>
                    <p>{announcement.adoptionRequirements}</p>
                </div>
            </div>
        </div>
    );
};

export default AnnouncementDetailView;