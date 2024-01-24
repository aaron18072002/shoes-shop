'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState, memo } from 'react';
import SearchBar from './SearchBar';
import { BsChevronCompactUp } from 'react-icons/bs';
import { BiSearch } from 'react-icons/bi';
import { AiOutlineShoppingCart, AiOutlineHeart } from 'react-icons/ai';
import { FiLogIn, FiLogOut } from 'react-icons/fi';
import { GiArchiveRegister } from 'react-icons/gi';
import { useDispatch, useSelector } from 'react-redux';
import { resetUser } from '@/redux/slices/userSlice';
import { AiOutlineUser } from 'react-icons/ai';
import { useQueryClient } from '@tanstack/react-query';
import { FaUserCog } from 'react-icons/fa';
import { MEDIA_IMAGE_PATH } from '@/constants/common';

// import { QueryCache } from '@tanstack/react-query';
// import { logout } from '@/apis/users.api';

interface NavbarProps {}

const Navbar: React.FC = (props: NavbarProps) => {
    const cart_length = useSelector((state: any) => state.cart.cart).length;
    const favourite_length = useSelector((state: any) => state.favourite.favourite).length;
    const [showProfile, setShowProfile] = useState<boolean>(false);
    const [showNav, setShowNav] = useState<boolean>(false);

    const dispatch = useDispatch();

    const queryClient = useQueryClient();

    const userInfo = useSelector((state: any) => state.user.user);

    const handleLogout = () => {
        dispatch(resetUser());
        // logout(accessToken as string, refreshToken as string);
        // localStorage.clear();
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        queryClient.clear();
        queryClient.invalidateQueries();
    };

    return (
        <div>
            <div className="flex items-center justify-between py-4 relative">
                <div className="flex items-center md:space-x-10 lg:space-x-20">
                    <div className="flex items-center h-fit">
                        <Link href="/">
                            <Image
                                alt="logo"
                                // src="/images/logo.png"
                                src={`${MEDIA_IMAGE_PATH}cee953f5a0c6d52f03805993a`}
                                width={30}
                                height={30}
                                className="object-cover"
                            />
                        </Link>
                    </div>
                    <nav className="max-md:hidden nav_links">
                        <ul className="flex items-center lg:space-x-10 space-x-7 text-[15px]">
                            <li>
                                <Link href="/" className="py-3 inline-block w-full">
                                    Trang chủ
                                </Link>
                            </li>
                            <li>
                                <Link href="/men" className="py-3 inline-block w-full">
                                    Nam
                                </Link>
                            </li>
                            <li>
                                <Link href="/women" className="py-3 inline-block w-full">
                                    Nữ
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className="flex items-center space-x-4">
                    <SearchBar />
                    {userInfo.name !== '' ? (
                        <div
                            onClick={() => setShowProfile(!showProfile)}
                            className="relative cursor-pointer transition-all"
                        >
                            <Image
                                // src={userInfo.avatar_img}
                                src={`${MEDIA_IMAGE_PATH}${userInfo.avatar_img}`}
                                alt="avatar user"
                                width={38}
                                height={38}
                                className="rounded-full object-cover"
                            />
                            <div
                                className={`absolute bg-white z-[2] top-[45px] rounded-lg shadow-lg border border-gray-300 py-3 w-[160px] text-base flex flex-col gap-2 transition ${
                                    showProfile ? '' : 'hidden'
                                }`}
                            >
                                <div className="flex gap-x-2 items-center px-4 hover:bg-slate-400">
                                    <FiLogIn size={16} />
                                    <Link className="w-full " href="/sign-in">
                                        Đăng nhập
                                    </Link>
                                </div>
                                <div className="flex gap-x-2 items-center px-4 hover:bg-slate-400">
                                    <GiArchiveRegister size={16} />
                                    <Link className="w-full " href="/sign-up">
                                        Đăng kí
                                    </Link>
                                </div>
                                <div className="flex gap-x-2 items-center px-4 hover:bg-slate-400">
                                    <FiLogOut size={16} />
                                    <Link
                                        className="w-full "
                                        href="/sign-in"
                                        onClick={handleLogout}
                                    >
                                        Log out
                                    </Link>
                                </div>
                                <div className="flex gap-x-2 items-center px-4 hover:bg-slate-400">
                                    <FaUserCog size={16} />
                                    <Link className="w-full " href="/account">
                                        Tài khoản
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="p-2 bg-gray-100 rounded-full relative">
                            <span
                                className="cursor-pointer"
                                onClick={() => setShowProfile(!showProfile)}
                            >
                                <AiOutlineUser size={22} />
                            </span>
                            <div
                                className={`absolute top-12 bg-white z-[2] rounded-lg shadow-lg py-3 w-[150px] text-base flex flex-col gap-2  transition ${
                                    showProfile ? '' : 'hidden'
                                }`}
                            >
                                <div className="flex gap-x-2 items-center px-4 hover:bg-slate-400">
                                    <FiLogIn size={16} />
                                    <Link className="w-full " href="/sign-in">
                                        Đăng nhập
                                    </Link>
                                </div>
                                <div className="flex gap-x-2 items-center px-4 hover:bg-slate-400">
                                    <GiArchiveRegister size={16} />
                                    <Link className="w-full " href="/sign-up">
                                        Đăng kí
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}
                    <Link href="/favourite">
                        <div className="p-2 bg-gray-100 rounded-full relative">
                            <AiOutlineHeart size={22} />
                            {favourite_length > 0 && (
                                <div className="absolute flex items-center justify-center h-[20px]  w-[20px] bg-neutral-300 rounded-full top-[-20%] right-[-15%]">
                                    <span className="h-fit text-[12px] text-[#3A3A3A] font-medium">
                                        {favourite_length}
                                    </span>
                                </div>
                            )}
                        </div>
                    </Link>
                    <Link href="/cart">
                        <div className="p-2 bg-gray-100 rounded-full relative">
                            <AiOutlineShoppingCart size={22} />
                            {cart_length > 0 && (
                                <div className="absolute flex items-center justify-center h-[20px]  w-[20px] bg-neutral-300 rounded-full top-[-20%] right-[-15%]">
                                    <span className="h-fit text-[12px] text-[#3A3A3A] font-medium">
                                        {cart_length}
                                    </span>
                                </div>
                            )}
                        </div>
                    </Link>
                    <span
                        onClick={() => setShowNav(!showNav)}
                        className="p-[11px] bg-gray-100 rounded-full md:hidden"
                    >
                        <BsChevronCompactUp
                            className={`transition ease-in duration-150 ${
                                showNav ? 'rotate-180' : ''
                            }`}
                        />
                    </span>
                </div>
            </div>
            <div
                className={`md:hidden ${
                    showNav ? 'pb-4 px-5' : 'h-0 invisible opacity-0'
                } transition-all ease-in`}
            >
                <ul className="flex flex-col text-[15px] px-2 max-md:gap-4">
                    <li>
                        <Link href="/" className="py-3 inline-block w-full">
                            Trang chủ
                        </Link>
                    </li>
                    <li>
                        <Link href="/men" className="py-3 inline-block w-full">
                            Nam
                        </Link>
                    </li>
                    <li>
                        <Link href="/women" className="py-3 inline-block w-full">
                            Nữ
                        </Link>
                    </li>
                </ul>
                <div className="flex items-center bg-gray-100 p-2 rounded-xl my-4 py-3">
                    <input
                        type="text"
                        className="outline-none w-full px-4 bg-transparent caret-blue-500 placeholder:font-medium placeholder:text-gray-400 text-[15px]"
                        placeholder="Tìm kiếm sản phẩm ..."
                        autoComplete="false"
                    />
                    <button>
                        <BiSearch size={20} className="opacity-50 mr-2" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default memo(Navbar);
