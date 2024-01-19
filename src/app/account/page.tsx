'use client';

import Navbar from '@/components/Navbar';
import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { MdAccountCircle, MdOutlineLockReset } from 'react-icons/md';
import { IoBagHandleOutline } from 'react-icons/io5';
import InputHook from '@/components/InputHook';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import RadioInput from '@/components/RadioInput';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation, useQuery } from '@tanstack/react-query';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';
import { getUserById, updateUser } from '@/apis/users.api';
import { PiAddressBookBold } from 'react-icons/pi';
import { toast } from 'react-toastify';

interface AccountPageProps {}

const schema = yup.object({
    name: yup
        .string()
        .min(3, 'Tên quá ngắn')
        .max(30, 'Tên của bạn phải ít hơn 30 chữ cái')
        .required('Làm ơn điền tên của bạn'),
    // email: yup
    //     .string()
    //     .email('Làm ơn hãy điền email hợp lệ')
    //     .required('Đừng bỏ trống email của bạn'),
    gender: yup.string().required('Please select your gender').oneOf(['male', 'female']),
});

type UserDecodedType = {
    exp: number;
    iat: number;
    role: number;
    userId: string;
};

type userUpdateType = {
    name: string;
    gender: string;
};

const AccountPage: React.FC<AccountPageProps> = (props: AccountPageProps) => {
    const [userData, setUserData] = useState<any>(null);
    const user = useSelector((state: any) => state.user.user);

    const router = useRouter();

    console.log(userData);

    const mutation = useMutation({
        mutationFn: (data: userUpdateType) => {
            return updateUser(data, userData.id);
        },
    });

    const {
        control,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting, isValid },
    } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange',
        defaultValues: {
            gender: user.gender,
        },
    });

    const genderWatch = watch('gender');

    const onSubmitHandler = (values: any) => {
        if (!isValid) return 0;
        return new Promise<void>((resolve) => {
            setTimeout(() => {
                resolve();
                console.log(values);
                mutation.mutate(values);
                // router.push('/sign-in');
            }, 5000);
        });
    };

    const handleError = useCallback(() => {
        if (mutation.isError) {
            toast.error('Có lỗi xảy ra');
            mutation.reset();
        }
        if (mutation.isSuccess) {
            toast.success('Thay đổi mật khẩu thành công');
            router.push('/sign-in');
        }
    }, [mutation, router]);

    const handleGetUser = useCallback(async () => {
        const refreshToken = localStorage.getItem('refresh_token');
        if (!refreshToken) return null;
        const decoded = jwtDecode(refreshToken) as UserDecodedType;
        if (decoded) {
            const data = await getUserById(decoded.userId, refreshToken as string);
            setUserData(data?.data?.data);
            return;
        } else {
            return null;
        }
    }, []);

    useEffect(() => {
        handleError();
    }, [handleError]);

    useEffect(() => {
        handleGetUser();
    }, [handleGetUser]);

    return (
        <div>
            <div className={`border-b border-gray-300`}>
                <div className="max-w-[1400px] mx-auto px-2">
                    <Navbar />
                </div>
            </div>
            {userData && (
                <div className="bg-gray-100 h-[130vh] max-sm:px-3">
                    <div className="max-w-[1280px] mx-auto py-8 max-sm:py-3">
                        <div className="flex gap-1 items-center mb-9 max-sm:mb-3">
                            <span>Home</span>
                            <span>/</span>
                            <span className="text-[#2c6ecb]">Tài khoản của tôi</span>
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
                                <div
                                    onClick={() => router.push('/account/change-password')}
                                    className="flex gap-3 items-center px-4 py-3 hover:bg-[#fff] hover:text-[#2c6ecb] transition-colors"
                                >
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
                                    <div className="text-[24px] font-medium mb-5">
                                        <h1>Hồ sơ tài khoản</h1>
                                    </div>
                                    <form onSubmit={handleSubmit(onSubmitHandler)}>
                                        <div className="flex flex-col gap-4">
                                            <div
                                                style={{
                                                    borderBottom: '1px solid #ccc',
                                                }}
                                                className="text-base font-medium mb-5 max-sm:mb-3"
                                            >
                                                <h1>Thông tin tài khoản</h1>
                                            </div>
                                            <div className="flex max-sm:flex-col max-sm:items-start max-sm:gap-3 items-center gap-8">
                                                <label
                                                    htmlFor="name"
                                                    className="w-[120px] max-sm:w-[100px] text-sm"
                                                >
                                                    Tên tài khoản
                                                </label>
                                                <div className="flex flex-col gap-2 w-full">
                                                    <InputHook
                                                        id="name"
                                                        name="name"
                                                        type="text"
                                                        className="input py-2 px-4 border border-gray-300 focus:border-gray-500 rounded placeholder:text-sm"
                                                        placeholder="Nhập tên của bạn"
                                                        defaultValue={userData.name}
                                                        control={control}
                                                    />
                                                    {errors.name && (
                                                        <div className="text-red-500 text-sm">
                                                            <p>
                                                                {errors?.name?.message?.toString()}
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex max-sm:flex-col max-sm:items-start max-sm:gap-3 items-center gap-8">
                                                <label
                                                    htmlFor="email"
                                                    className="w-[120px] max-sm:w-[100px] text-sm"
                                                >
                                                    Tên email
                                                </label>
                                                <div className="flex flex-col gap-2 w-full">
                                                    <input
                                                        id="email"
                                                        name="email"
                                                        type="text"
                                                        className="input py-2 px-4 border border-gray-300 focus:border-gray-500 rounded placeholder:text-sm"
                                                        placeholder="Email"
                                                        readOnly={true}
                                                        // value={userData.email}
                                                        defaultValue={userData.email}
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-8 max-sm:gap-3">
                                                <label
                                                    htmlFor="gender"
                                                    className="w-[120px] max-sm:w-[80px] text-sm"
                                                >
                                                    Giới tính
                                                </label>
                                                <div className="items-center flex gap-x-3 ml-[-12px]">
                                                    <div className="flex items-center gap-x-2">
                                                        <RadioInput
                                                            control={control}
                                                            name="gender"
                                                            value="male"
                                                            checked={genderWatch === 'male'}
                                                            className="rounded-full"
                                                        ></RadioInput>
                                                        <span>Nam</span>
                                                    </div>
                                                    <div className="flex items-center gap-x-3">
                                                        <RadioInput
                                                            control={control}
                                                            name="gender"
                                                            value="female"
                                                            checked={genderWatch === 'female'}
                                                            className="rounded-full"
                                                        ></RadioInput>
                                                        <span>Nữ</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex max-sm:flex-col max-sm:items-start max-sm:gap-3 items-center gap-8">
                                                <label
                                                    htmlFor="day_of_birth"
                                                    className="w-[120px] max-sm:w-[100px] text-sm"
                                                >
                                                    Ngày sinh
                                                </label>
                                                <div className="flex flex-col gap-2 w-full">
                                                    <input
                                                        id="day_of_birth"
                                                        name="day_of_birth"
                                                        type="date"
                                                        className="input py-2 px-4 border border-gray-300 rounded placeholder:text-sm"
                                                        readOnly={true}
                                                        defaultValue={userData.day_of_birth}
                                                    />
                                                </div>
                                            </div>
                                            <div className="w-[100px]">
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
                                                        'Lưu'
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AccountPage;
