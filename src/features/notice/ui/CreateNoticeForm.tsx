import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { Notice, CreateNoticeResponse, CreateNoticeRequest } from '../model/noticesModel';
import { createNotice } from "../api/noticesApi";
import { useNoticesStore } from "../api/noticesStore";
import { MultiImageUploader } from "../../../shared/components/ImageUploader";

export const CreateNoticeForm: React.FC = () => {
    const { draftNotice, setDraftNotice, resetDraftNotice } = useNoticesStore();

    const createNoticeMutation = useMutation<CreateNoticeResponse, Error, CreateNoticeRequest>({
        mutationFn: createNotice,
        onSuccess: (data: CreateNoticeResponse) => {
            alert(data.message);
            resetDraftNotice();
        },
        onError: (error: Error) => {
            console.error('공지사항 작성 실패:', error);
            alert('공지사항 작성에 실패했습니다. 다시 시도해주세요.');
        },
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const noticeWithImages: CreateNoticeRequest = {
            ...draftNotice as Notice,
            attachmentUrls: draftNotice.attachmentUrls || [],
            relatedLink: draftNotice.relatedLink || ''
        };
        createNoticeMutation.mutate(noticeWithImages);
    };


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setDraftNotice({ ...draftNotice, [name]: value });
    };

    const handleImagesChange = (urls: string[]) => {
        setDraftNotice({ ...draftNotice, attachmentUrls: urls });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">제목</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={draftNotice.title || ''}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
            </div>

            <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700">내용</label>
                <textarea
                    id="content"
                    name="content"
                    value={draftNotice.content || ''}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
            </div>

            <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700">유형</label>
                <select
                    id="type"
                    name="type"
                    value={draftNotice.type || ''}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                >
                    <option value="">선택해주세요</option>
                    <option value="GENERAL">일반</option>
                    <option value="URGENT">긴급</option>
                    <option value="EVENT">이벤트</option>
                    <option value="MAINTENANCE">유지보수</option>
                </select>
            </div>

            <div>
                <label htmlFor="validFrom" className="block text-sm font-medium text-gray-700">시작일</label>
                <input
                    type="datetime-local"
                    id="validFrom"
                    name="validFrom"
                    value={draftNotice.validFrom || ''}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
            </div>

            <div>
                <label htmlFor="validUntil" className="block text-sm font-medium text-gray-700">종료일</label>
                <input
                    type="datetime-local"
                    id="validUntil"
                    name="validUntil"
                    value={draftNotice.validUntil || ''}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
            </div>

            <div>
                <label htmlFor="priority" className="block text-sm font-medium text-gray-700">우선순위</label>
                <select
                    id="priority"
                    name="priority"
                    value={draftNotice.priority || ''}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                >
                    <option value="">선택해주세요</option>
                    <option value="LOW">낮음</option>
                    <option value="MEDIUM">중간</option>
                    <option value="HIGH">높음</option>
                </select>
            </div>

            <div>
                <label htmlFor="relatedLink" className="block text-sm font-medium text-gray-700">관련 링크</label>
                <input
                    type="url"
                    id="relatedLink"
                    name="relatedLink"
                    value={draftNotice.relatedLink || ''}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
            </div>

            <MultiImageUploader onImagesChange={handleImagesChange} maxImages={3} />

            <div>
                <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    공지사항 작성
                </button>
            </div>
        </form>
    );
};