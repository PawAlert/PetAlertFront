import React, { useState } from 'react';
import { createMissingReport } from '../api/missingReportApi';
import { PostCodeSearch } from '../../../shared/components/PostCodeSearch.tsx';
import { MissingReportData } from '../model/types';
import {AddressData} from "../../../shared/components/model/AddressData.tsx";
import {MultiImageUploader} from "../../../shared/components/ImageUploader.tsx";
import {DEFAULT_LOCATION_RECORD} from "../../../shared/location.ts";

export const MissingReportForm: React.FC = () => {
    const [formData, setFormData] = useState<MissingReportData>({
        missingTitle: '',
        incidentDescription: '',
        missingDateLost: '',
        emergencyContact1: '',
        emergencyContact2: '',
        petAdditionalInfo: '',
        status: 'MISSING',
        microchipId: '',
        missingPetName: '',
        missingSpecies: '',
        missingPetColor: '',
        missingPetAge: 0,
        MissingPetGender: '',
        missingPetDescription: '',
        missingPetImages: [],
        locationRecord: DEFAULT_LOCATION_RECORD,
    });



    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            locationRecord: { ...formData.locationRecord, [name]: value },
        });
    };


    const handleAddressSelect = (addressData: AddressData) => {
        console.log('Received addressData:', addressData);
        setFormData({
            ...formData,
            locationRecord: {
                ...formData.locationRecord,
                postcode: addressData.postcode,
                address: addressData.address,
                addressDetail: addressData.addressDetail,
                latitude: typeof addressData.latitude === 'string' ? parseFloat(addressData.latitude) : addressData.latitude,
                longitude: typeof addressData.longitude === 'string' ? parseFloat(addressData.longitude) : addressData.longitude,
            }
        });
        console.log('Updated formData:', formData);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createMissingReport(formData);
            alert('실종 신고가 성공적으로 등록되었습니다.');
        } catch (error) {
            console.error('Failed to create missing report:', error);
            alert('실종 신고 등록에 실패했습니다. 다시 시도해주세요.');
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div className="sm:col-span-6">
                        <label htmlFor="missingTitle" className="block">
                            제목
                        </label>
                        <input
                            type="text"
                            name="missingTitle"
                            id="missingTitle"
                            value={formData.missingTitle}
                            onChange={handleChange}
                            className="mt-1"
                            required
                        />
                    </div>

                    <div className="sm:col-span-3">
                        <label htmlFor="missingPetName" className="block">
                            반려동물 이름
                        </label>
                        <input
                            type="text"
                            name="missingPetName"
                            id="missingPetName"
                            value={formData.missingPetName}
                            onChange={handleChange}
                            className="mt-1 block"
                            required
                        />
                    </div>

                    <div className="sm:col-span-3">
                        <label htmlFor="missingSpecies" className="block">
                            품종
                        </label>
                        <input
                            type="text"
                            name="missingSpecies"
                            id="missingSpecies"
                            value={formData.missingSpecies}
                            onChange={handleChange}
                            className="mt-1 block"
                            required
                        />
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="missingPetColor" className="block">
                            색상
                        </label>
                        <input
                            type="text"
                            name="missingPetColor"
                            id="missingPetColor"
                            value={formData.missingPetColor}
                            onChange={handleChange}
                            className="mt-1 block"
                            required
                        />
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="missingPetAge" className="block">
                            나이
                        </label>
                        <input
                            type="number"
                            name="missingPetAge"
                            id="missingPetAge"
                            value={formData.missingPetAge}
                            onChange={handleChange}
                            className="mt-1 block"
                            required
                        />
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="MissingPetGender" className="block">
                            성별
                        </label>
                        <select
                            id="MissingPetGender"
                            name="MissingPetGender"
                            value={formData.MissingPetGender}
                            onChange={handleChange}
                            className="mt-1 block"
                            required
                        >
                            <option value="">선택하세요</option>
                            <option value="남자">수컷</option>
                            <option value="여자">암컷</option>
                        </select>
                    </div>

                    <div className="sm:col-span-3">
                        <label htmlFor="microchipId" className="block">
                            마이크로칩 번호
                        </label>
                        <input
                            type="text"
                            name="microchipId"
                            id="microchipId"
                            value={formData.microchipId}
                            onChange={handleChange}
                            className="mt-1 block"
                        />
                    </div>

                    <div className="sm:col-span-6">
                        <label htmlFor="missingPetDescription" className="block">
                            반려동물 특징
                        </label>
                        <textarea
                            id="missingPetDescription"
                            name="missingPetDescription"
                            rows={3}
                            value={formData.missingPetDescription}
                            onChange={handleChange}
                            className="mt-1 block"
                            required
                        ></textarea>
                    </div>

                    <div className="sm:col-span-3">
                        <label htmlFor="missingDateLost" className="block">
                            실종 날짜
                        </label>
                        <input
                            type="date"
                            name="missingDateLost"
                            id="missingDateLost"
                            value={formData.missingDateLost}
                            onChange={handleChange}
                            className="mt-1 block"
                            required
                        />
                    </div>

                    <div className="sm:col-span-3">
                        <label htmlFor="emergencyContact1" className="block">
                            긴급 연락처 1
                        </label>
                        <input
                            type="tel"
                            name="emergencyContact1"
                            id="emergencyContact1"
                            value={formData.emergencyContact1}
                            onChange={handleChange}
                            className="mt-1 block"
                            placeholder="010-1234-5678"
                            required
                        />
                    </div>

                    <div className="sm:col-span-3">
                        <label htmlFor="emergencyContact2" className="block">
                            긴급 연락처 2
                        </label>
                        <input
                            type="tel"
                            name="emergencyContact2"
                            id="emergencyContact2"
                            value={formData.emergencyContact2}
                            onChange={handleChange}
                            className="mt-1 block"
                            placeholder="010-9876-5432"
                        />
                    </div>

                    <div className="sm:col-span-6">
                        <label htmlFor="incidentDescription" className="block">
                            실종 상황 설명
                        </label>
                        <textarea
                            id="incidentDescription"
                            name="incidentDescription"
                            rows={4}
                            value={formData.incidentDescription}
                            onChange={handleChange}
                            className="mt-1 block"
                            required
                        ></textarea>
                    </div>

                    <div className="sm:col-span-6">
                        <label htmlFor="petAdditionalInfo" className="block">
                            추가 정보
                        </label>
                        <textarea
                            id="petAdditionalInfo"
                            name="petAdditionalInfo"
                            rows={3}
                            value={formData.petAdditionalInfo}
                            onChange={handleChange}
                            className="mt-1 block"
                        ></textarea>
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="postcode" className="block">
                            우편번호
                        </label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                            <input
                                type="text"
                                name="postcode"
                                id="postcode"
                                value={formData.locationRecord.postcode}
                                readOnly
                                className="flex-1 block bg-gray-100"
                            />
                            <PostCodeSearch onAddressSelect={handleAddressSelect}/>
                        </div>
                    </div>

                    <div className="sm:col-span-4">
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                            주소
                        </label>
                        <input
                            type="text"
                            name="address"
                            id="address"
                            value={formData.locationRecord.address}
                            readOnly
                            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-100"
                        />
                    </div>

                    <div className="sm:col-span-6">
                        <label htmlFor="addressDetail" className="block text-sm font-medium text-gray-700">
                            상세주소
                        </label>
                        <input
                            type="text"
                            name="addressDetail"
                            id="addressDetail"
                            value={formData.locationRecord.addressDetail}
                            onChange={handleLocationChange}
                            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            placeholder="상세 주소를 입력해주세요"
                        />
                    </div>

                    <div className="sm:col-span-6">
                        <MultiImageUploader onImagesChange={(urls) => console.log(urls)} maxImages={3} />
                    </div>
                </div>

                <div className="pt-5">
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            게시글 등록하기
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};