import React, { useState } from 'react';
import { uploadListImagesToS3, oneImageToS3 } from "./api/ImageApi.tsx";

// 공통 스타일
const inputClassName = `
    block w-full text-sm text-gray-500
    file:mr-4 file:py-2 file:px-4
    file:rounded-full file:border-0
    file:text-sm file:font-semibold
    file:bg-blue-50 file:text-blue-700
    hover:file:bg-blue-100
`;

// 단일 이미지 업로더
interface SingleImageUploaderProps {
    onImageChange: (url: string) => void;
}

export const SingleImageUploader: React.FC<SingleImageUploaderProps> = ({ onImageChange }) => {
    const [image, setImage] = useState<string | null>(null);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            try {
                const uploadedUrl = await oneImageToS3(file);
                setImage(uploadedUrl);
                onImageChange(uploadedUrl);
            } catch (error) {
                console.error('Image upload failed:', error);
                // 사용자에게 오류를 표시하는 로직 추가
            }
        }
    };

    const handleRemove = () => {
        setImage(null);
        onImageChange('');
    };

    return (
        <div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    이미지 업로드 (1장)
                </label>
                <input
                    type="file"
                    onChange={handleUpload}
                    accept="image/*"
                    className={inputClassName}
                    disabled={!!image}
                />
            </div>
            {image && (
                <div className="relative">
                    <img src={image} alt="Uploaded" className="w-full h-32 object-cover rounded" />
                    <button
                        onClick={handleRemove}
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                        type="button"
                    >
                        ×
                    </button>
                </div>
            )}
        </div>
    );
};

// 다중 이미지 업로더
interface MultiImageUploaderProps {
    onImagesChange: (urls: string[]) => void;
    maxImages?: number;
}

export const MultiImageUploader: React.FC<MultiImageUploaderProps> = ({ onImagesChange, maxImages = 3 }) => {
    const [images, setImages] = useState<string[]>([]);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const remainingSlots = maxImages - images.length;
            const filesToUpload = Array.from(files).slice(0, remainingSlots);

            try {
                const uploadedUrls = await uploadListImagesToS3(filesToUpload);
                const newImages = [...images, ...uploadedUrls];
                setImages(newImages);
                onImagesChange(newImages);
            } catch (error) {
                console.error('Image upload failed:', error);
                // 사용자에게 오류를 표시하는 로직 추가
            }
        }
    };

    const handleRemove = (index: number) => {
        const newImages = images.filter((_, i) => i !== index);
        setImages(newImages);
        onImagesChange(newImages);
    };

    return (
        <div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    이미지 업로드 (최대 {maxImages}장)
                </label>
                <input
                    type="file"
                    onChange={handleUpload}
                    accept="image/*"
                    multiple
                    className={inputClassName}
                    disabled={images.length >= maxImages}
                />
            </div>
            <div className="grid grid-cols-3 gap-4">
                {images.map((url, index) => (
                    <div key={url} className="relative">
                        <img src={url} alt={`Uploaded ${index + 1}`} className="w-full h-32 object-cover rounded" />
                        <button
                            onClick={() => handleRemove(index)}
                            className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                            type="button"
                        >
                            ×
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};