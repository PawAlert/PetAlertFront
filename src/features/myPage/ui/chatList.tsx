import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getChatRooms } from '../../chat/api/chatApi';
import { useAuth } from '../../auth/Login/customHook/useAuth';

interface ChatRoom {
    id: string;
    missingPostId: string;
    senderUid: string;
    receiverUid: string;
    lastMessage?: string;
    lastMessageTime?: string;
}

const ChatList: React.FC = () => {
    const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
    const { userInfo } = useAuth();

    useEffect(() => {
        const fetchChatRooms = async () => {
            try {
                const rooms = await getChatRooms();
                setChatRooms(rooms);
            } catch (error) {
                console.error('Failed to fetch chat rooms:', error);
            }
        };
        fetchChatRooms();
    }, []);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">내 채팅 리스트</h1>
            <ul className="space-y-4">
                {chatRooms.map(room => (
                    <li key={room.id} className="bg-white shadow rounded-lg p-4">
                        <Link
                            to={`/chat/${room.id}`}
                            state={{ receiverUid: room.senderUid === userInfo?.uid ? room.receiverUid : room.senderUid }}
                            className="text-blue-500 hover:text-blue-700"
                        >
                            <div className="flex justify-between items-center">
                                <span>채팅방 {room.id.slice(0, 8)}...</span>
                                <span className="text-sm text-gray-500">
                                    {room.senderUid === userInfo?.uid ? '보낸 메시지' : '받은 메시지'}
                                </span>
                            </div>
                            {room.lastMessage && (
                                <p className="text-sm text-gray-600 mt-2">
                                    마지막 메시지: {room.lastMessage}
                                </p>
                            )}
                            {room.lastMessageTime && (
                                <p className="text-xs text-gray-400 mt-1">
                                    {new Date(room.lastMessageTime).toLocaleString()}
                                </p>
                            )}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ChatList;