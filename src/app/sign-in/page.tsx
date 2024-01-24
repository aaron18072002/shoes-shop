'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { jwtDecode } from 'jwt-decode';

import { AiOutlineHome } from 'react-icons/ai';
import InputHook from '@/components/InputHook';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { getUserById, login } from '@/apis/users.api';
import { useDispatch } from 'react-redux';
import { updateUser } from '@/redux/slices/userSlice';
import { toast } from 'react-toastify';
import InputPasswordToggle from '@/components/InputPasswordToggle';
import { MEDIA_IMAGE_PATH } from '@/constants/common';

interface SignInPageProps {}

type UserLoginType = {
    email: string;
    password: string;
};

type UserDecodedType = {
    exp: number;
    iat: number;
    role: number;
    userId: string;
};

const getGoogleOauthUrl = () => {
    const VITE_GOOGLE_CLIENT_ID =
        '530843985667-tf0gu50epb2l01aqitmon4uf42ce025s.apps.googleusercontent.com';
    const VITE_GOOGLE_REDIRECT_URI = 'http://localhost:8000/users/oauth/google';
    const url = 'https://accounts.google.com/o/oauth2/v2/auth';
    const query = {
        client_id: VITE_GOOGLE_CLIENT_ID,
        redirect_uri: VITE_GOOGLE_REDIRECT_URI,
        response_type: 'code',
        scope: [
            'https://www.googleapis.com/auth/userinfo.email',
            'https://www.googleapis.com/auth/userinfo.profile',
        ].join(' '),
        prompt: 'consent',
        access_type: 'offline',
    };
    const queryString = new URLSearchParams(query.toString()).toString();
    return `${url}?${queryString}`;
};

const googleOauthUrl =
    'https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?client_id=685758810850-j4q3l78mv133air168mbs3aghrmqf0if.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost%3A8000%2Fusers%2Foauth%2Fgoogle&response_type=code&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile&prompt=consent&access_type=offline&service=lso&o2v=2&theme=glif&flowName=GeneralOAuthFlow';

const schema = yup.object({
    email: yup
        .string()
        .email('Làm ơn hãy điền email hợp lệ')
        .required('Đừng bỏ trống email của bạn'),
    password: yup
        .string()
        .min(8, 'Mật khẩu của bạn phải có ít nhất 8 ký tự')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
            message:
                'Mật khẩu của bạn phải có ít nhất một từ viết hoa, một từ viết thường, một chữ số và một ký tự đặc biệt như !@#$%^&* ...',
        }),
});

