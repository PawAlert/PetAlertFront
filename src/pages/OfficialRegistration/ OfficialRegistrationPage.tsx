import React from 'react';
import OfficialRegistrationForm from '../../features/officialRegistration/ui/OfficialRegistrationForm';

const OfficialRegistrationPage: React.FC = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-4">관계자 등록</h1>
            <OfficialRegistrationForm />
        </div>
    );
};

export default OfficialRegistrationPage;