import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { registerOfficial } from '../api/registerOfficial';
import { OfficialRegistrationDto } from '../model/types';
import { PostCodeSearch } from '../../../shared/components/PostCodeSearch';
import { MultiImageUploader } from '../../../shared/components/ImageUploader';
import {AddressData} from "../../../shared/components/model/AddressData.tsx";

const OfficialRegistrationForm: React.FC = () => {
    const [formData, setFormData] = useState<OfficialRegistrationDto>({
        institutionName: '',
        representativeName: '',
        email: '',
        phoneNumber: '',
        institutionType: '',
        location: {
            postcode: '',
            address: '',
            addressDetail: '',
            latitude: 0,
            longitude: 0,
        },
        website: '',
        institutionDescription: '',
        operatingHours: '',
        registrationNumber: '',
        additionalImages: [],
        termsAgreed: false,
        privacyPolicyAgreed: false,
    });

    const mutation = useMutation<unknown, Error, OfficialRegistrationDto>({
        mutationFn: registerOfficial,
        onSuccess: () => {
            alert('관계자 등록이 완료되었습니다.');
        },
        onError: (error) => {
            console.error('관계자 등록 실패:', error);
            alert('관계자 등록에 실패했습니다. 다시 시도해주세요.');
        },
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => {
            if (name.includes('.')) {
                const [parent, child] = name.split('.');
                if (parent === 'location') {
                    return {
                        ...prev,
                        location: {
                            ...prev.location,
                            [child]: value
                        }
                    };
                }
            }
            return { ...prev, [name]: value };
        });
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: checked }));
    };

    const handleLocationSelect = (addressData: AddressData) => {
        setFormData(prev => ({
            ...prev,
            location: {
                postcode: addressData.postcode,
                address: addressData.address,
                addressDetail: addressData.addressDetail,
                latitude: addressData.latitude,
                longitude: addressData.longitude,
            }
        }));
    };

    const handleImagesChange = (urls: string[]) => {
        setFormData(prev => ({ ...prev, additionalImages: urls }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Submitting data:', formData); // 데이터 구조 확인
        mutation.mutate(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="institutionName" className="block text-sm font-medium text-gray-700">기관명</label>
                <input
                    type="text"
                    id="institutionName"
                    name="institutionName"
                    value={formData.institutionName}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
            </div>

            <div>
                <label htmlFor="representativeName" className="block text-sm font-medium text-gray-700">대표자 이름</label>
                <input
                    type="text"
                    id="representativeName"
                    name="representativeName"
                    value={formData.representativeName}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
            </div>

            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">이메일</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
            </div>

            <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">전화번호</label>
                <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
            </div>

            <div>
                <label htmlFor="institutionType" className="block text-sm font-medium text-gray-700">기관 유형</label>
                <select
                    id="institutionType"
                    name="institutionType"
                    value={formData.institutionType}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                >
                    <option value="">선택해주세요</option>
                    <option value="동물보호센터">동물보호센터</option>
                    <option value="동물병원">동물병원</option>
                    <option value="기타">기타</option>
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">주소</label>
                <PostCodeSearch onAddressSelect={handleLocationSelect}/>
                <input
                    type="text"
                    name="location.addressDetail"
                    value={formData.location.addressDetail}
                    onChange={handleInputChange}
                    placeholder="상세 주소"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
            </div>

            <div>
                <label htmlFor="website" className="block text-sm font-medium text-gray-700">웹사이트</label>
                <input
                    type="url"
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
            </div>

            <div>
                <label htmlFor="institutionDescription" className="block text-sm font-medium text-gray-700">기관
                    설명</label>
                <textarea
                    id="institutionDescription"
                    name="institutionDescription"
                    value={formData.institutionDescription}
                    onChange={handleInputChange}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
            </div>

            <div>
                <label htmlFor="operatingHours" className="block text-sm font-medium text-gray-700">운영 시간</label>
                <input
                    type="text"
                    id="operatingHours"
                    name="operatingHours"
                    value={formData.operatingHours}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
            </div>

            <div>
                <label htmlFor="registrationNumber" className="block text-sm font-medium text-gray-700">사업자 등록
                    번호</label>
                <input
                    type="text"
                    id="registrationNumber"
                    name="registrationNumber"
                    value={formData.registrationNumber}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">추가 이미지</label>
                <MultiImageUploader onImagesChange={handleImagesChange} maxImages={4}/>
            </div>

            <div>
                <label className="flex items-center">
                    <input
                        type="checkbox"
                        name="termsAgreed"
                        checked={formData.termsAgreed}
                        onChange={handleCheckboxChange}
                        required
                        className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                    <span className="ml-2 text-sm text-gray-600">이용약관에 동의합니다</span>
                </label>
            </div>

            <div>
                <label className="flex items-center">
                    <input
                        type="checkbox"
                        name="privacyPolicyAgreed"
                        checked={formData.privacyPolicyAgreed}
                        onChange={handleCheckboxChange}
                        required
                        className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                    <span className="ml-2 text-sm text-gray-600">개인정보 처리방침에 동의합니다</span>
                </label>
            </div>

            <button
                type="submit"
                disabled={mutation.isPending}
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                {mutation.isPending ? '등록 중...' : '관계자 등록'}
            </button>
        </form>
    );
};

export default OfficialRegistrationForm;