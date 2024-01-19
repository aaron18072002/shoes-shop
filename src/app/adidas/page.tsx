'use client';

import Navbar from '@/components/Navbar';
import { setFixed } from '@/redux/slices/headerSlice';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdOutlineKeyboardBackspace } from 'react-icons/md';
import { useRouter } from 'next/navigation';

interface AddidasPageProps {}

const AddidasPage: React.FC<AddidasPageProps> = (props: AddidasPageProps) => {
    const router = useRouter();
    const sticky = useSelector((state: any) => state.header.sticky);
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
            <div className="max-w-[1440px] mx-auto mt-5 max-sm:px-2">
                <span className="cursor-pointer" onClick={() => router.push('/')}>
                    <MdOutlineKeyboardBackspace size={18} />
                </span>
            </div>
            <div className="w-full h-auto bg-[#f5f5e5]">
                <div className="max-w-[1440px] mx-auto mt-5">
                    <div className="grid grid-cols-2 gap-6 max-md:grid-cols-1 py-10 max-sm:py-8 max-sm:px-2">
                        <div className="flex flex-col gap-4">
                            <h1 className="font-semibold text-[28px]">
                                STORIES, STYLES AND SPORTSWEAR AT ADIDAS, SINCE 1949
                            </h1>
                            <p className="text-[18px] leading-7 font-light">
                                {`                         
                                    Sport keeps us fit. Keeps you mindful. Brings us together. Through
                                    sport we have the power to change lives. Whether it is through
                                    stories of inspiring athletes. Helping you to get up and get moving.
                                    Sportswear featuring the latest technologies, to up your
                                    performance. Beat your PB.adidas offers a home to the runner, the
                                    basketball player, the soccer kid, the fitness enthusiast. The
                                    weekend hiker that loves to escape the city. The yoga teacher that
                                    spreads the moves. The 3-Stripes are seen in the music scene. On
                                    stage, at festivals. Our sports clothing keeps you focused before
                                    that whistle blows. During the race. And at the finish lines. We're
                                    here to supportcreators. Improve their game. Their lives. And change
                                    the world.
                                    `}
                            </p>
                            <p className="text-[18px] leading-7 font-light">
                                {`adidas is about more than sportswear and workout clothes. We partner
                                with the best in the industry to co-create. This way we offer our
                                fans the sports apparel and style that match their athletic needs,
                                while keeping sustainability in mind. We're here to support
                                creators. Improve their game. Create change. And we think about the
                                impact we have on our world.`}
                            </p>
                        </div>
                        <div className="flex flex-col gap-4">
                            <h1 className="font-semibold text-[28px]">
                                Workout clothes, for any sport
                            </h1>
                            <p className="text-[18px] leading-7 font-light">
                                {`adidas designs for and with athletes of all kinds. Creators, who love to change the game. Challenge conventions. Break the rules and define new ones. Then break them again. We supply teams and individuals with athletic clothing pre-match. To stay focussed. We design sports apparel that get you to the finish line. To win the match. We support women, with bras and tights made for purpose. From low to high support. Maximum comfort. We design, innovate and itterate. Testing new technologies in action. On the pitch, the tracks, the court, the pool. Retro workout clothes inspire new streetwear essentials. Like NMD, Ozweego and our Firebird tracksuits. Classic sports models are brought back to life. Like Stan Smith. And Superstar. Now seen on the streets and the stages.`}
                            </p>
                            <p className="text-[18px] leading-7 font-light">
                                {`Through our collections we blur the borders between high fashion and high performance. Like our adidas by Stella McCartney athletic clothing collection – designed to look the part inside and outside of the gym. Or some of our adidas Originals lifestyle pieces, that can be worn as sportswear too. Our lives are constantly changing. Becoming more and more versatile. And adidas designs with that in mind.`}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddidasPage;
