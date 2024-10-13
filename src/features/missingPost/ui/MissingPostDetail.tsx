import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { MissingPostDetailData } from '../model/types';
import { useAuth } from '../../auth/Login/customHook/useAuth';
import { createChatRoom } from '../../chat/api/chatApi';

const fetchMissingPostDetail = async (id: string): Promise<MissingPostDetailData> => {
    const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/api/missing/getdetail/${id}`);
    return response.data.data;
};

const MissingPostDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { isLoggedIn, userInfo, userInfoLoading } = useAuth();
    const { data, isLoading, error } = useQuery({
        queryKey: ['missingPostDetail', id],
        queryFn: () => fetchMissingPostDetail(id!),
        enabled: !!id
    });

    const handleStartChat = async () => {
        if (data && isLoggedIn && userInfo) {
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

    if (isLoading || userInfoLoading) return <div>Loading...</div>;
    if (error) return <div>An error has occurred</div>;
    if (!data || !userInfo) return null;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">{data.title}</h1>
            <div className="bg-white shadow-md rounded-lg p-6">
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <p><strong>Pet Name:</strong> {data.petName}</p>
                    <p><strong>Status:</strong> {data.missingStatus}</p>
                    <p><strong>Species:</strong> {data.petSpecies}</p>
                    <p><strong>Color:</strong> {data.color}</p>
                    <p><strong>Age:</strong> {data.age}</p>
                    <p><strong>Gender:</strong> {data.gender}</p>
                </div>
                <p className="mb-4"><strong>Description:</strong> {data.petDescription}</p>
                <p className="mb-4"><strong>Date Lost:</strong> {data.dateLost.join('-')}</p>
                <p className="mb-4"><strong>Location:</strong> {data.location.address} {data.location.addressDetail}</p>
                <p className="mb-4"><strong>Content:</strong> {data.content}</p>
                <div className="mb-4">
                    <strong>Images:</strong>
                    <div className="flex space-x-2 mt-2">
                        {data.missingPetImages.map((image) => (
                            <img key={image.petId} src={image.imageUrl} alt="Pet" className="w-32 h-32 object-cover rounded" />
                        ))}
                    </div>
                </div>
                <p><strong>Contact 1:</strong> {data.contact1}</p>
                <p><strong>Contact 2:</strong> {data.contact2}</p>

                {isLoggedIn && userInfo && userInfo.uid !== data.userUid && (
                    <button
                        onClick={handleStartChat}
                        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        채팅 시작하기
                    </button>
                )}
            </div>
        </div>
    );
};

export default MissingPostDetail;