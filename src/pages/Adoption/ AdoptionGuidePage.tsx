import React from 'react';
import { FaPaw, FaClipboardList, FaComments, FaFileSignature, FaHeartbeat, FaExclamationTriangle } from 'react-icons/fa';

const AdoptionStep: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
    <div className="flex items-start mb-6">
        <div className="bg-blue-500 text-white rounded-full p-3 mr-4">{icon}</div>
        <div>
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </div>
    </div>
);

const AdoptionGuidePage: React.FC = () => {
    return (
        <div className="container mx-auto mt-8 px-4">
            <h1 className="text-4xl font-bold mb-8 text-center text-green-600">입양 방법 안내</h1>

            <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
                <h2 className="text-2xl font-bold mb-6 text-blue-500">입양 절차</h2>
                <AdoptionStep
                    icon={<FaPaw />}
                    title="1. 입양 공고 확인"
                    description="관심 있는 동물의 입양 공고를 자세히 살펴보세요."
                />
                <AdoptionStep
                    icon={<FaClipboardList />}
                    title="2. 입양 신청서 작성"
                    description="신중하게 고민하신 후 입양 신청서를 작성해 주세요."
                />
                <AdoptionStep
                    icon={<FaComments />}
                    title="3. 입양 상담 및 면접"
                    description="보호소 직원과의 상담을 통해 입양 적합성을 확인합니다."
                />
                <AdoptionStep
                    icon={<FaFileSignature />}
                    title="4. 입양 결정 및 계약"
                    description="입양이 결정되면 필요한 서류를 작성하고 계약을 체결합니다."
                />
                <AdoptionStep
                    icon={<FaHeartbeat />}
                    title="5. 입양 후 관리"
                    description="정기적으로 입양 동물의 상태를 보고하고 필요시 상담을 받습니다."
                />
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center text-yellow-700">
                    <FaExclamationTriangle className="mr-2" />
                    입양 시 주의사항
                </h2>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li>충분한 시간과 공간을 확보해야 합니다.</li>
                    <li>가족 구성원 모두의 동의가 필요합니다.</li>
                    <li>반려동물에 대한 책임감을 가져야 합니다.</li>
                    <li>정기적인 건강 검진과 예방 접종이 필요합니다.</li>
                    <li>인내심을 가지고 적응 기간을 기다려주세요.</li>
                    <li>반려동물 용품을 미리 준비해 두세요.</li>
                </ul>
            </div>

            <div className="bg-green-50 p-6 rounded-lg">
                <h2 className="text-2xl font-bold mb-4 text-green-700">입양의 장점</h2>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li>사랑과 companionship을 얻을 수 있습니다.</li>
                    <li>유기동물에게 새로운 삶의 기회를 줄 수 있습니다.</li>
                    <li>책임감과 공감 능력을 기를 수 있습니다.</li>
                    <li>스트레스 해소와 정서적 안정에 도움이 됩니다.</li>
                    <li>가족 간의 유대감을 강화할 수 있습니다.</li>
                </ul>
            </div>
        </div>
    );
};

export default AdoptionGuidePage;