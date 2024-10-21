import {AddressData} from "../../../shared/components/model/AddressData.tsx";

export interface Announcement {
    id: number;
    title: string;
    status: string;
    shelterLocation: {
        latitude: number;
        longitude: number;
        postcode: string;
        address: string;
        addressDetail: string;
    };
    animalType: string;
    foundLocation: string;
    adoptionAvailableDate: number[];
    announcementExpiryDate: number[];
    firstImageUrl: string;
}

export interface AnnouncementsResponse {
    status: string;
    message: string;
    data: {
        content: Announcement[];
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
        first: boolean;
        size: number;
        number: number;
        sort: {
            empty: boolean;
            sorted: boolean;
            unsorted: boolean;
        };
        numberOfElements: number;
        empty: boolean;
    };
}

export interface AnnouncementDetail {
    id: number;
    title: string;
    content: string;
    status: string;
    shelterName: string;
    shelterLocation: {
        latitude: number;
        longitude: number;
        postcode: string;
        address: string;
        addressDetail: string;
    };
    animalType: string;
    breed: string;
    animalName: string;
    estimatedAge: number;
    gender: string;
    isNeutered: boolean;
    weight: number;
    color: string;
    foundLocation: string;
    specialNotes: string;
    adoptionAvailableDate: number[];
    announcementExpiryDate: number[];
    adoptionRequirements: string;
    imageUrls: string[];
}

export interface CreateAnnouncementDto {
    title: string;
    content: string;
    shelterName: string;
    shelterLocation: AddressData;
    animalType: string;
    breed: string;
    animalName: string;
    estimatedAge: number;
    gender: string;
    isNeutered: boolean;
    weight: number;
    color: string;
    foundLocation: string;
    specialNotes: string;
    adoptionAvailableDate: string;
    announcementExpiryDate: string;
    adoptionRequirements: string;
    imageUrls: string[];
}

export type NestedObject = {
    [key: string]: string | number | boolean | NestedObject;
};