import React from 'react';
import AnnouncementList from "../../features/adoption/ui/AnnouncementList.tsx";

const AdoptionPage: React.FC = () => {
    return (
        <div className="container mx-auto mt-8">
            <h1 className="text-3xl font-bold mb-6">입양 공고</h1>
            <AnnouncementList />
        </div>
    );
};

export default AdoptionPage;