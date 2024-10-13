import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useChat } from '../hooks/useChat';
import { getChatMessages } from '../api/chatApi';
import { ChatMessageDTO } from '../model/types';

export const ChatRoom: React.FC = () => {
    const { chatRoomId } = useParams<{ chatRoomId: string }>();
    const location = useLocation();
    const receiverUid = location.state?.receiverUid || '';
    const [inputMessage, setInputMessage] = useState('');
    const { messages, sendMessage, currentUser, isConnected } = useChat(chatRoomId!);
    const [initialMessages, setInitialMessages] = useState<ChatMessageDTO[]>([]);

    const loadInitialMessages = useCallback(async () => {
        if (!chatRoomId) return;
            const fetchedMessages = await getChatMessages(chatRoomId);

            setInitialMessages(fetchedMessages);

    }, [chatRoomId]);

    useEffect(() => {
        loadInitialMessages();
    }, [loadInitialMessages]);


    const handleSendMessage = useCallback(() => {
        if (inputMessage.trim() && currentUser && receiverUid && isConnected) {
            console.log("메시지 전송 시도");
            sendMessage(inputMessage, receiverUid);
            setInputMessage('');
        } else {
            console.log("메시지 전송 조건 불충족", { inputMessage, currentUser, receiverUid, isConnected });
        }
    }, [inputMessage, currentUser, receiverUid, isConnected, sendMessage]);

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setInputMessage(e.target.value);
    }, []);

    const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        console.log("key")
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault(); // 폼 제출 방지
            handleSendMessage();
        }
    }, [handleSendMessage]);

    if (!isConnected) {
        return <div className="flex justify-center items-center h-screen">Connecting to chat server...</div>;
    }

    if (!currentUser) {
        return <div className="flex justify-center items-center h-screen">Loading user profile...</div>;
    }

    const allMessages = [...initialMessages, ...messages];

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            <div className="flex-grow overflow-y-auto p-4">
                {allMessages.map((msg, index) => (
                    <div key={index} className={`mb-2 ${msg.senderUid === currentUser.uid ? 'text-right' : 'text-left'}`}>
                        <span className={`inline-block rounded px-3 py-2 max-w-xs lg:max-w-md ${
                            msg.senderUid === currentUser.uid ? 'bg-blue-500 text-white' : 'bg-white text-gray-900'
                        }`}>
                            {msg.message}
                        </span>
                    </div>
                ))}
            </div>
            <div className="p-4 bg-white border-t">
                <div className="flex">
                    <input
                        type="text"
                        value={inputMessage}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        className="flex-grow border rounded-l px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="메시지를 입력하세요..."
                    />
                    <button
                        onClick={handleSendMessage}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-r transition duration-200"
                    >
                        전송
                    </button>
                </div>
            </div>
        </div>
    );
};