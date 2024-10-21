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


export interface NoticeListItem {
    title: string;
    content: string;
    type: 'GENERAL' | 'URGENT' | 'EVENT' | 'MAINTENANCE';
    validFrom: number[];
    validUntil: number[];
    priority: 'LOW' | 'MEDIUM' | 'HIGH';
    attachmentUrls: string[];
    relatedLink: string | null;
}

export interface NoticeListResponse {
    status: string;
    message: string;
    data: {
        content: NoticeListItem[];
        pageable: {
            pageNumber: number;
            pageSize: number;
            sort: {
                empty: boolean;
                sorted: boolean;
                unsorted: boolean;
            };
            offset: number;
            paged: boolean;
            unpaged: boolean;
        };
        last: boolean;
        totalPages: number;
        totalElements: number;
        size: number;
        number: number;
        sort: {
            empty: boolean;
            sorted: boolean;
            unsorted: boolean;
        };
        first: boolean;
        numberOfElements: number;
        empty: boolean;
    };
}

export type CreateNoticeRequest = Notice;