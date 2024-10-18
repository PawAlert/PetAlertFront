export interface LocationRecord {
    latitude: number;
    longitude: number;
    postcode: string;
    province: string;  // 시/도
    city: string;      // 시/군/구
    district: string;  // 읍/면/동
    street: string;    // 도로명 주소
    addressDetail: string;
}

export const DEFAULT_LOCATION_RECORD: LocationRecord = {
    latitude: 0,
    longitude: 0,
    postcode: '',
    province: '',
    city: '',
    district: '',
    street: '',
    addressDetail: '',
};