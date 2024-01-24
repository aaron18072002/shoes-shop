'use client';

import Image from 'next/image';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import overlayImage from '../../assets/images/overlay.jpg';

import { AiOutlineHome } from 'react-icons/ai';
import InputHook from '@/components/InputHook';
import RadioInput from '@/components/RadioInput';
import { useMutation } from '@tanstack/react-query';
import { getUserById, registerUser } from '@/apis/users.api';
import { UserType } from '@/types/users.type';
import { useDispatch } from 'react-redux';
import { updateUser } from '@/redux/slices/userSlice';
import { jwtDecode } from 'jwt-decode';
import InputPasswordToggle from '@/components/InputPasswordToggle';

interface SignUpPageProps {}

type UserDecodedType = {
    exp: number;
    iat: number;
    role: number;
    userId: string;
};

const schema = yup.object({
    name: yup
        .string()
        .min(3, 'Tên quá ngắn')
        .max(30, 'Tên của bạn phải ít hơn 30 chữ cái')
        .required('Làm ơn điền tên của bạn'),
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
    confirm_password: yup
        .string()
        .required('Làm ơn hãy điền lại mật khẩu của bạn')
        .oneOf([yup.ref('password')], 'Không giống mật khẩu mà bạn vừa nhập'),
    gender: yup.string().required('Please select your gender').oneOf(['male', 'female']),
    day_of_birth: yup
        .string()
        .required('Vui lòng nhập ngày sinh của bạn')
        .matches(
            /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/,
            'Ngày sinh phải tương ứng với YYYY-MM-DD',
        ),

    // .oneOf([yup.ref('password')], 'Password must matches'),
});

const SignUpPage: React.FC = (props: SignUpPageProps) => {
    const router = useRouter();
    const dispatch = useDispatch();

    const mutation = useMutation({
        mutationFn: (formDta: UserType) => {
            return registerUser(formDta);
        },
    });

    const {
        control,
        handleSubmit,
        reset,
        watch,
        formState: { errors, isSubmitting, isValid },
    } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange',
        defaultValues: {
            gender: 'male',
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
                    name: '',
                    password: '',
                    email: '',
                    confirm_password: '',
                    gender: 'male',
                });
            }, 5000);
        });
    };

    const genderWatch = watch('gender');

    useEffect(() => {
        if (mutation.isSuccess) {
            const refreshToken = mutation?.data?.data?.refresh_token;
            const accessToken = mutation?.data?.data?.access_token;
            console.log(refreshToken, accessToken);

            if (refreshToken && accessToken) {
                localStorage.setItem('refresh_token', refreshToken);
                console.log(refreshToken);

                localStorage.setItem('access_token', accessToken);
                const decoded = jwtDecode(refreshToken) as UserDecodedType;
                console.log(decoded);

                if (decoded.userId) {
                    handleGetDetailUser(decoded.userId, refreshToken, accessToken);
                }
            }
            router.push('/');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mutation]);

    const handleGetDetailUser = async (id: string, refreshToken: string, accessToken: string) => {
        const data = await getUserById(id, refreshToken);
        const userInfo = data?.data?.data;
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
    };

    return (
        <div className="w-full h-[100vh] overflow-y-hidden relative">
            <Image
                src={overlayImage}
                alt="banner"
                width="0"
                height="0"
                sizes="100vw"
                className="w-full h-full object-cover"
            />
            <div
                className="absolute top-[50%] left-[50%]
             translate-x-[-50%] translate-y-[-50%] py-8 px-10 max-sm:py-6 max-sm:px-8 bg-white rounded-xl w-[500px] max-md:w-[350px]"
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
                        <h3 className="text-center uppercase text-[28px] max-sm:text-[22px] font-semibold">
                            Register
                        </h3>
                    </div>
                    <form onSubmit={handleSubmit(onSubmitHandler)} autoComplete="off">
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-2">
                                <InputHook
                                    id="name"
                                    name="name"
                                    type="text"
                                    className="py-2 px-4 border border-gray-300 rounded placeholder:text-sm"
                                    placeholder="Tên đăng nhập"
                                    control={control}
                                />
                                {errors.name && (
                                    <div className="text-red-500 text-sm">
                                        <p>{errors.name.message}</p>
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-col gap-2">
                                <InputHook
                                    id="email"
                                    name="email"
                                    type="email"
                                    className="py-2 px-4 border border-gray-300 rounded placeholder:text-sm"
                                    placeholder="Địa chỉ email của bạn"
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
                                    placeholder="Nhập mật khẩu mà bạn mong muốn"
                                    control={control}
                                />
                                {errors.password && (
                                    <div className="text-red-500 text-sm">
                                        <p>{errors.password.message}</p>
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-col gap-2">
                                <InputPasswordToggle
                                    id="confirm_password"
                                    name="confirm_password"
                                    placeholder="Xác nhận lại mật khẩu của bạn"
                                    control={control}
                                />
                                {errors.confirm_password && (
                                    <div className="text-red-500 text-sm">
                                        <p>{errors.confirm_password.message}</p>
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-x-6 max-sm:gap-x-3 ml-1">
                                    <label className="cursor-pointer max-sm:text-sm">
                                        Giới tính
                                    </label>
                                    <div className="items-center flex gap-x-3">
                                        <div className="flex items-center gap-x-2">
                                            <RadioInput
                                                control={control}
                                                name="gender"
                                                value="male"
                                                checked={genderWatch === 'male'}
                                                className="rounded-sm"
                                            ></RadioInput>
                                            <span>Nam</span>
                                        </div>
                                        <div className="flex items-center gap-x-3">
                                            <RadioInput
                                                control={control}
                                                name="gender"
                                                value="female"
                                                checked={genderWatch === 'female'}
                                                className="rounded-sm"
                                            ></RadioInput>
                                            <span>Nữ</span>
                                        </div>
                                    </div>
                                </div>
                                {errors?.gender && (
                                    <div className="text-red-500 text-sm">
                                        <p>{errors.gender?.message}</p>
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-x-6 max-sm:gap-x-3 ml-1">
                                    <label
                                        htmlFor="day_of_birth"
                                        className="cursor-pointer max-sm:text-sm"
                                    >
                                        Ngày sinh
                                    </label>
                                    <InputHook
                                        id="day_of_birth"
                                        name="day_of_birth"
                                        type="date"
                                        className="py-2 px-4 border border-gray-300 rounded placeholder:text-sm"
                                        placeholder="Ngày sinh của bạn"
                                        control={control}
                                    />
                                </div>
                                {errors.day_of_birth && (
                                    <div className="text-red-500 text-sm">
                                        <p>{errors.day_of_birth.message}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div
                            className="mt-4"
                            style={{
                                borderTop: '1px solid #ccc',
                            }}
                        >
                            <button
                                className={`mt-4 w-full p-3 bg-[#3a3a3a] text-white hover:opacity-80 transition rounded-lg uppercase font-semibold ${
                                    isSubmitting ? 'opacity-50' : ''
                                }`}
                                disabled={isSubmitting}
                                type="submit"
                            >
                                {isSubmitting ? (
                                    <div className="w-5 h-5 rounded-full mx-auto border-2 max-md:text-[14px] tracking-wide border-white border-t-2 border-t-transparent animate-spin"></div>
                                ) : (
                                    'Đăng kí'
                                )}
                            </button>
                        </div>
                    </form>
                    <div className="text-center mt-3 gap-2 flex justify-center items-center max-md:text-[14px]">
                        <h3>Bạn đã có tài khoản?</h3>
                        <Link href="/sign-in" className="hover:text-blue-400 transition">
                            Đăng nhập
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;
