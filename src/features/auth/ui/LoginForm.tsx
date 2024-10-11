import React, { useState } from 'react';
import { useLoginMutation } from "../api/LoginUser.ts";
import { LoginUserModel } from "../model/LoginUserModel.ts";
import {useAuth} from "../customHook/useAuth.ts";

export const LoginForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const loginMutation = useLoginMutation();
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const credentials: LoginUserModel = { email, password };
        loginMutation.mutate(credentials, {
            onSuccess: (data) => {
                login(data.data.token);
            }
        });
    };

    if (loginMutation.isPending) {
        return <div>Logging in...</div>;
    }

    if (loginMutation.isError) {
        return <div>Error: {loginMutation.error.message}</div>;
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                    autoComplete="username"
                />
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                    autoComplete="current-password"
                />
                <button type="submit" disabled={loginMutation.isPending}>
                    {loginMutation.isPending ? 'Logging in...' : 'Login'}
                </button>
            </form>

            {loginMutation.isSuccess && (
                <div>
                    <h3>Login Successful!</h3>
                    <p>Status: {loginMutation.data.status}</p>
                    <p>Message: {loginMutation.data.message}</p>
                    <p>Token: {loginMutation.data.data.token}</p>
                </div>
            )}
        </div>
    );
};