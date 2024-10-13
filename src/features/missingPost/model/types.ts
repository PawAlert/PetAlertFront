import {LocationRecord} from "../../../shared/location.ts";

export interface MissingReportData {
    missingTitle: string;
    incidentDescription: string;
    missingDateLost: string;
    emergencyContact1: string;
    emergencyContact2: string;
    petAdditionalInfo: string;
    status: 'MISSING' | 'FOUND' | 'CLOSED';
    microchipId: string;
    missingPetName: string;
    missingSpecies: string;
    missingPetColor: string;
    missingPetAge: number;
    MissingPetGender: string;
    missingPetDescription: string;
    missingPetImages: string[];
    locationRecord: LocationRecord;
}

export interface MissingPostData {
    missingReportId: number;
    missingTitle: string;
    petName: string;
    address: string;
    addressDetail: string;
    missingStatus: string;
    dateLost: number[];
    petImageUrls: string;
}

export interface PaginationInfo {
    totalElements: number;
    totalPages: number;
    number: number;
    size: number;
}

export interface MissingPostsResponse {
    content: MissingPostData[];
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
}

export interface FetchMissingPostsParams {
    page: number;
    sortDirection: 'ASC' | 'DESC';
    statusFilter: 'MISSING' | 'FOUND' | '';
}

export interface MissingPostDetailData {
    userName: string;
    userUid: string;
    phoneNumber: string;
    isMine: boolean;
    missingReportId: number;
    title: string;
    content: string;
    dateLost: number[];
    location: {
        postcode: string;
        address: string;
        addressDetail: string;
        latitude: number;
        longitude: number;
    };
    description: string;
    missingStatus: string;
    petName: string;
    petSpecies: string;
    neutering: boolean;
    color: string;
    age: number;
    gender: string;
    microchipId: string;
    petDescription: string;
    missingPetImages: Array<{
        petId: number;
        imageUrl: string;
    }>;
    contact1: string;
    contact2: string;
}