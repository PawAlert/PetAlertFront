// src/pages/Home.tsx
import React from 'react';
import {useAuthStore} from "../../auth/model/store.ts";

const Profile: React.FC = () => {
    const isLoggedIn = useAuthStore(state => state.isLoggedIn);
    const token = useAuthStore(state => state.token);

    return (

        <div>
            <p>로그인 상태: {!isLoggedIn ? '로그인 되어있지않음' : '로그인 되어있음'}</p>
            <p>token ={token}</p>
            <h1>Profile</h1>
        </div>
    );
};

export default Profile;
