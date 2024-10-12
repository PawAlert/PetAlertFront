import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { signupUser } from '../api/signupUser';
import { SignupUserModel, SignupResponse } from '../model/types';
import { useNavigate } from 'react-router-dom';

export const SignupForm: React.FC = () => {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const navigate = useNavigate();

    const signupMutation = useMutation<SignupResponse, Error, SignupUserModel>({
        mutationFn: signupUser,
        onSuccess: () => {
            navigate('/login');
        },
        onError: (error) => {
            console.error('Signup failed:', error);
            setErrors({ form: '회원가입에 실패했습니다. 다시 시도해주세요.' });
        }
    });

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};
        if (!userName.trim()) newErrors.userName = '이름을 입력해주세요.';
        if (!email.trim()) newErrors.email = '이메일을 입력해주세요.';
        else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = '유효한 이메일 주소를 입력해주세요.';
        if (!password) newErrors.password = '비밀번호를 입력해주세요.';
        else if (password.length < 8) newErrors.password = '비밀번호는 8자 이상이어야 합니다.';
        if (password !== confirmPassword) newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            const userData: SignupUserModel = { userName, email, password };
            signupMutation.mutate(userData);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-8 bg-white rounded-lg shadow-lg">
            <div className="flex items-center justify-center mb-8">
                <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <h2 className="text-2xl font-bold ml-2 text-gray-800">회원 정보입력</h2>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">이름</label>
                    <input
                        id="name"
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                      focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                        placeholder="홍길동"
                        required
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">이메일</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                      focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                        placeholder="example@example.com"
                        required
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">비밀번호</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                      focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                        placeholder="********"
                        required
                    />
                    {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                </div>
                <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">비밀번호 확인</label>
                    <input
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                      focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                        placeholder="********"
                        required
                    />
                    {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
                </div>
                <div>
                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        disabled={signupMutation.isPending}
                    >
                        {signupMutation.isPending ? '처리중...' : '확인하기'}
                    </button>
                </div>
            </form>
            {errors.form && <p className="mt-4 text-sm text-center text-red-600">{errors.form}</p>}
            {signupMutation.isSuccess && (
                <p className="mt-4 text-sm text-center text-green-600">
                    회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.
                </p>
            )}
        </div>
    );
};

export default SignupForm;