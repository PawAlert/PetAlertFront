import React, { useState } from 'react';
import { MultiImageUploader, SingleImageUploader } from "../ImageUploader.tsx";

const ExampleImageUpload: React.FC = () => {
    const [multiImageUrls, setMultiImageUrls] = useState<string[]>([]);
    const [singleImageUrl, setSingleImageUrl] = useState<string>('');

    const handleMultiImagesChange = (urls: string[]) => {
        setMultiImageUrls(urls);
        // 여기에서 필요한 추가 로직을 수행할 수 있습니다.
        // 예: 폼 상태 업데이트, API 호출 등
    };

    const handleSingleImageChange = (url: string) => {
        setSingleImageUrl(url);
        // 여기에서 필요한 추가 로직을 수행할 수 있습니다.
        // 예: 폼 상태 업데이트, API 호출 등
    };

    return (
        <>
            <div>
                <h1>여러 장의 이미지 업로드</h1>
                <MultiImageUploader onImagesChange={handleMultiImagesChange} maxImages={5} />

                {/* 업로드된 이미지 URL들을 표시하거나 사용할 수 있습니다 */}
                <div>
                    <h2>업로드된 이미지 URLs:</h2>
                    <ul>
                        {multiImageUrls.map((url, index) => (
                            <li key={index}>{url}</li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="mt-20"></div>
            <div>
                <h1>한 장의 이미지 업로드</h1>
                <SingleImageUploader onImageChange={handleSingleImageChange} />

                {/* 업로드된 이미지 URL을 표시하거나 사용할 수 있습니다 */}
                <div>
                    <h2>업로드된 이미지 URL:</h2>
                    {singleImageUrl && <p>{singleImageUrl}</p>}
                </div>
            </div>
        </>
    );
};

export default ExampleImageUpload;