export interface Inquiry {
    type: string;
    name: string;
    email: string;
    phoneNumber: string;
    content: string;
}

export interface MyInquiriesResponse {
    status: string;
    message: string;
    data: {
        content: Inquiry[];
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
        totalElements: number;
        totalPages: number;
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

export interface Inquiry {
    id: number;
    type: string;
    name: string;
    email: string;
    phoneNumber: string;
    content: string;
}