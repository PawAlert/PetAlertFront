export interface Location {
    latitude: number;
    longitude: number;
    postcode: string;
    province: string;
    city: string;
    district: string;
    street: string;
    addressDetail: string;
}

export interface VolunteerActivity {
    id: number;
    userUid: string;
    title: string;
    description: string;
    date: number[];
    activityType: ActivityType;
    startTime: number[];
    endTime: number[];
    location: Location;
    requiredVolunteers: number;
    requiredSkills: string;
    organizationName: string;
    contactName: string;
    contactEmail: string;
    contactPhone: string;
    images: string[];
}


export interface Pageable {
    pageNumber: number;
    pageSize: number;
    sort: Sort;
    offset: number;
    paged: boolean;
    unpaged: boolean;
}

export interface Sort {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
}

export interface VolunteerSearchResponse {
    status: string;
    message: string;
    data: {
        content: VolunteerActivity[];
        pageable: Pageable;
        last: boolean;
        totalElements: number;
        totalPages: number;
        size: number;
        number: number;
        sort: Sort;
        first: boolean;
        numberOfElements: number;
        empty: boolean;
    };
}

export interface SearchFilters {
    activityType: string;
    province: string;
    city: string;
    sortByClosest: boolean;
}
export enum ActivityType {
    CARE = "돌봄 봉사",
    MEDICAL = "의료 지원",
    ADOPTION = "입양 지원",
    EDUCATION = "교육 및 훈련",
    FACILITY = "시설 봉사",
    EVENT = "행사 지원",
    OTHER = "기타"
}