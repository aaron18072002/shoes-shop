'use client';

import React from 'react';
// import { BsTwitter } from 'react-icons/bs';
// import { BiLogoFacebook } from 'react-icons/bi';
// import { TfiYoutube } from 'react-icons/tfi';
// import { ImInstagram } from 'react-icons/im';
// import { FaLocationDot } from 'react-icons/fa6';
import { MdOutlineMail } from 'react-icons/md';
import Image from 'next/image';
import { MEDIA_IMAGE_PATH } from '@/constants/common';

interface FooterProps {}

const Footer: React.FC<FooterProps> = (props: FooterProps) => {
    return (
        <footer className="bg-[#333] py-10 max-sm:py-7">
            <div className="max-w-[1280px] mx-auto py-12 flex items-center justify-center">
                <div className="flex flex-col">
                    <h3 className="text-[32px] uppercase text-white font-medium text-center">
                        Contact us
                    </h3>
                    <Image
                        // src={'/images/send_email.png'}
                        src={`${MEDIA_IMAGE_PATH}cee953f5a0c6d52f038059939`}
                        width={0}
                        height={0}
                        alt="send_email"
                        sizes="100vw"
                        className="object-cover w-[500px] h-[450px] max-sm:w-[300px] max-sm:h-[250px]"
                    />
                    <a
                        href="mailto:nguyenthanhanhtp123@gmail.com?subject='Phản hồi từ khách hàng'&body='...'"
                        className="p-3 hover:opacity-70 transition-colors mt-3 cursor-pointer flex gap-2 items-center justify-center bg-white w-[200px] rounded-full mx-auto text-[24px] font-medium text-black"
                    >
                        <span className="uppercase">Gửi</span>
                        <div className="flex ml-[-1px] uppercase">
                            <span className="text-[#38bdf8]">m</span>
                            <span className="text-[#f43f5e]">a</span>
                            <span className="text-[#facc15]">i</span>
                            <span className="text-[#4ade80]">l</span>
                        </div>
                        <span className="text-[30px]">
                            <MdOutlineMail />
                        </span>
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
