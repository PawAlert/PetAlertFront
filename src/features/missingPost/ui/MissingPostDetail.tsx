import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { MissingPostDetailData } from '../model/types';
import { useAuth } from '../../auth/Login/customHook/useAuth';
import { createChatRoom } from '../../chat/api/chatApi';
import { fetchMissingPostDetail } from "../api/missingReportApi.ts";
import { FaPaw, FaMapMarkerAlt, FaCalendarAlt, FaInfoCircle, FaPhone, FaComments, FaVenus, FaMars, FaSearchPlus, FaSearchMinus } from 'react-icons/fa';
import { MdPets, MdColorLens, MdCake } from 'react-icons/md';
import { RiMickeyLine } from 'react-icons/ri';

const MissingPostDetail: React.FC = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [scale, setScale] = useState(1);
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { isLoggedIn, userInfo } = useAuth();
    const { data, isLoading, error } = useQuery<MissingPostDetailData, Error>({
        queryKey: ['missingPostDetail', id],
        queryFn: () => fetchMissingPostDetail(id!),
        enabled: !!id
    });

    const handleStartChat = async () => {
        if (data && isLoggedIn && userInfo && !data.isMine) {
            try {
                const chatRoom = await createChatRoom(id!, data.userUid);
                navigate(`/chat/${chatRoom.id}`, { state: { receiverUid: data.userUid } });
            } catch (error) {
                console.error('Failed to create chat room:', error);
                alert('채팅방 생성에 실패했습니다. 다시 시도해주세요.');
            }
        } else if (!isLoggedIn) {
            alert('채팅을 시작하려면 로그인이 필요합니다.');
            navigate('/login');
        }
    };

    const openImagePopup = (imageUrl: string) => {
        setSelectedImage(imageUrl);
        setScale(1);
    };

    const closeImagePopup = () => {
        setSelectedImage(null);
        setScale(1);
    };

    const handleZoomIn = (e: React.MouseEvent) => {
        e.stopPropagation();
        setScale(prevScale => Math.min(prevScale + 0.1, 3));
    };

    const handleZoomOut = (e: React.MouseEvent) => {
        e.stopPropagation();
        setScale(prevScale => Math.max(prevScale - 0.1, 0.5));
    };

    if (isLoading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
    if (error) return <div className="text-red-500 text-center">An error has occurred: {error.message}</div>;
    if (!data) return null;

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'MISSING': return 'bg-red-100 text-red-800';
            case 'FOUND': return 'bg-green-100 text-green-800';
            case 'RESOLVED': return 'bg-blue-100 text-blue-800';
            case 'TEMPORARY_CARE': return 'bg-yellow-100 text-yellow-800';
            case 'CLOSED': return 'bg-gray-100 text-gray-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getGenderIcon = (gender: string) => {
        switch(gender.toLowerCase()) {
            case 'male':
            case '남성':
            case '수컷':
                return <FaMars className="mr-2 text-blue-500" />;
            case 'female':
            case '여성':
            case '암컷':
                return <FaVenus className="mr-2 text-pink-500" />;
            default:
                return <FaInfoCircle className="mr-2 text-gray-500" />;
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <h1 className="text-3xl font-bold mb-6 text-center">{data.title}</h1>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="p-6">
                    {/* Image Gallery */}
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold mb-2 flex items-center">
                            <FaInfoCircle className="mr-2 text-blue-500" /> 사진
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                            {data.missingPetImages.map((image) => (
                                <img
                                    key={image.petId}
                                    src={image.imageUrl}
                                    alt="Pet"
                                    className="w-full h-48 object-cover rounded-lg shadow-md cursor-pointer"
                                    onClick={() => openImagePopup(image.imageUrl)}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <h2 className="text-xl font-semibold mb-4 flex items-center">
                                <FaPaw className="mr-2 text-blue-500" /> 반려동물 정보
                            </h2>
                            <p className="mb-2 flex items-center"><MdPets className="mr-2 text-gray-500" /> <strong>이름:</strong> {data.petName}</p>
                            <p className="mb-2 flex items-center"><FaInfoCircle className="mr-2 text-gray-500" /> <strong>상태:</strong> <span className={`px-2 py-1 rounded-full text-sm ${getStatusColor(data.missingStatus)}`}>{data.missingStatus}</span></p>
                            <p className="mb-2 flex items-center"><MdPets className="mr-2 text-gray-500" /> <strong>품종:</strong> {data.petSpecies}</p>
                            <p className="mb-2 flex items-center"><MdColorLens className="mr-2 text-gray-500" /> <strong>색상:</strong> {data.color}</p>
                            <p className="mb-2 flex items-center"><MdCake className="mr-2 text-gray-500" /> <strong>나이(추정나이):</strong> {data.age}</p>
                            <p className="mb-2 flex items-center">
                                {getGenderIcon(data.gender)}
                                <strong>성별:</strong> {data.gender}
                            </p>
                            <p className="mb-2 flex items-center"><RiMickeyLine className="mr-2 text-gray-500" /> <strong>마이크로칩 ID:</strong> {data.microchipId}</p>
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold mb-4 flex items-center">
                                <FaInfoCircle className="mr-2 text-blue-500" /> 실종 정보
                            </h2>
                            <p className="mb-2 flex items-center"><FaCalendarAlt className="mr-2 text-gray-500" /> <strong>날짜:</strong> {data.dateLost.join('-')}</p>
                            <p className="mb-2 flex items-center"><FaMapMarkerAlt className="mr-2 text-gray-500" /> <strong>위치:</strong> {`${data.location.province} ${data.location.city} ${data.location.district} ${data.location.street} ${data.location.addressDetail}`}</p>
                        </div>
                    </div>
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold mb-2 flex items-center">
                            <FaInfoCircle className="mr-2 text-blue-500" /> 추가 정보
                        </h2>
                        <p className="mb-2"><strong>동물 특징:</strong> {data.petDescription}</p>
                        <p><strong>상세 내용:</strong> {data.content}</p>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold mb-2 flex items-center">
                            <FaPhone className="mr-2 text-blue-500" /> 연락처
                        </h2>
                        <p className="mb-2 flex items-center"><FaPhone className="mr-2 text-gray-500" /> <strong>비상연락처 1:</strong> {data.contact1}</p>
                        <p className="flex items-center"><FaPhone className="mr-2 text-gray-500" /> <strong>비상연락처 2:</strong> {data.contact2}</p>
                    </div>
                </div>
                {isLoggedIn && userInfo && userInfo.uid !== data.userUid && (
                    <div className="bg-gray-100 px-6 py-4">
                        <button
                            onClick={handleStartChat}
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out flex items-center justify-center"
                        >
                            <FaComments className="mr-2" /> 채팅하기
                        </button>
                    </div>
                )}
            </div>

            {/* Image Popup */}
            {selectedImage && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
                    onClick={closeImagePopup}
                >
                    <div className="relative max-w-full max-h-full">
                        <img
                            src={selectedImage}
                            alt="Selected pet"
                            className="max-w-full max-h-full w-auto h-auto object-contain"
                            style={{ transform: `scale(${scale})`, transition: 'transform 0.2s' }}
                            onClick={(e) => e.stopPropagation()}
                        />
                        <div className="absolute top-4 right-4 flex space-x-2">
                            <button
                                className="bg-white text-black p-2 rounded-full"
                                onClick={handleZoomIn}
                            >
                                <FaSearchPlus />
                            </button>
                            <button
                                className="bg-white text-black p-2 rounded-full"
                                onClick={handleZoomOut}
                            >
                                <FaSearchMinus />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MissingPostDetail;