// src/features/chat/hooks/useChat.ts
import {useState, useCallback, useEffect, useRef} from 'react';
import {useWebSocket} from './useWebSocket';
import {ChatMessageDTO, UserProfile} from "../model/types";
import {fetchUserProfile} from "../api/useApi";
import {StompSubscription} from '@stomp/stompjs';

export const useChat = (chatRoomId: string) => {
    const [messages, setMessages] = useState<ChatMessageDTO[]>([]);
    const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
    const {client, isConnected} = useWebSocket();
    const subscriptionRef = useRef<StompSubscription | null>(null);

    useEffect(() => {
        const loadUserProfile = async () => {
            try {
                const profile = await fetchUserProfile();
                setCurrentUser(profile);
            } catch (error) {
                console.error("프로필 확인", error);
            }
        };
        loadUserProfile();
    }, []);

    useEffect(() => {
        if (client && isConnected) {
            subscribeToMessages();
        }
        return () => {
            if (subscriptionRef.current) {
                subscriptionRef.current.unsubscribe();
            }
        };
    }, [client, isConnected, chatRoomId]);

    //메시지 보내기
    const sendMessage = useCallback((message: string, receiverUid: string) => {
        console.log('보낸 메시지', {message, receiverUid, client, isConnected, currentUser});
        if (client && isConnected && currentUser) {
            const chatMessage: ChatMessageDTO = {
                senderUid: currentUser.uid,
                receiverUid,
                message,
                chatRoomId,
            };
            client.publish({destination: `/app/chat/${chatRoomId}/sendMessage`, body: JSON.stringify(chatMessage)});
        } else {
            console.error('메시지 보내기 에러');
        }
    }, [client, isConnected, chatRoomId, currentUser]);


    const subscribeToMessages = useCallback(() => {
        console.log('subscribeToMessages called', {client, isConnected, chatRoomId});
        if (client && isConnected) {
            subscriptionRef.current = client.subscribe(`/topic/chat/${chatRoomId}`, (message) => {
                const chatMessage: ChatMessageDTO = JSON.parse(message.body);
                console.log('Received message:', chatMessage);
                setMessages((prevMessages) => [...prevMessages, chatMessage]);
            });
        }
    }, [client, isConnected, chatRoomId]);

    return {messages, sendMessage, currentUser, isConnected};
};