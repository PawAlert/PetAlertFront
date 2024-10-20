import { LocationRecord } from "../../../shared/location.ts";

export interface MissingReportData {
    missingTitle: string;
    incidentDescription: string;
    missingDateLost: string;
    emergencyContact1: string;
    emergencyContact2: string;
    petAdditionalInfo: string;
    status: 'MISSING' | 'FOUND' | 'TEMPORARY_CARE' | 'CLOSED';
    microchipId: string;
    missingPetName: string;
    missingSpecies: string;
    missingPetColor: string;
    missingPetAge: number;
    missingPetGender: string;
    missingPetDescription: string;
    missingPetImages: string[];
    locationRecord: LocationRecord;
}

export interface MissingPost {
    missingReportId: number;
    missingTitle: string;
    petName: string;
    locationRecord: LocationRecord;
    dateLost: number[];
    petImageUrl: string;
    missingStatus : string;
}

export interface PaginationInfo {
    totalElements: number;
    totalPages: number;
    number: number;
    size: number;
}

export interface MissingPostsResponse {
    status: string;
    message: string;
    data: {
        content: MissingPost[];
        pageable: {
            pageNumber: number;
            pageSize: number;
            sort: {
                sorted: boolean;
                unsorted: boolean;
                empty: boolean;
            };
            offset: number;
            paged: boolean;
            unpaged: boolean;
        };
        last: boolean;
        totalElements: number;
        totalPages: number;
        first: boolean;
        numberOfElements: number;
        size: number;
        number: number;
        sort: {
            sorted: boolean;
            unsorted: boolean;
            empty: boolean;
        };
        empty: boolean;
    };
}

export interface FetchMissingPostsParams {
    page: number;
    size: number;
    sortByClosest: boolean;
    status?: string;
    province?: string;
    city?: string;
}

export interface MissingPostDetailData {
    userName: string | null;
    userUid: string;
    phoneNumber: string | null;
    isMine: boolean;
    missingReportId: number;
    title: string;
    content: string;
    dateLost: number[];
    location: LocationRecord;
    description: string;
    missingStatus: string;
    petName: string;
    petSpecies: string;
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