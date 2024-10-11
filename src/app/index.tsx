import Header from "./header/header.tsx";
import {Outlet} from 'react-router-dom';
import React from "react";

const Index: React.FC = () => {

    return (
        // 항상 보여지는 부분 정의하는 곳
        <div className="flex flex-col min-h-screen">
            {/*     헤더    */}
            <Header/>

            {/*    todo : footer 추가하기   */}
            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Outlet/>
            </main>

        </div>
    );
};

export default Index;
