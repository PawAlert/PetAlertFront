import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { createAnnouncement } from '../api/createAnnouncement';
import { CreateAnnouncementDto } from '../model/types';
import { useNavigate } from 'react-router-dom';
import {MultiImageUploader} from "../../../shared/components/ImageUploader.tsx";
import {AddressData} from "../../../shared/components/model/AddressData.tsx";
import { PostCodeSearch } from '../../../shared/components/PostCodeSearch';
const CreateAnnouncementForm: React.FC = () => {
    const [formData, setFormData] = useState<CreateAnnouncementDto>({
        title: '',
        content: '',
        shelterName: '',
        shelterLocation: {
            postcode: '',
            address: '',
            addressDetail: '',
            latitude: 0,
            longitude: 0,
        },
        animalType: '',
        breed: '',
        animalName: '',
        estimatedAge: 0,
        gender: '',
        isNeutered: false,
        weight: 0,
        color: '',
        foundLocation: '',
        specialNotes: '',
        adoptionAvailableDate: '',
        announcementExpiryDate: '',
        adoptionRequirements: '',
        imageUrls: [],
    });

    const navigate = useNavigate();
    const createAnnouncementMutation = useMutation({
        mutationFn: createAnnouncement,
        onSuccess: () => {
            alert('입양 공고가 성공적으로 등록되었습니다.');
            navigate('/adoption');
        },
        onError: (error) => {
            console.error('입양 공고 등록 실패:', error);
            alert('입양 공고 등록에 실패했습니다. 다시 시도해주세요.');
        },
    });

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        setFormData((prev: CreateAnnouncementDto) => {
            if (name.includes('.')) {
                const [parent, child] = name.split('.');
                const parentObj = prev[parent as keyof CreateAnnouncementDto];

                if (typeof parentObj === 'object' && parentObj !== null) {
                    return {
                        ...prev,
                        [parent]: {
                            ...parentObj,
                            [child]: value
                        }
                    } as CreateAnnouncementDto;
                }
            }

            return { ...prev, [name]: value } as CreateAnnouncementDto;
        });
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setFormData((prev) => ({ ...prev, [name]: checked }));
    };

    const handleImagesChange = (urls: string[]) => {
        setFormData((prev) => ({ ...prev, imageUrls: urls }));
    };

    const handleAddressSelect = (addressData: AddressData) => {
        setFormData((prev) => ({
            ...prev,
            shelterLocation: {
                ...prev.shelterLocation,
                ...addressData
            }
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        createAnnouncementMutation.mutate(formData);
    };


    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">제목</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
            </div>

            <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700">내용</label>
                <textarea
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
            </div>

            <div>
                <label htmlFor="shelterName" className="block text-sm font-medium text-gray-700">보호소 이름</label>
                <input
                    type="text"
                    id="shelterName"
                    name="shelterName"
                    value={formData.shelterName}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
            </div>

            <div>
                <label htmlFor="shelterName" className="block text-sm font-medium text-gray-700">보호소 이름</label>
                <input
                    type="text"
                    id="shelterName"
                    name="shelterName"
                    value={formData.shelterName}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">보호소 주소</label>
                <div className="flex items-center">
                    <input
                        type="text"
                        name="shelterLocation.address"
                        value={formData.shelterLocation.address}
                        onChange={handleInputChange}
                        readOnly
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                    <PostCodeSearch onAddressSelect={handleAddressSelect}/>
                </div>
            </div>

            <div>
                <label htmlFor="shelterLocation.addressDetail" className="block text-sm font-medium text-gray-700">상세
                    주소</label>
                <input
                    type="text"
                    id="shelterLocation.addressDetail"
                    name="shelterLocation.addressDetail"
                    value={formData.shelterLocation.addressDetail}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
            </div>

            <div>
                <label htmlFor="animalType" className="block text-sm font-medium text-gray-700">동물 종류</label>
                <input
                    type="text"
                    id="animalType"
                    name="animalType"
                    value={formData.animalType}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
            </div>

            <div>
                <label htmlFor="breed" className="block text-sm font-medium text-gray-700">품종</label>
                <input
                    type="text"
                    id="breed"
                    name="breed"
                    value={formData.breed}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
            </div>

            <div>
                <label htmlFor="animalName" className="block text-sm font-medium text-gray-700">동물 이름</label>
                <input
                    type="text"
                    id="animalName"
                    name="animalName"
                    value={formData.animalName}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
            </div>

            <div>
                <label htmlFor="estimatedAge" className="block text-sm font-medium text-gray-700">추정 나이</label>
                <input
                    type="number"
                    id="estimatedAge"
                    name="estimatedAge"
                    value={formData.estimatedAge}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
            </div>

            <div>
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700">성별</label>
                <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                >
                    <option value="">선택해주세요</option>
                    <option value="수컷">수컷</option>
                    <option value="암컷">암컷</option>
                </select>
            </div>

            <div>
                <label htmlFor="isNeutered" className="flex items-center">
                    <input
                        type="checkbox"
                        id="isNeutered"
                        name="isNeutered"
                        checked={formData.isNeutered}
                        onChange={handleCheckboxChange}
                        className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                    <span className="ml-2 text-sm text-gray-700">중성화 여부</span>
                </label>
            </div>

            <div>
                <label htmlFor="weight" className="block text-sm font-medium text-gray-700">체중 (kg)</label>
                <input
                    type="number"
                    id="weight"
                    name="weight"
                    value={formData.weight}
                    onChange={handleInputChange}
                    required
                    step="0.1"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
            </div>

            <div>
                <label htmlFor="color" className="block text-sm font-medium text-gray-700">색상</label>
                <input
                    type="text"
                    id="color"
                    name="color"
                    value={formData.color}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
            </div>

            <div>
                <label htmlFor="foundLocation" className="block text-sm font-medium text-gray-700">발견 장소</label>
                <input
                    type="text"
                    id="foundLocation"
                    name="foundLocation"
                    value={formData.foundLocation}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
            </div>

            <div>
                <label htmlFor="specialNotes" className="block text-sm font-medium text-gray-700">특이사항</label>
                <textarea
                    id="specialNotes"
                    name="specialNotes"
                    value={formData.specialNotes}
                    onChange={handleInputChange}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
            </div>

            <div>
                <label htmlFor="adoptionAvailableDate" className="block text-sm font-medium text-gray-700">입양 가능
                    날짜</label>
                <input
                    type="date"
                    id="adoptionAvailableDate"
                    name="adoptionAvailableDate"
                    value={formData.adoptionAvailableDate}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
            </div>

            <div>
                <label htmlFor="announcementExpiryDate" className="block text-sm font-medium text-gray-700">공고 만료
                    날짜</label>
                <input
                    type="date"
                    id="announcementExpiryDate"
                    name="announcementExpiryDate"
                    value={formData.announcementExpiryDate}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
            </div>

            <div>
                <label htmlFor="adoptionRequirements" className="block text-sm font-medium text-gray-700">입양
                    요구사항</label>
                <textarea
                    id="adoptionRequirements"
                    name="adoptionRequirements"
                    value={formData.adoptionRequirements}
                    onChange={handleInputChange}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">이미지 업로드</label>
                <MultiImageUploader
                    onImagesChange={handleImagesChange}
                    maxImages={3}
                />
            </div>

            <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                disabled={createAnnouncementMutation.isPending}
            >
                {createAnnouncementMutation.isPending ? '등록 중...' : '입양 공고 등록'}
            </button>
        </form>
    );
};

export default CreateAnnouncementForm;