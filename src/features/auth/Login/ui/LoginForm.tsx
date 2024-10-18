import React, { useState } from 'react';
import { useLoginMutation } from "../api/LoginUser.ts";
import { LoginUserModel } from "../model/LoginUserModel.ts";
import { SOCIAL_LOGIN_URLS } from '../../../../app/auth.ts';
import { useAuth } from '../customHook/useAuth.ts';
import {fetchUserProfile} from "../../../chat/api/useApi.ts";
import { useNavigate } from 'react-router-dom';

export const LoginForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const loginMutation = useLoginMutation();
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const credentials: LoginUserModel = { email, password };
        loginMutation.mutate(credentials, {
            onSuccess: async (data) => {
                const token = data.data.token;
                login(token);
                localStorage.setItem('token', token);
                try {
                    const userProfile = await fetchUserProfile();
                    localStorage.setItem('uid', userProfile.uid);
                    navigate('/');

                } catch (error) {
                    console.error('Failed to fetch user profile:', error);
                }
            }
        });
    };


    const handleSocialLogin = (provider: 'GOOGLE' | 'NAVER' | 'KAKAO') => {
        window.location.href = SOCIAL_LOGIN_URLS[provider];
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-6 text-center">로그인</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">이메일</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                        focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">비밀번호</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                        focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    disabled={loginMutation.isPending}
                >
                    {loginMutation.isPending ? '로그인 중...' : '로그인'}
                </button>
            </form>
            <div className="mt-6">
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">Or continue with</span>
                    </div>
                </div>
                <div className="mt-6 grid grid-cols-3 gap-3">
                    <button
                        onClick={() => handleSocialLogin('GOOGLE')}
                        className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    >
                        Google
                    </button>
                    <button
                        onClick={() => handleSocialLogin('NAVER')}
                        className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    >
                        Naver는 오류해결중
                    </button>
                    <button
                        onClick={() => handleSocialLogin('KAKAO')}
                        className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    >
                        Kakao
                    </button>
                </div>
            </div>
            <p className="mt-6 text-center text-sm text-gray-500">
                계정이 없으신가요?{' '}
                <a href="signup" className="font-medium text-indigo-600 hover:text-indigo-500">
                    회원가입
                </a>
            </p>
        </div>
    );
};

export default LoginForm;