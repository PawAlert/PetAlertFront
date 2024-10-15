import React from 'react';

const AdoptionGuidePage: React.FC = () => {
    return (
        <div className="container mx-auto mt-8">
            <h1 className="text-3xl font-bold mb-6">입양 방법 안내</h1>
            <div className="prose lg:prose-xl">
                <h2>입양 절차</h2>
                <ol>
                    <li>입양 공고 확인</li>
                    <li>입양 신청서 작성</li>
                    <li>입양 상담 및 면접</li>
                    <li>입양 결정 및 계약</li>
                    <li>입양 후 관리</li>
                </ol>
                <h2>입양 시 주의사항</h2>
                <ul>
                    <li>충분한 시간과 공간을 확보해야 합니다.</li>
                    <li>가족 구성원 모두의 동의가 필요합니다.</li>
                    <li>반려동물에 대한 책임감을 가져야 합니다.</li>
                    <li>정기적인 건강 검진과 예방 접종이 필요합니다.</li>
                </ul>
            </div>
        </div>
    );
};

export default AdoptionGuidePage;