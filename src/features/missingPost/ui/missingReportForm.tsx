import React, { useState } from 'react';
import { createMissingReport } from '../api/missingReportApi';
import { PostCodeSearch } from '../../../shared/components/PostCodeSearch.tsx';
import { MissingReportData } from '../model/types';
import { AddressData } from "../../../shared/components/model/AddressData.tsx";
import { MultiImageUploader } from "../../../shared/components/ImageUploader.tsx";
import { DEFAULT_LOCATION_RECORD } from "../../../shared/location.ts";

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
        missingPetGender: '',
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
        setFormData({
            ...formData,
            locationRecord: {
                ...formData.locationRecord,
                postcode: addressData.postcode,
                province: addressData.province,
                city: addressData.city,
                district: addressData.district,
                street: addressData.street,
                addressDetail: addressData.addressDetail,
                latitude: addressData.latitude,
                longitude: addressData.longitude,
            }
        });
    };

    const handleImagesChange = (urls: string[]) => {
        setFormData(prev => ({ ...prev, missingPetImages: urls }));
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
        <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">반려동물을 찾아요</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="border rounded-md p-4">
                    <label htmlFor="missingTitle" className="block text-sm font-medium text-gray-700 mb-1">제목</label>
                    <input
                        type="text"
                        name="missingTitle"
                        id="missingTitle"
                        value={formData.missingTitle}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="제목을 입력해주세요"
                        required
                    />
                </div>

                <div className="border rounded-md p-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">상태</label>
                    <div className="flex items-center space-x-4">
                        <button
                            type="button"
                            onClick={() => setFormData(prev => ({...prev, status: 'MISSING'}))}
                            className={`px-4 py-2 rounded-md ${
                                formData.status === 'MISSING'
                                    ? 'bg-red-500 text-white'
                                    : 'bg-gray-200 text-gray-700'
                            }`}
                        >
                            실종
                        </button>
                        <button
                            type="button"
                            onClick={() => setFormData(prev => ({...prev, status: 'FOUND'}))}
                            className={`px-4 py-2 rounded-md ${
                                formData.status === 'FOUND'
                                    ? 'bg-green-500 text-white'
                                    : 'bg-gray-200 text-gray-700'
                            }`}
                        >
                            발견
                        </button>
                        <button
                            type="button"
                            onClick={() => setFormData(prev => ({...prev, status: 'TEMPORARY_CARE'}))}
                            className={`px-4 py-2 rounded-md ${
                                formData.status === 'TEMPORARY_CARE'
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-200 text-gray-700'
                            }`}
                        >
                            임보
                        </button>
                    </div>
                </div>

                <div className="border rounded-md p-4 grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="missingPetName" className="block text-sm font-medium text-gray-700 mb-1">반려동물
                            이름</label>
                        <input
                            type="text"
                            name="missingPetName"
                            id="missingPetName"
                            value={formData.missingPetName}
                            onChange={handleChange}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="이름을 입력하세요"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="missingSpecies"
                               className="block text-sm font-medium text-gray-700 mb-1">품종</label>
                        <input
                            type="text"
                            name="missingSpecies"
                            id="missingSpecies"
                            value={formData.missingSpecies}
                            onChange={handleChange}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="품종을 입력하세요"
                            required
                        />
                    </div>
                </div>

                <div className="border rounded-md p-4 grid grid-cols-3 gap-4">
                    <div>
                        <label htmlFor="missingPetColor"
                               className="block text-sm font-medium text-gray-700 mb-1">색상</label>
                        <input
                            type="text"
                            name="missingPetColor"
                            id="missingPetColor"
                            value={formData.missingPetColor}
                            onChange={handleChange}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="색상을 입력하세요"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="missingPetAge"
                               className="block text-sm font-medium text-gray-700 mb-1">나이</label>
                        <input
                            type="number"
                            name="missingPetAge"
                            id="missingPetAge"
                            value={formData.missingPetAge}
                            onChange={handleChange}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="나이를 입력하세요"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="missingPetGender"
                               className="block text-sm font-medium text-gray-700 mb-1">성별</label>
                        <select
                            id="missingPetGender"
                            name="missingPetGender"
                            value={formData.missingPetGender}
                            onChange={handleChange}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        >
                            <option value="">선택하세요</option>
                            <option value="남자">수컷</option>
                            <option value="여자">암컷</option>
                        </select>
                    </div>
                </div>

                <div className="border rounded-md p-4">
                    <label htmlFor="missingPetDescription" className="block text-sm font-medium text-gray-700 mb-1">반려동물
                        특징</label>
                    <textarea
                        id="missingPetDescription"
                        name="missingPetDescription"
                        rows={3}
                        value={formData.missingPetDescription}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="반려동물의 특징을 자세히 설명해주세요"
                        required
                    ></textarea>
                </div>

                <div className="border rounded-md p-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">실종 날짜</label>
                    <input
                        type="date"
                        name="missingDateLost"
                        value={formData.missingDateLost}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        required
                    />
                </div>

                <div className="border rounded-md p-4 grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="emergencyContact1" className="block text-sm font-medium text-gray-700 mb-1">긴급
                            연락처 1</label>
                        <input
                            type="tel"
                            name="emergencyContact1"
                            id="emergencyContact1"
                            value={formData.emergencyContact1}
                            onChange={handleChange}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="010-1234-5678"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="emergencyContact2" className="block text-sm font-medium text-gray-700 mb-1">긴급
                            연락처 2</label>
                        <input
                            type="tel"
                            name="emergencyContact2"
                            id="emergencyContact2"
                            value={formData.emergencyContact2}
                            onChange={handleChange}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="010-9876-5432"
                        />
                    </div>
                </div>

                <div className="border rounded-md p-4">
                    <label htmlFor="incidentDescription" className="block text-sm font-medium text-gray-700 mb-1">실종 상황
                        설명</label>
                    <textarea
                        id="incidentDescription"
                        name="incidentDescription"
                        rows={4}
                        value={formData.incidentDescription}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="실종 당시의 상황을 자세히 설명해주세요"
                        required
                    ></textarea>
                </div>

                <div className="border rounded-md p-4">
                    <label htmlFor="petAdditionalInfo" className="block text-sm font-medium text-gray-700 mb-1">추가
                        정보</label>
                    <textarea
                        id="petAdditionalInfo"
                        name="petAdditionalInfo"
                        rows={3}
                        value={formData.petAdditionalInfo}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="기타 추가 정보가 있다면 입력해주세요"
                    ></textarea>
                </div>

                <div className="border rounded-md p-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">주소</label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                        <input
                            type="text"
                            name="postcode"
                            value={formData.locationRecord.postcode}
                            readOnly
                            className="flex-1 rounded-none rounded-l-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="우편번호"
                        />
                        <PostCodeSearch onAddressSelect={handleAddressSelect}/>
                    </div>
                    <input
                        type="text"
                        name="address"
                        value={`${formData.locationRecord.province} ${formData.locationRecord.city} ${formData.locationRecord.district} ${formData.locationRecord.street}`}
                        readOnly
                        className="mt-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="주소"
                    />
                    <input
                        type="text"
                        name="addressDetail"
                        value={formData.locationRecord.addressDetail}
                        onChange={handleLocationChange}
                        className="mt-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="상세주소를 입력해주세요"
                    />
                </div>

                <div className="border rounded-md p-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">사진</label>
                    <MultiImageUploader onImagesChange={handleImagesChange} maxImages={3}/>
                    <div className="mt-2 flex space-x-2">
                        {formData.missingPetImages.map((url, index) => (
                            <img key={index} src={url} alt={`업로드된 이미지 ${index + 1}`}
                                 className="w-20 h-20 object-cover rounded"/>
                        ))}
                    </div>
                </div>

                <div className="border rounded-md p-4">
                    <label htmlFor="microchipId" className="block text-sm font-medium text-gray-700 mb-1">마이크로칩
                        번호</label>
                    <input
                        type="text"
                        name="microchipId"
                        id="microchipId"
                        value={formData.microchipId}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="마이크로칩 번호를 입력하세요 (선택사항)"
                    />
                </div>

                <div className="mt-6">
                    <button
                        type="submit"
                        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        게시글 등록하기
                    </button>
                </div>
            </form>
        </div>
    );
};