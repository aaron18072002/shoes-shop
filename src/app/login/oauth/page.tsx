'use client';

import { updateUser } from '@/redux/slices/userSlice';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const OauthLoginPage = () => {
    const searchParams = useSearchParams();
    const dispatch = useDispatch();
    const router = useRouter();

    const setUserAndToken = () => {
        return new Promise<void>((resolve, reject) => {
            resolve();
            const access_token = searchParams.get('access_token');
            const refresh_token = searchParams.get('refresh_token');
            localStorage.setItem('refresh_token', refresh_token as string);
            localStorage.setItem('access_token', access_token as string);
            dispatch(
                updateUser({
                    name: searchParams.get('name') as string,
                    email: searchParams.get('email') as string,
                    avatar_img: searchParams.get('avatar_img') as string,
                    role: Number(searchParams.get('role')),
                    gender: searchParams.get('gender') as string,
                    access_token: access_token as string,
                    refresh_token: refresh_token as string,
                }),
            );
        });
    };

    const handleSetUserAndToken = async () => {
        await setUserAndToken();
        router.push('/');
    };

    handleSetUserAndToken();

    return (
        <div>
            <>Logging ...</>
        </div>
    );
};

export default OauthLoginPage;
