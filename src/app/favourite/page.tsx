'use client';

import Navbar from '@/components/Navbar';
import { setFixed } from '@/redux/slices/headerSlice';
import React, { useEffect } from 'react';
import { MdOutlineKeyboardBackspace } from 'react-icons/md';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import FavouriteCard from '@/components/FavouriteCard';
import Footer from '@/components/Footer';

interface FavouritePageProps {}

type FavouriteProduct = {
    id: string;
    name: string;
    image: string;
    price: number;
    color: string;
};

const FavouritePage: React.FC<FavouritePageProps> = (props: FavouritePageProps) => {
    const router = useRouter();
    const sticky = useSelector((state: any) => state.header.sticky);
    const favouriteProducts = useSelector((state: any) => state.favourite.favourite);
    console.log(favouriteProducts);

    const dispatch = useDispatch();

    useEffect(() => {
        window.addEventListener('scroll', isSticky);
        return () => {
            window.removeEventListener('scroll', isSticky);
        };
    });

    const isSticky = () => {
        const scrollTop = window.scrollY;
        if (scrollTop >= 250) {
            dispatch(setFixed(true));
        } else {
            dispatch(setFixed(false));
        }
    };

    return (
        <div className="w-full relative">
            <div
                className={`border-b border-gray-300 ${
                    sticky ? 'fixed top-0 w-full bg-white z-10 shadow-md' : ''
                }`}
            >
                <div className="mx-auto px-16 max-sm:px-2">
                    <Navbar />
                </div>
            </div>
            <div className="max-w-[1440px] mx-auto mt-8 max-sm:px-2">
                <div className="flex gap-6 max-md:gap-4 items-center pb-8 border-b-2 drop-shadow-sm">
                    <span className="cursor-pointer" onClick={() => router.push('/')}>
                        <MdOutlineKeyboardBackspace size={22} />
                    </span>
                    <h3 className="text-[24px] font-bold max-sm:text-base uppercase tracking-widest">
                        Your favourite shoes
                    </h3>
                </div>
                <div className="mt-8">
                    <div className="grid grid-cols-4 max-md:grid-cols-2 gap-10 max-sm:gap-6">
                        {favouriteProducts &&
                            favouriteProducts.length > 0 &&
                            favouriteProducts.map((product: FavouriteProduct) => {
                                return (
                                    <FavouriteCard
                                        key={product.id}
                                        id={product.id}
                                        name={product.name}
                                        image={product.image}
                                        color={product.color}
                                        price={product.price}
                                    />
                                );
                            })}
                    </div>
                </div>
                {favouriteProducts.length === 0 && (
                    <div className="px-4">
                        <h4 className="font-medium text-[32px] max-sm:text-[24px] leading-[1.5] ư-full uppercase tracking-wider">
                            my wishlist
                        </h4>
                        <p className="py-2 text-[18px] max-sm:text-sm uppercase">0 items</p>
                        <p className='text-[18px] max-sm:text-sm'>{`You haven't saved any items to your wishlist yet. Start shopping and add your favorite items to your wishlist.`}</p>
                    </div>
                )}
            </div>
            <div className="mt-16">
                <Footer />
            </div>
        </div>
    );
};

export default FavouritePage;
