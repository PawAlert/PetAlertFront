import React, { useState, useEffect } from 'react';
import { useLoginMutation } from "../api/LoginUser.ts";
import { LoginUserModel } from "../model/LoginUserModel.ts";
import { SOCIAL_LOGIN_URLS } from '../../../../app/auth.ts';
import { useAuth } from '../customHook/useAuth.ts';
import { fetchUserProfile } from "../../../chat/api/useApi.ts";
import { useNavigate, useLocation } from 'react-router-dom';

export const LoginForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const loginMutation = useLoginMutation();
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const token = searchParams.get('token');
        if (token) {
            handleLoginSuccess(token);
        }
    }, [location]);

    const handleLoginSuccess = async (token: string) => {
        login(token);
        try {
            const userProfile = await fetchUserProfile();
            localStorage.setItem('uid', userProfile.uid);
            navigate('/');
        } catch (error) {
            console.error('Failed to fetch user profile:', error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const credentials: LoginUserModel = { email, password };
        loginMutation.mutate(credentials, {
            onSuccess: async (data) => {
                const token = data.data.token;
                handleLoginSuccess(token);
            }
        });
    };

    const handleSocialLogin = (provider: 'GOOGLE' | 'NAVER' | 'KAKAO') => {
        window.location.href = SOCIAL_LOGIN_URLS[provider];
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">로그인</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                        이메일
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                        비밀번호
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        로그인
                    </button>
                    <a
                        className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                        href="/forgot-password"
                    >
                        비밀번호를 잊으셨나요?
                    </a>
                </div>
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
                        Naver
                    </button>
                    <button
                        onClick={() => handleSocialLogin('KAKAO')}
                        className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    >
                        Kakao
                    </button>
                </div>
            </div>

            <p className="mt-8 text-center text-sm text-gray-600">
                계정이 없으신가요?{' '}
                <a href="/signup" className="font-medium text-blue-600 hover:text-blue-500">
                    회원가입
                </a>
            </p>
        </div>
    );
};

export default LoginForm;