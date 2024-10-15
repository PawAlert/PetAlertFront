import {AddressData} from "../../../shared/components/model/AddressData.tsx";


export interface OfficialRegistrationDto {
    institutionName: string;
    representativeName: string;
    email: string;
    phoneNumber: string;
    institutionType: string;
    location: AddressData;
    website: string;
    institutionDescription: string;
    operatingHours: string;
    registrationNumber: string;
    additionalImages: string[];
    termsAgreed: boolean;
    privacyPolicyAgreed: boolean;
}