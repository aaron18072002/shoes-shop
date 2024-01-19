'use client';

import { getCustomerByUserId, updateCustomerByUserId } from '@/apis/customers.api';
import InputHook from '@/components/InputHook';
import Navbar from '@/components/Navbar';
import { formatSecretInfo } from '@/utils/formatSecretInfo';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { jwtDecode } from 'jwt-decode';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoBagHandleOutline } from 'react-icons/io5';
import { MdAccountCircle, MdOutlineLockReset } from 'react-icons/md';
import { PiAddressBookBold } from 'react-icons/pi';
import { useSelector } from 'react-redux';
import * as yup from 'yup';

interface CustomerPageProps {}

const schema = yup.object({
    name: yup
        .string()
        .required('Làm ơn điền tên của bạn')
        .min(3, 'Tên quá ngắn')
        .max(30, 'Tên của bạn phải ít hơn 30 ký tự'),
    phone_number: yup
        .string()
        .required('Vui lòng điền số điện thoại của bạn')
        .max(10, 'Số điện thoại không hợp lệ'),
    address: yup.string().required('Vui lòng nhập địa chỉ nơi bạn sinh sống'),
    city: yup.string().required('Vui lòng chọn thành phố nơi bạn sống'),
    // country: yup.string().notOneOf([''], 'Bạn phải lựa chọn đất nước của bạn'),
});