const SignInPage: React.FC = (props: SignInPageProps) => {
    const router = useRouter();
    const dispatch = useDispatch();

    const mutation = useMutation({
        mutationFn: (formDta: UserLoginType) => {
            return login(formDta);
        },
    });

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting, isValid },
    } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange',
    });

    const onSubmitHandler = (values: any) => {
        if (!isValid) return 0;
        return new Promise<void>((resolve) => {
            setTimeout(() => {
                resolve();
                console.log(values);
                mutation.mutate(values);
                reset({
                    password: '',
                    email: '',
                });
            }, 5000);
        });
    };

    const handleGetDetailUser = useCallback(
        async (id: string, refreshToken: string, accessToken: string) => {
            const data = await getUserById(id, refreshToken);
            const userInfo = data?.data?.data;
            console.log(userInfo);
            dispatch(
                updateUser({
                    name: userInfo.name,
                    email: userInfo.email,
                    avatar_img: userInfo.avatar_img,
                    role: userInfo.role,
                    gender: userInfo.gender,
                    access_token: accessToken,
                    refresh_token: refreshToken,
                }),
            );
        },
        [dispatch],
    );

    useEffect(() => {
        if (mutation.isSuccess) {
            const refreshToken = mutation?.data?.data?.refresh_token;
            const accessToken = mutation?.data?.data?.access_token;
            console.log(refreshToken, accessToken);

            if (refreshToken && accessToken) {
                localStorage.setItem('refresh_token', refreshToken);
                localStorage.setItem('access_token', accessToken);
                const decoded = jwtDecode(refreshToken) as UserDecodedType;
                console.log(decoded);
                if (decoded.userId) {
                    handleGetDetailUser(decoded.userId, refreshToken, accessToken);
                }
            }
            router.push('/');
        }
        if (mutation.isError) {
            console.log(mutation);

            toast.error('Mật khẩu hoặc email không hợp lệ');
            return;
        }
    }, [handleGetDetailUser, mutation, router]);

    // const handleGetDetailUser = async (id: string, refreshToken: string, accessToken: string) => {
    //     const data = await getUserById(id, refreshToken);
    //     const userInfo = data?.data?.data;
    //     dispatch(
    //         updateUser({
    //             name: userInfo.name,
    //             email: userInfo.email,
    //             avatar_img: userInfo.avatar_img,
    //             role: userInfo.role,
    //             access_token: accessToken,
    //             refresh_token: refreshToken,
    //         }),
    //     );
    // };

    return (
        <div className="w-full h-[100vh] overflow-y-hidden relative">
            <Image
                src="/images/overlay.jpg"
                alt="banner"
                width="0"
                height="0"
                sizes="100vw"
                className="w-full h-full object-cover"
            />
            <div
                className="absolute top-[50%] left-[50%]
             translate-x-[-50%] translate-y-[-50%] py-8 px-10 bg-white rounded-xl  w-[500px] max-md:w-[350px]"
            >
                <div className="relative">
                    <div
                        onClick={() => router.push('/')}
                        className="absolute top-[-8px] cursor-pointer"
                    >
                        <span>
                            <AiOutlineHome size={25} />
                        </span>
                    </div>
                    <div className="pb-5">
                        <h3 className="text-center uppercase text-[28px] font-semibold">sign in</h3>
                    </div>
                    <form autoComplete="off" onSubmit={handleSubmit(onSubmitHandler)}>
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col gap-2">
                                <InputHook
                                    id="email"
                                    name="email"
                                    type="email"
                                    className="py-3 px-4 border border-gray-300 rounded-xl placeholder:text-sm"
                                    placeholder="Nhập email của bạn"
                                    control={control}
                                />
                                {errors.email && (
                                    <div className="text-red-500 text-sm">
                                        <p>{errors.email.message}</p>
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-col gap-2">
                                <InputPasswordToggle
                                    id="password"
                                    name="password"
                                    placeholder="Nhập mật khẩu của bạn"
                                    control={control}
                                />
                                {/* <InputHook
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="Nhập mật khẩu của bạn"
                                    className="py-3 px-4 border border-gray-300 rounded-xl placeholder:text-sm"
                                    control={control}
                                /> */}
                                {errors.password && (
                                    <div className="text-red-500 text-sm">
                                        <p>{errors.password.message}</p>
                                    </div>
                                )}
                            </div>
                            <div className="flex items-center justify-end gap-x-2 font-semibold">
                                <Link
                                    href="/sign-up"
                                    className="text-[#0284c7] font-medium text-sm"
                                >
                                    Đăng Ký
                                </Link>
                                <span className="text-sm font-light text-gray-400">|</span>
                                <Link href="/forgot-password" className="text-sm">
                                    Quên Mật Khẩu
                                </Link>
                            </div>
                        </div>
                        <div>
                            <button
                                className={`mt-4 w-full p-3 bg-[#3a3a3a] text-white hover:opacity-80 transition rounded-xl uppercase font-semibold ${
                                    isSubmitting ? 'opacity-50' : ''
                                }`}
                                disabled={isSubmitting}
                                type="submit"
                            >
                                {isSubmitting ? (
                                    <div className="w-5 h-5 rounded-full mx-auto border-2 max-md:text-[14px] tracking-wide border-white border-t-2 border-t-transparent animate-spin"></div>
                                ) : (
                                    'đăng nhập'
                                )}
                            </button>
                        </div>
                    </form>
                    <div className="flex items-center mt-3 justify-center gap-x-2">
                        <div className="h-[1px] w-full bg-[#a3a3a3]"></div>
                        <span className="text-[#a3a3a3]">Hoặc</span>
                        <div className="h-[1px] w-full bg-[#a3a3a3]"></div>
                    </div>
                    <div className="mt-5 flex flex-col gap-y-4 mb-3 cursor-pointer">
                        <Link
                            href={googleOauthUrl}
                            className="p-3 rounded-xl flex items-center justify-center border border-[#d1d5db] shadow-md"
                        >
                            <Image
                                width={32}
                                height={32}
                                // src="/images/google.png"
                                src={`${MEDIA_IMAGE_PATH}cee953f5a0c6d52f038059937`}
                                alt="google_logo"
                                className="object-cover"
                            />
                            <span className="uppercase text-base">google</span>
                        </Link>
                        <div className="p-3 rounded-xl flex items-center justify-center gap-x-1 border border-[#d1d5db] shadow-md">
                            <Image
                                width={28}
                                height={28}
                                // src="/images/facebook.png"
                                src={`${MEDIA_IMAGE_PATH}cee953f5a0c6d52f038059938`}
                                alt="google_logo"
                                className="object-cover"
                            />
                            <span className="uppercase text-base">facebook</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignInPage;
