'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// import { setFixed } from '@/redux/slices/headerSlice';
import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';
import Footer from '@/components/Footer';
import { useQuery } from '@tanstack/react-query';
import { getProductsByOption } from '@/apis/products.api';
import { ProductType } from '@/types/products.type';
import { getNewAccessToken, getUserById } from '@/apis/users.api';
import { resetUser, updateUser } from '@/redux/slices/userSlice';
import { jwtDecode } from 'jwt-decode';
import axios, { AxiosRequestConfig } from 'axios';
import Image from 'next/image';
import { SiNike, SiAdidas, SiJordan, SiPuma } from 'react-icons/si';
import { GiConverseShoe } from 'react-icons/gi';
import { MEDIA_IMAGE_PATH } from '@/constants/common';
import Slider from '@/components/Slider';

const PAGE_SIZE = 4;
const PAGE = 1;

const pageSize = 10;

type UserDecodedType = {
    exp: number;
    iat: number;
    role: number;
    userId: string;
};

export default function Home() {
    const axiosInstance = axios.create({
        baseURL: 'http://localhost:3000/',
        timeout: 5000,
        headers: {
            Authorization: localStorage.getItem('access_token')
                ? 'JWT ' + localStorage.getItem('access_token')
                : null,
            'Content-Type': 'application/json',
            accept: 'application/json',
        },
    });
    // const sticky = useSelector((state: any) => state.header.sticky);
    const dispatch = useDispatch();
    const [nikeProducts, setNikeProducts] = useState<any>(null);
    const [adidasProducts, setAdidasProducts] = useState<any>(null);

    const user = useSelector((state: any) => state.user.user);

    const refresh_token = localStorage.getItem('refresh_token') as string;

    const { data, isLoading } = useQuery({
        queryKey: ['getProducts', PAGE, PAGE_SIZE],
        queryFn: async () => await getProductsByOption(PAGE_SIZE, 'adidas'),
    });

    const productsData = data?.data?.data;

    console.log(productsData);

    // const isSticky = useCallback(() => {
    //     const scrollTop = window.scrollY;
    //     if (scrollTop >= 250) {
    //         dispatch(setFixed(true));
    //     } else {
    //         dispatch(setFixed(false));
    //     }
    // }, [dispatch]);

    const handleGetDetailUser = useCallback(
        async (id: string, token: string) => {
            const data = await getUserById(id, token);
            const userInfo = data?.data?.data;
            const accessToken = localStorage.getItem('access_token');
            dispatch(
                updateUser({
                    name: userInfo.name,
                    email: userInfo.email,
                    avatar_img: userInfo.avatar_img,
                    role: userInfo.role,
                    gender: userInfo.gender,
                    access_token: accessToken as string,
                    refresh_token: token,
                }),
            );
        },
        [dispatch],
    );

    const handleDecoded = useCallback(() => {
        const accessToken = user?.access_token;

        if (!accessToken) return null;

        const decoded = jwtDecode(accessToken) as UserDecodedType;
        if (decoded) {
            return decoded;
        } else {
            localStorage.removeItem('access_token');
            return null;
        }
    }, [user]);

    const handleGetOptionProducts = useCallback(async () => {
        const [nikeResponse, adidasResponse] = await Promise.all([
            getProductsByOption(pageSize, 'nike'),
            getProductsByOption(pageSize, 'adidas'),
        ]);
        setNikeProducts(nikeResponse.data.data);
        setAdidasProducts(adidasResponse.data.data);
    }, []);

    useEffect(() => {
        const decoded = handleDecoded();
        if (decoded?.userId && decoded.userId) {
            handleGetDetailUser(decoded.userId, refresh_token);
        }
        handleGetOptionProducts();
        // window.addEventListener('scroll', isSticky);
        // return () => {
        //     window.removeEventListener('scroll', isSticky);
        // };
    }, [handleDecoded, handleGetDetailUser, refresh_token, handleGetOptionProducts]);

    axiosInstance.interceptors.request.use(
        async (config: AxiosRequestConfig) => {
            config.headers = config.headers ?? {};
            const dateNow = new Date();
            const decoded = handleDecoded();
            let refreshToken = user.refresh_token as string;
            const decodedRefreshToken = jwtDecode(refreshToken) as UserDecodedType;
            if (decodedRefreshToken.exp > dateNow.getTime() / 1000) {
                if (decoded?.exp && decoded.exp < dateNow.getTime() / 1000) {
                    const data = await getNewAccessToken(refreshToken);
                    localStorage.setItem('access_token', data.data.accessToken);
                    config.headers.Authorization = `Bearer ${data.data.accessToken}`;
                }
            } else {
                dispatch(resetUser());
            }
            return config;
        },
        (err) => {
            return Promise.reject(err);
        },
    );

    return (
        <main>
            <div
                className={`border-b border-gray-300 fixed top-0 w-full bg-white z-10 shadow-md opacity-95`}
            >
                <div className="max-w-[1400px] mx-auto px-2">
                    <Navbar />
                </div>
            </div>
            <div className="w-full mt-[100px] max-md:hidden">
                <Image
                    // src={'/images/banner/main_banner.jpg'}
                    src={`${MEDIA_IMAGE_PATH}50c2278c3a4bd59e045565101`}
                    width={0}
                    height={0}
                    sizes="100vw"
                    alt="main_banner"
                    className="object-cover w-full h-[700px]"
                />
            </div>
            <div className='className="w-full mt-[80px] hidden p-3 max-md:block'>
                <Image
                    src={`${MEDIA_IMAGE_PATH}50c2278c3a4bd59e045565100`}
                    width={0}
                    height={0}
                    sizes="100vw"
                    alt="mobile_main_banner"
                    className="object-cover w-full h-[450px]"
                />
            </div>
            <div className="max-w-[1280px] mx-auto my-8 max-sm:px-3">
                <div className="flex flex-col gap-5">
                    <span className="text-[28px] font-bold tracking-wider mx-auto">BRANDS</span>
                    <div className="flex items-center justify-between text-[#555] opacity-50 text-[80px] max-md:text-[40px]">
                        <SiNike />
                        <SiAdidas />
                        <SiPuma />
                        <GiConverseShoe />
                        <SiJordan />
                    </div>
                </div>
            </div>
            <div className="max-w-[1280px] mx-auto mt-4 max-sm:px-3">
                <div className="flex flex-col">
                    <div className="flex items-center justify-start gap-3">
                        <Image
                            src={`${MEDIA_IMAGE_PATH}345d042cb50d7b5fbb5943201`}
                            width={0}
                            height={0}
                            sizes="100vw"
                            alt="nike_banner"
                            className="object-cover w-[150px] h-[150px] bg-transparent"
                        />
                        <h4 className="text-[28px] tracking-wider uppercase font-bold translate-y-[6px]">
                            Nike
                        </h4>
                    </div>
                    <div className="w-full h-fit">
                        <Slider products={nikeProducts} />
                    </div>
                </div>
            </div>
            <div className="max-w-[1280px] mx-auto max-sm:px-3">
                <div className="flex flex-col">
                    <div className="flex items-center justify-start gap-3">
                        <Image
                            src={`${MEDIA_IMAGE_PATH}345d042cb50d7b5fbb5943200`}
                            width={0}
                            height={0}
                            sizes="100vw"
                            alt="addidas_banner"
                            className="object-cover w-[150px] h-[150px] bg-transparent"
                        />
                        <h4 className="text-[28px] tracking-wider uppercase font-bold translate-y-[6px]">
                            Adidas
                        </h4>
                    </div>
                    <div className="w-full h-fit">
                        <Slider products={adidasProducts} />
                    </div>
                </div>
            </div>
            <div className="pb-12 max-md:px-4">
                <div className="max-w-[1280px] mx-auto md:px-2 sm:px-5">
                    <h3 className="text-center my-8 text-[28px] font-bold tracking-wider uppercase">
                        Featured Products
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-10 max-md:gap-4">
                        {productsData &&
                            productsData.length > 0 &&
                            productsData.map((product: ProductType) => {
                                return (
                                    <ProductCard
                                        title={product.name}
                                        price={Number(product.price)}
                                        image={product.images[0]}
                                        image2={product.images[1]}
                                        id={product.id}
                                        key={product.id}
                                        color={product.color}
                                    />
                                );
                            })}
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
