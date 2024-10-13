export interface LocationRecord {
    latitude: number;
    longitude: number;
    postcode: string;
    address: string;
    addressDetail: string;
}

export const DEFAULT_LOCATION_RECORD: LocationRecord = {
    latitude: 0,
    longitude: 0,
    postcode: '',
    address: '',
    addressDetail: '',
};