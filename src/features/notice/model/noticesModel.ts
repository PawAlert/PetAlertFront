export interface Notice {
    title: string;
    content: string;
    type: 'GENERAL' | 'URGENT' | 'EVENT' | 'MAINTENANCE';
    validFrom: string;
    validUntil: string;
    priority: 'LOW' | 'MEDIUM' | 'HIGH';
    attachmentUrls: string[];
    relatedLink: string;
}

export interface CreateNoticeResponse {
    status: string;
    message: string;
    data: string;
}

export type CreateNoticeRequest = Notice;