const CustomerPage: React.FC<CustomerPageProps> = (props: CustomerPageProps) => {
    const [customerData, setCustomerData] = useState<any>(null);
    const [userId, setUserId] = useState<string>('');
    const user = useSelector((state: any) => state.user.user);

    const router = useRouter();

    const mutation = useMutation({
        mutationFn: (data: any) => {
            return updateCustomerByUserId(userId, data);
        },
    });

    const {
        control,
        handleSubmit,
        formState: { isValid, errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange',
        defaultValues: {},
    });

    const onSubmitHandler = (values: any) => {
        if (!isValid) return 0;
        return new Promise<void>((resolve) => {
            setTimeout(() => {
                resolve();
                console.log(values);
                mutation.mutate(values);
                router.push('/sign-in');
            }, 5000);
        });
    };

    const handleGetCustomer = useCallback(async () => {
        const accessToken = user?.access_token;
        if (!accessToken) return null;
        const decoded = jwtDecode(accessToken) as UserDecodedType;
        if (decoded) {
            const data = await getCustomerByUserId(decoded.userId);
            setCustomerData(data?.data?.data);
            setUserId(decoded.userId);
            return;
        } else {
            return;
        }
    }, [user]);

    console.log(customerData);
    console.log(userId);

    useEffect(() => {
        handleGetCustomer();
    }, [handleGetCustomer]);

    return (
        <div>
            <div className={`border-b border-gray-300`}>
                <div className="max-w-[1400px] mx-auto px-2">
                    <Navbar />
                </div>
            </div>

            <div className="bg-gray-100 h-[130vh] max-sm:px-3">
                <div className="max-w-[1280px] mx-auto py-8 max-sm:py-3">
                    <div className="flex gap-1 items-center mb-9 max-sm:mb-3">
                        <span>Home</span>
                        <span>/</span>
                        <span className="text-[#2c6ecb]">Hồ sơ khách hàng</span>
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
                        {!customerData && (
                            <div className="flex-1">
                                <div className="w-full py-[300px] max-sm:py-[150px] bg-white rounded-md shadow-md overflow-hidden mb-5">
                                    <div className="flex flex-col items-center justify-center gap-5">
                                        <Image
                                            width={0}
                                            height={0}
                                            sizes="100vw"
                                            alt="product_img"
                                            src={'/images/chuacodonhang.png'}
                                            className="object-cover w-[100px] h-[100px] max-sm:w-[60px] max-sm:h-[60px]"
                                        />
                                        <h4>Bạn chưa đặt đơn hàng nào</h4>
                                    </div>
                                </div>
                            </div>
                        )}
                        {customerData && (
                            <div className="flex-1">
                                <div className="w-full h-full px-7 py-9 max-sm:py-5 max-sm:px-5 bg-white rounded">
                                    <form onSubmit={handleSubmit(onSubmitHandler)}>
                                        <div className="flex flex-col gap-4">
                                            <div
                                                style={{
                                                    borderBottom: '1px solid #ccc',
                                                }}
                                                className="text-base font-medium mb-5 max-sm:mb-3"
                                            >
                                                <h1>Hồ sơ khách hàng</h1>
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
                                                        placeholder="Nhập họ tên của bạn"
                                                        defaultValue={customerData.name}
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
                                                    htmlFor="address"
                                                    className="w-[120px] max-sm:w-[100px] text-sm"
                                                >
                                                    Địa chỉ
                                                </label>
                                                <div className="flex flex-col gap-2 w-full">
                                                    <InputHook
                                                        id="address"
                                                        name="address"
                                                        type="text"
                                                        className="input py-2 px-4 border border-gray-300 focus:border-gray-500 rounded placeholder:text-sm"
                                                        placeholder="Nhập địa chỉ nhà nơi bạn cư trú"
                                                        defaultValue={customerData.address}
                                                        control={control}
                                                    />
                                                    {errors.address && (
                                                        <div className="text-red-500 text-sm">
                                                            <p>
                                                                {errors?.address?.message?.toString()}
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex max-sm:flex-col max-sm:items-start max-sm:gap-3 items-center gap-8">
                                                <label
                                                    htmlFor="city"
                                                    className="w-[120px] max-sm:w-[100px] text-sm"
                                                >
                                                    Thành phố
                                                </label>
                                                <div className="flex flex-col gap-2 w-full">
                                                    <InputHook
                                                        id="city"
                                                        name="city"
                                                        type="text"
                                                        className="input py-2 px-4 border border-gray-300 focus:border-gray-500 rounded placeholder:text-sm"
                                                        placeholder="Nhập thành phố nơi bạn sinh sống"
                                                        defaultValue={customerData.city}
                                                        control={control}
                                                    />
                                                    {errors.city && (
                                                        <div className="text-red-500 text-sm">
                                                            <p>
                                                                {errors?.city?.message?.toString()}
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex max-sm:flex-col max-sm:items-start max-sm:gap-3 items-center gap-8">
                                                <label
                                                    htmlFor="country"
                                                    className="w-[120px] max-sm:w-[100px] text-sm"
                                                >
                                                    Quốc tịch
                                                </label>
                                                <div className="flex flex-col gap-2 w-full">
                                                    <input
                                                        id="country"
                                                        name="country"
                                                        type="text"
                                                        className="input py-2 px-4 border border-gray-300 rounded placeholder:text-sm"
                                                        readOnly={true}
                                                        defaultValue={customerData.country}
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex max-sm:flex-col max-sm:items-start max-sm:gap-3 items-center gap-8">
                                                <label
                                                    htmlFor="phone_number"
                                                    className="w-[120px] max-sm:w-[100px] text-sm"
                                                >
                                                    Số điện thoại
                                                </label>
                                                <div className="flex flex-col gap-2 w-full">
                                                    <InputHook
                                                        id="phone_number"
                                                        name="phone_number"
                                                        type="text"
                                                        className="input py-2 px-4 border border-gray-300 focus:border-gray-500 rounded placeholder:text-sm"
                                                        placeholder="Nhập số điện thoại của bạn"
                                                        defaultValue={formatSecretInfo(
                                                            customerData.phone_number,
                                                        )}
                                                        control={control}
                                                    />
                                                    {errors.phone_number && (
                                                        <div className="text-red-500 text-sm">
                                                            <p>
                                                                {errors?.phone_number?.message?.toString()}
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-[100px] mt-5">
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
                                    </form>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerPage;
