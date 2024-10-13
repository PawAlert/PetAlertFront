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
    locationRecord: LocationRecord;  // 여기를 수정했습니다
}