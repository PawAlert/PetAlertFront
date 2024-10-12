// src/pages/Home.tsx
import React from 'react';
import {useAuthStore} from "../../auth/Login/model/store.ts";

const Profile: React.FC = () => {
    const token = useAuthStore(state => state.token);

    return (
        <div>
            <p>token ={token}</p>
            <h1>Profile</h1>
        </div>
    );
};

export default Profile;
