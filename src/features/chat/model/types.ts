// src/features/chat/types.ts
// 보내는 메시지
export interface ChatMessageDTO {
    senderUid: string;
    receiverUid: string;
    message: string;
    chatRoomId: string;
}

export interface UserProfile {
    uid: string;
    email: string;
    userName: string;
    phoneNumber: string;
    authProvider: string;
    profileImageUrl: string;
    userRoles: string;
}