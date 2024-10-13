import React from 'react';
import {MissingReportForm} from "../../features/missingPost/ui/missingReportForm.tsx";

const MissingReportFormPage: React.FC = () => {
    return (
        <>
            <h1>실종 신고 작성</h1>
            <p>반려동물의 실종 정보를 상세히 입력해주세요.</p>

            <MissingReportForm/>
        </>
    )
};

export default MissingReportFormPage;