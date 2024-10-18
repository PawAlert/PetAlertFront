import React from "react";
import Banner from "../../features/main/ui/ Banner.tsx";
import {LatestMissingPosts} from "../../features/missingPost/ui/LatestMissingPosts.tsx";

const MainPage: React.FC = () => {
    return (
        <div>
            <Banner />
            <LatestMissingPosts/>

        </div>
    );
};

export default MainPage;