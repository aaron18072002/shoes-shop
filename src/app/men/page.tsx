'use client';

import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import classNames from 'classnames';

import { FiChevronDown } from 'react-icons/fi';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import SimpleBar from '@/components/SimpleBar';
import ProductCard from '@/components/ProductCard';
import { setTitle } from '@/redux/slices/titleSlice';
import useQueryString from '@/hooks/useQueryString';
import { getMenProductsByOption } from '@/apis/products.api';
// import { useParams } from 'next/navigation'
import { ProductType } from '@/types/products.type';
import ProductsLoadingSkeleton from '@/components/ProductsLoadingSkeleton';
import Link from 'next/link';
import { upperFirstOfEachWord } from '@/utils/upperFirstOfEachWord';

interface MenPageProps {}

const PAGE_SIZE = 12;

const arrOptions = ['lifestyle', 'original', 'basketball', 'football', 'running', 'adidas', 'nike'];

const MenPage: React.FC<MenPageProps> = (props: MenPageProps) => {
    const router = useRouter();
    // const sticky = useSelector((state: any) => state.header.sticky);
    // const [data?.data?.data, setdata?.data?.data] = useState([]);
    const name_title = useSelector((state: any) => state.title.name_title);
    const [hidedFilter, setHidedFilter] = useState<boolean>(false);
    const [option, setOption] = useState<string>('all');
    const [sortType, setSortType] = useState<any>('none');

    const searchParamsObject: any = useQueryString();

    let page = Number(searchParamsObject[1]) || 1;

    const handleSetOption = (option: string) => {
        setSortType('none');
        dispatch(setTitle(option));
        setOption(option);
        router.push(`/men?page=1`);
    };

    const { data, isLoading, isSuccess, isError } = useQuery({
        queryKey: ['getProducts', page, option],
        queryFn: async () => await getMenProductsByOption(page, PAGE_SIZE, option),
    });

    const paginationInfo = data?.data?.paginationInfo;

    const dispatch = useDispatch();

    const sortMethods = {
        none: { method: (a: any, b: any): any => null },
        asc: { method: (a: any, b: any): any => (Number(a.price) < Number(b.price) ? -1 : 1) },
        desc: {
            method: (a: any, b: any): any => (Number(a.price) > Number(b.price) ? -1 : 1),
        },
        name: {
            method: (a: any, b: any): any => {
                const nameA = a.name.toLowerCase();
                const nameB = b.name.toLowerCase();
                if (nameA < nameB) {
                    return -1;
                } else if (nameA > nameB) {
                    return 1;
                } else {
                    return 0;
                }
            },
        },
    };

    const hideFilter = () => {
        setHidedFilter((preState) => !preState);
    };
    console.log(data?.data?.data.length);
    return (
        <Fragment>
            <div
                className={`border-b border-gray-300 fixed top-0 w-full bg-white z-10 shadow-md opacity-95`}
            >
                <div className="max-w-[1400px] mx-auto px-2">
                    <Navbar />
                </div>
            </div>
            <div className="max-w-[1280px] mx-auto mt-[110px]">
                <div className="my-6 flex gap-1 text-base max-md:px-2 max-sm:px-4">
                    <span
                        onClick={() => router.push('/')}
                        className="cursor-pointer hover:text-[#2c6ecb] transition"
                    >
                        Home
                    </span>
                    <span>/</span>
                    <span>Men</span>
                </div>
                <div className="flex items-center shadow-sm mb-6">
                    <div className="max-w-[200px] max-sm:w-[100px] h-[100px] max-sm:hidden">
                        <Image
                            width={0}
                            height={0}
                            sizes="100vh"
                            alt="banner"
                            src="/images/banner_img.png"
                            className="h-full w-full object-cover"
                        />
                    </div>
                    <div className="flex-1 border border-gray-300 shadow-md h-[100px] px-14 py-5 max-md:px-6 flex items-center justify-between">
                        <h3 className="uppercase text-[26px] max-md:text-[16px] max-sm:text-[13px] font-bold tracking-wider">
                            {name_title} sneakers
                        </h3>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 max-sm:gap-1 max-md:hidden">
                                <h4 className="text-[12px] max-sm:text-[10px] font-semibold uppercase">
                                    Hide filter
                                </h4>
                                <button onClick={hideFilter}>
                                    <Image
                                        width="14"
                                        height="14"
                                        src="/images/filter.png"
                                        alt="filter"
                                        className="font-bold"
                                    />
                                </button>
                            </div>
                            <div className="hidden max-md:block">
                                <div className="flex items-center gap-2">
                                    <h4 className="text-[12px] max-sm:text-[10px] font-semibold uppercase">
                                        options
                                    </h4>
                                    <div className="group relative">
                                        <FiChevronDown size={14} className="translate-y-[-1px]" />
                                        <div className="py-2 w-[120px] right-[1%] z-10 group-hover:block hidden absolute border border-gray-300 rounded-md bg-white text-sm font-semibold">
                                            <ul>
                                                {arrOptions &&
                                                    arrOptions.length > 0 &&
                                                    arrOptions.map((option) => {
                                                        return (
                                                            <li key={option}>
                                                                <button
                                                                    onClick={() =>
                                                                        handleSetOption(option)
                                                                    }
                                                                    className="px-4 py-1 text-left hover:bg-gray-400 w-full transition"
                                                                >
                                                                    {upperFirstOfEachWord(option)}
                                                                </button>
                                                            </li>
                                                        );
                                                    })}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <h4 className="text-[12px] max-sm:text-[10px] font-semibold uppercase">
                                    sort by
                                </h4>
                                <div className="group relative">
                                    <FiChevronDown size={14} className="translate-y-[-1px]" />
                                    <div className="py-2 w-[130px] z-10 group-hover:block hidden absolute max-md:right-[-10px] border border-gray-300 rounded-md bg-white text-sm font-semibold">
                                        <ul>
                                            <li>
                                                <button
                                                    onClick={() => setSortType('asc')}
                                                    className="px-4 py-1 hover:bg-gray-400 w-full transition"
                                                >
                                                    Giá tăng dần
                                                </button>
                                            </li>
                                            <li>
                                                <button
                                                    onClick={() => setSortType('desc')}
                                                    className="px-4 py-1 hover:bg-gray-400 w-full transition"
                                                >
                                                    Giá giảm dần
                                                </button>
                                            </li>
                                            <li>
                                                <button
                                                    onClick={() => setSortType('name')}
                                                    className="px-4 py-1 hover:bg-gray-400 w-full transition"
                                                >
                                                    Name
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between mb-8 max-md:px-4 max-sm:px-2">
                    {!hidedFilter && <SimpleBar handleSetOption={handleSetOption} />}
                    <div className="flex-1">
                        {!isLoading && (
                            <div
                                className={`pl-8 py-5 grid grid-cols-4 max-md:grid-cols-2 max-md:gap-3 max-md:pl-0 max-md:py-2 gap-6 ${
                                    hidedFilter ? 'grid-cols-5 padding-left-0' : ''
                                }`}
                            >
                                {data?.data?.data &&
                                    data?.data?.data.length > 0 &&
                                    data?.data?.data
                                        .sort(
                                            sortMethods[sortType as keyof typeof sortMethods]
                                                .method,
                                        )
                                        .map((product: ProductType) => {
                                            return (
                                                <ProductCard
                                                    title={product.name}
                                                    price={Number(product.price)}
                                                    image={product.images[0]}
                                                    image2={product.images[1]}
                                                    id={product.id}
                                                    key={product.id}
                                                    color={product.color}
                                                    is_discount={product.is_discount}
                                                    promotionId={product.promotionId}
                                                />
                                            );
                                        })}
                                {data?.data?.data.length === 0 && <div>Không có sản phẩm nào</div>}
                            </div>
                        )}
                        {isLoading && <ProductsLoadingSkeleton />}
                    </div>
                </div>
            </div>
            <div className="mt-8 mb-12 flex justify-center">
                <nav aria-label="Page navigation example">
                    <ul className="inline-flex -space-x-px">
                        <li>
                            {page === 1 ? (
                                <span className="cursor-not-allowed mr-3 font-bold rounded-full border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                                    {`<`}
                                </span>
                            ) : (
                                <Link
                                    className="rounded-full mr-3 font-bold border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 "
                                    href={`/men?page=${page - 1}`}
                                >
                                    {`<`}
                                </Link>
                            )}
                        </li>
                        {Array(paginationInfo?.pages)
                            .fill(0)
                            .map((_, index) => {
                                const pageNumber = index + 1;
                                const isActive = page === pageNumber;
                                return (
                                    <li key={pageNumber}>
                                        <Link
                                            className={classNames(
                                                'border rounded-full border-gray-300 py-2 px-3 mx-3 leading-tight hover:bg-gray-100 hover:text-gray-700',
                                                {
                                                    'bg-gray-100 text-gray-700': isActive,
                                                    'bg-white text-gray-500': !isActive,
                                                },
                                            )}
                                            href={`/men?page=${pageNumber}`}
                                        >
                                            {pageNumber}
                                        </Link>
                                    </li>
                                );
                            })}
                        <li>
                            {page === paginationInfo?.pages ? (
                                <span className="cursor-not-allowed ml-3 font-bold rounded-full border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 ">
                                    {`>`}
                                </span>
                            ) : (
                                <Link
                                    className="rounded-full border ml-3 border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 "
                                    href={`/men?page=${page + 1}`}
                                >
                                    {`>`}
                                </Link>
                            )}
                        </li>
                    </ul>
                </nav>
            </div>
            <Footer />
        </Fragment>
    );
};

export default MenPage;
