import {useCallback, useEffect, useRef, useState} from 'react';
import {Client} from '@stomp/stompjs';

export const useWebSocket = () => {
    console.log('useWebSocket hook called');
    const [isConnected, setIsConnected] = useState(false);
    const clientRef = useRef<Client | null>(null);

    // 연결
    const connect = useCallback(() => {
        if (clientRef.current) {
            clientRef.current.activate();
        }
    }, []);

    // 연결 해제
    const disconnect = useCallback(() => {
        if (clientRef.current) {
            clientRef.current.deactivate();
        }
    }, []);

    useEffect(() => {
        clientRef.current = new Client({
            // todo : 배포할 때 wws 로 변경하기
            brokerURL: `${import.meta.env.VITE_APP_WS_URL}`,  // 'ws://' 프로토콜 사용 //
            connectHeaders: {},
            debug: function (str) {
                console.log('STOMP debug:', str);
            },
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
            onConnect: () => {
                console.log('Connected to STOMP');
                setIsConnected(true);
            },
            onDisconnect: () => {
                console.log('Disconnected from STOMP');
                setIsConnected(false);
            },
            onStompError: (frame) => {
                console.error('STOMP error:', frame);
            },
            onWebSocketError: (event) => {
                console.error('WebSocket error:', event);
            }
        });
        connect();

        return () => {
            disconnect();
        };
    }, [connect, disconnect]);

    return { client: clientRef.current, isConnected, connect, disconnect };
};