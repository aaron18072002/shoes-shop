'use client';

import { resetPassword } from '@/apis/users.api';
import InputPasswordToggle from '@/components/InputPasswordToggle';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineHome } from 'react-icons/ai';
import { toast } from 'react-toastify';
import * as yup from 'yup';

interface ResetPasswordPageProps {}

const schema = yup.object({
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

const ResetPasswordPage: React.FC = (props: ResetPasswordPageProps) => {
    const router = useRouter();
    const { user_id } = useParams();

    const mutation = useMutation({
        mutationFn: (data: ResetPasswordType) => {
            return resetPassword(data, user_id as string);
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
                mutation.mutate(values);
                reset({
                    password: '',
                    confirm_password: '',
                });
            }, 5000);
        });
    };

    useEffect(() => {
        if (mutation.isSuccess) {
            toast.success('Thay đổi mật khẩu thành công');
            router.push('/sign-in');
        }
        // if (mutation.isError) {
        //     toast.error('Email này chưa từng được đăng ký');
        //     mutation.reset();
        // }
    }, [mutation, router]);

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
                            đổi mật khẩu
                        </h3>
                    </div>
                    <form autoComplete="off" onSubmit={handleSubmit(onSubmitHandler)}>
                        <div className="flex flex-col gap-6 max-sm:gap-4">
                            <div className="flex items-center gap-8 max-sm:flex-col max-sm:gap-3">
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
                            <div className="w-full">
                                <button
                                    className={`mt-4 w-full p-2 bg-[#3a3a3a] text-white hover:opacity-80 transition rounded-xl uppercase font-semibold ${
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
    );
};

export default ResetPasswordPage;
