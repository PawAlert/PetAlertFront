import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getChatRooms } from '../api/chatApi.ts';

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
            <h1 className="text-3xl font-bold mb-6">채팅 리스트</h1>
            <ul className="space-y-4">
                {chatRooms.map(room => (
                    <li key={room.id} className="bg-white shadow rounded-lg p-4">
                        <Link to={`/chat/${room.id}`} className="text-blue-500 hover:text-blue-700">
                            채팅방 {room.id} (게시글: {room.missingPostId})
                            {room.lastMessage && (
                                <p className="text-sm text-gray-500">
                                    마지막 메시지: {room.lastMessage} ({room.lastMessageTime})
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