import Header from "./header/header.tsx";
import {Outlet} from 'react-router-dom';
import React from "react";

const Index: React.FC = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header/>
            <main className="flex-grow">
                <Outlet/>
            </main>
        </div>
    );
};

export default Index;