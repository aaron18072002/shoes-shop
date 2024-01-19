'use client';

import { sendEmail } from '@/apis/email.api';
import InputHook from '@/components/InputHook';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineHome } from 'react-icons/ai';
import { toast } from 'react-toastify';
import * as yup from 'yup';

interface ForgotPasswordPageProps {}

const schema = yup.object({
    email: yup
        .string()
        .email('Làm ơn hãy điền email hợp lệ')
        .required('Đừng bỏ trống email của bạn'),
});

const ForgotPasswordPage: React.FC = (props: ForgotPasswordPageProps) => {
    const router = useRouter();

    const mutation = useMutation({
        mutationFn: (email: string) => {
            return sendEmail(email);
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
                    email: '',
                });
            }, 5000);
        });
    };

    useEffect(() => {
        if (mutation.isError) {
            toast.error('Email này chưa từng được đăng ký');
            mutation.reset();
        }
    }, [mutation]);

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
             translate-x-[-50%] translate-y-[-50%] py-8 px-10 bg-white rounded-xl w-[500px] max-md:w-[350px]"
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
                        <h3 className="text-center uppercase text-[28px] font-semibold max-sm:text-[24px] max-sm:pt-[28px]">
                            quên mật khẩu
                        </h3>
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
                        </div>
                        <div className="max-sm:mt-3">
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
                                    'gửi'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
