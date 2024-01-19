'use client';

import { changePassword } from '@/apis/users.api';
import InputPasswordToggle from '@/components/InputPasswordToggle';
import Navbar from '@/components/Navbar';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoBagHandleOutline } from 'react-icons/io5';
import { MdAccountCircle, MdOutlineLockReset } from 'react-icons/md';
import { PiAddressBookBold } from 'react-icons/pi';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import * as yup from 'yup';

const schema = yup.object({
    old_password: yup
        .string()
        .min(8, 'Mật khẩu của bạn phải có ít nhất 8 ký tự')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
            message:
                'Mật khẩu của bạn phải có ít nhất một từ viết hoa, một từ viết thường, một chữ số và một ký tự đặc biệt như !@#$%^&* ...',
        }),
    password: yup
        .string()
        .min(8, 'Mật khẩu của bạn phải có ít nhất 8 ký tự')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
            message:
                'Mật khẩu của bạn phải có ít nhất một từ viết hoa, một từ viết thường, một chữ số và một ký tự đặc biệt như !@#$%^&* ...',
        }),
    confirm_password: yup
        .string()
        .required('Làm ơn hãy điền lại mật khẩu của bạn')
        .oneOf([yup.ref('password')], 'Không giống mật khẩu mà bạn vừa nhập'),
});

