import React from 'react';
import { LatestMissingPosts } from '../../features/missingPost/ui/LatestMissingPosts';
import ReviewsSection from '../../features/main/ui/ReviewsSection.tsx';
import NoticeSection from '../../features/main/ui/NoticeSection.tsx';
import Banner from "../../features/main/ui/Banner.tsx";
import VolunteerSection from "../../features/volunteer/ui/VolunteerSection.tsx";
import Footer from "../../features/main/ui/Footer.tsx";

const MainPage: React.FC = () => {
    return (
        <div className="min-h-screen">
            <Banner />
            <VolunteerSection/>
            <LatestMissingPosts />
            <ReviewsSection />
            <NoticeSection />
            <Footer/>
        </div>
    );
};

export default MainPage;