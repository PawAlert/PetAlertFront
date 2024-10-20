import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import {
    FaCalendarAlt,
    FaClock,
    FaUsers,
    FaTools,
    FaBuilding,
    FaUser,
    FaEnvelope,
    FaPhone,
    FaMapMarkerAlt,
    FaHandsHelping,
    FaHeart,
    FaPaw,
    FaGraduationCap,
    FaTree,
    FaFirstAid,
    FaRegCalendarAlt,
    FaMapPin
} from 'react-icons/fa';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { VolunteerActivity, ActivityType } from '../../features/volunteer/model/types.ts';

const IconText: React.FC<{ icon: React.ReactNode; label: string; text: string; className?: string }> = ({ icon, label, text, className }) => (
    <div className={`flex items-start mb-2 ${className}`}>
        <span className="mr-2 mt-1">{icon}</span>
        <div>
            <span className="font-semibold text-gray-700">{label}: </span>
            <span className="text-gray-600">{text}</span>
        </div>
    </div>
);

const ImageSlider: React.FC<{ images: string[] }> = ({ images }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    return (
        <Slider {...settings}>
            {images.map((image, index) => (
                <div key={index}>
                    <img src={image} alt={`Volunteer activity ${index + 1}`} className="w-full h-64 object-cover rounded-lg shadow" />
                </div>
            ))}
        </Slider>
    );
};

function getActivityTypeInKorean(type: string): string {
    return ActivityType[type as keyof typeof ActivityType] || '알 수 없음';
}

function getActivityTypeIcon(type: string): React.ReactNode {
    switch (type) {
        case 'CARE': return <FaHandsHelping className="text-blue-500" />;
        case 'MEDICAL': return <FaFirstAid className="text-red-500" />;
        case 'ADOPTION': return <FaPaw className="text-green-500" />;
        case 'EDUCATION': return <FaGraduationCap className="text-yellow-500" />;
        case 'FACILITY': return <FaBuilding className="text-purple-500" />;
        case 'EVENT': return <FaRegCalendarAlt className="text-pink-500" />;
        case 'ENVIRONMENTAL': return <FaTree className="text-green-700" />;
        default: return <FaHandsHelping className="text-gray-500" />;
    }
}

export const VolunteerDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    const { data, isLoading, isError } = useQuery<{ data: VolunteerActivity }>({
        queryKey: ['volunteerDetail', id],
        queryFn: async () => {
            const response = await axios.get<{ data: VolunteerActivity }>(`${import.meta.env.VITE_APP_API_URL}/api/volunteer/detail/${id}`);
            return response.data;
        }
    });

    if (isLoading) return <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
    </div>;
    if (isError) return <div className="flex justify-center items-center h-screen text-red-500">Error loading volunteer activity</div>;
    if (!data) return null;

    const activity = data.data;

    const formatDate = (date: number[]) => `${date[0]}년 ${date[1]}월 ${date[2]}일`;
    const formatTime = (time: number[]) => `${time[0].toString().padStart(2, '0')}:${time[1].toString().padStart(2, '0')}`;

    return (
        <div className="container mx-auto px-4 py-8 bg-gray-100">
            <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">{activity.title}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <ImageSlider images={activity.images}/>
                    <div className="mt-4 mb-4 flex items-center">
                        {getActivityTypeIcon(activity.activityType)}
                        <span className="ml-2 text-lg font-semibold text-gray-700">{getActivityTypeInKorean(activity.activityType)}</span>
                    </div>
                    <p className="text-gray-600 mb-4">{activity.description}</p>
                    <IconText icon={<FaCalendarAlt className="text-orange-500" />} label="날짜" text={formatDate(activity.date)} />
                    <IconText icon={<FaClock className="text-indigo-500" />} label="시간" text={`${formatTime(activity.startTime)} - ${formatTime(activity.endTime)}`} />
                    <IconText icon={<FaUsers className="text-teal-500" />} label="필요 인원" text={`${activity.requiredVolunteers}명`} />
                    <IconText icon={<FaTools className="text-gray-500" />} label="필요 기술" text={activity.requiredSkills} />
                </div>
                <div className="space-y-6">
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-2xl font-bold mb-4 text-gray-800 border-b pb-2">위치</h2>
                        <IconText
                            icon={<FaMapPin className="text-red-500" />}
                            label="주소"
                            text={`${activity.location.addressDetail}, ${activity.location.street}, ${activity.location.district}, ${activity.location.city}, ${activity.location.province}`}
                        />
                        <IconText icon={<FaMapMarkerAlt className="text-blue-500" />} label="우편번호" text={activity.location.postcode} />
                    </div>
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-2xl font-bold mb-4 text-gray-800 border-b pb-2">연락처</h2>
                        <IconText icon={<FaBuilding className="text-purple-500" />} label="기관" text={activity.organizationName} />
                        <IconText icon={<FaUser className="text-green-500" />} label="담당자" text={activity.contactName} />
                        <IconText icon={<FaEnvelope className="text-blue-500" />} label="이메일" text={activity.contactEmail} />
                        <IconText icon={<FaPhone className="text-red-500" />} label="전화번호" text={activity.contactPhone} />
                    </div>
                </div>
            </div>
            <div className="mt-8 text-center">
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full inline-flex items-center transition duration-300">
                    <FaHeart className="mr-2"/>
                    신청하기
                </button>
            </div>
        </div>
    );
};

export default VolunteerDetailPage;