const ChangePasswordPage = () => {
    const router = useRouter();
    const [userId, setUserId] = useState<string>('');
    const user = useSelector((state: any) => state.user.user);

    const {
        control,
        handleSubmit,
        reset,

        formState: { errors, isSubmitting, isValid },
    } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange',
    });

    const mutation = useMutation({
        mutationFn: (data: any) => {
            return changePassword(data, userId);
        },
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
                    old_password: '',
                    confirm_password: '',
                });
            }, 5000);
        });
    };

    const handleDecoded = useCallback(() => {
        const accessToken = user?.access_token;
        if (!accessToken) return null;
        const decoded = jwtDecode(accessToken) as UserDecodedType;
        if (decoded) {
            setUserId(decoded.userId);
        } else {
            localStorage.removeItem('access_token');
            return null;
        }
    }, [user]);

    const handleError = useCallback(() => {
        if (mutation.isError) {
            toast.error('Mật khẩu bạn nhập sai');
            mutation.reset();
        }
        if (mutation.isSuccess) {
            toast.success('Thay đổi mật khẩu thành công');
            router.push('/sign-in');
        }
    }, [mutation, router]);

    useEffect(() => {
        handleDecoded();
        handleError();
    }, [handleDecoded, handleError]);

    return (
        <div>
            <div className={`border-b border-gray-300 `}>
                <div className="max-w-[1400px] mx-auto px-2">
                    <Navbar />
                </div>
            </div>
            <div className="bg-gray-100 max-sm:px-3 h-[150vh]">
                <div className="max-w-[1280px] mx-auto py-8 max-sm:py-3">
                    <div className="flex gap-1 items-center mb-9 max-sm:mb-3">
                        <span>Home</span>
                        <span>/</span>
                        <span className="text-[#2c6ecb]">Thay đổi mật khẩu</span>
                    </div>
                    <div className="mb-7 max-sm:mb-2">
                        <span className="text-[28px] max-sm:text-lg font-medium">{`Xin chào, ${user.name}`}</span>
                    </div>
                    <div className="flex max-sm:flex-col gap-8 justify-center">
                        <div className="w-[230px] max-sm:w-full flex flex-col gap-1 mt-3 text-base font-medium cursor-pointer">
                            <div
                                onClick={() => router.push('/account')}
                                className="flex gap-3 items-center px-4 py-3 rounded hover:bg-[#fff] hover:text-[#2c6ecb] transition-colors"
                            >
                                <span>
                                    <MdAccountCircle size={24} />
                                </span>
                                <span>Hồ sơ tài khoản</span>
                            </div>
                            <div
                                onClick={() => router.push('/account/customer')}
                                className="flex gap-3 items-center px-4 py-3 rounded hover:bg-[#fff] hover:text-[#2c6ecb] transition-colors"
                            >
                                <span>
                                    <PiAddressBookBold size={24} />
                                </span>
                                <span>Hồ sơ khách hàng</span>
                            </div>
                            <div className="flex gap-3 items-center px-4 py-3 hover:bg-[#fff] hover:text-[#2c6ecb] transition-colors">
                                <span>
                                    <MdOutlineLockReset size={24} />
                                </span>
                                <span>Đổi mật khẩu</span>
                            </div>
                            <div
                                onClick={() => router.push('/account/purchase')}
                                className="flex gap-3 items-center px-4 py-3 hover:bg-[#fff] hover:text-[#2c6ecb] transition-colors"
                            >
                                <span>
                                    <IoBagHandleOutline size={24} />
                                </span>
                                <span>Đơn hàng của tôi</span>
                            </div>
                        </div>
                        <div className="flex-1">
                            <div className="w-full h-full px-7 py-9 max-sm:py-5 max-sm:px-5 bg-white rounded">
                                <form autoComplete="off" onSubmit={handleSubmit(onSubmitHandler)}>
                                    <div className="flex flex-col gap-6 max-sm:gap-4">
                                        <div
                                            style={{
                                                borderBottom: '1px solid #ccc',
                                            }}
                                            className="text-base font-medium mb-5 max-sm:mb-3"
                                        >
                                            <h1>Đổi mật khẩu</h1>
                                        </div>
                                        <div className="flex items-center gap-8 max-sm:flex-col max-sm:gap-3">
                                            <label
                                                htmlFor="old_password"
                                                className="w-[130px] max-sm:w-full text-sm"
                                            >
                                                Mật khẩu hiện tại
                                            </label>
                                            <div className="flex flex-col gap-2 w-full">
                                                <InputPasswordToggle
                                                    id="old_password"
                                                    name="old_password"
                                                    placeholder="Nhập mật khẩu hiện tại của bạn"
                                                    control={control}
                                                    // readonly={false}
                                                />
                                                {errors.old_password && (
                                                    <div className="text-red-500 text-sm">
                                                        <p>{errors.old_password.message}</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-8 max-sm:flex-col max-sm:gap-3">
                                            <label
                                                htmlFor="password"
                                                className="w-[130px] max-sm:w-full text-sm"
                                            >
                                                Mật khẩu mới
                                            </label>
                                            <div className="flex flex-col gap-2 w-full">
                                                <InputPasswordToggle
                                                    id="password"
                                                    name="password"
                                                    placeholder="Nhập mật khẩu mới của bạn"
                                                    control={control}
                                                />
                                                {errors.password && (
                                                    <div className="text-red-500 text-sm">
                                                        <p>{errors.password.message}</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-8 max-sm:flex-col max-sm:gap-3">
                                            <label
                                                htmlFor="confirm_password"
                                                className="w-[130px] max-sm:w-full text-sm"
                                            >
                                                Xác nhận mật khẩu mới
                                            </label>
                                            <div className="flex flex-col gap-2 w-full">
                                                <InputPasswordToggle
                                                    id="confirm_password"
                                                    name="confirm_password"
                                                    placeholder="Xác nhận lại mật khẩu bạn vừa nhập"
                                                    control={control}
                                                />
                                                {errors.confirm_password && (
                                                    <div className="text-red-500 text-sm">
                                                        <p>{errors.confirm_password.message}</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="w-[130px]">
                                            <button
                                                className={`mt-4 w-full p-2 bg-[#ef4444] text-white hover:opacity-80 transition rounded-xl uppercase font-semibold ${
                                                    isSubmitting ? 'opacity-50' : ''
                                                }`}
                                                disabled={isSubmitting}
                                                type="submit"
                                            >
                                                {isSubmitting ? (
                                                    <div className="w-5 h-5 rounded-full mx-auto border-2 max-md:text-[14px] tracking-wide border-white border-t-2 border-t-transparent animate-spin"></div>
                                                ) : (
                                                    'Xác nhận'
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="mt-6">
                    <Footer />
                </div> */}
            </div>
        </div>
    );
};

export default ChangePasswordPage;
