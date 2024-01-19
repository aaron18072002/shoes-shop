'use client';

import Image from 'next/image';
import React, { useState, memo } from 'react';
import { BiChevronRight, BiChevronLeft } from 'react-icons/bi';

interface ImageGalleryProps {
    imageUrls: string[];
}

const ImageGallery: React.FC<ImageGalleryProps> = (props: ImageGalleryProps) => {
    const { imageUrls } = props;
    const [selectedImage, setSelectedImage] = useState<number>(0);

    const handlePrevClick = () => {
        if (selectedImage <= 0) {
            setSelectedImage(imageUrls.length);
        }
        setSelectedImage((preState) => preState - 1);
    };

    const handleNextClick = () => {
        if (selectedImage === imageUrls.length - 1) {
            setSelectedImage(-1);
        }
        setSelectedImage((preState) => preState + 1);
    };

    return (
        <div className="flex gap-6">
            <div className="flex flex-col col-span-2 max-md:hidden">
                {imageUrls &&
                    imageUrls.length > 0 &&
                    imageUrls.map((url, index) => {
                        return (
                            <div key={index} className="relative rounded-lg ">
                                <Image
                                    onClick={() => setSelectedImage(index)}
                                    src={url}
                                    width={85}
                                    height={85}
                                    sizes="100vw"
                                    alt={`Image ${index + 1}`}
                                    className={`cursor-pointer rounded-lg h-[85px] w-[85px] mb-3 p-1 bg-gray-100 object-cover ${
                                        selectedImage === index
                                            ? 'border-[1px] border-gray-500'
                                            : 'border-[1px] '
                                    }`}
                                />
                            </div>
                        );
                    })}
            </div>
            <div className="max-h-[600px] flex-1 relative bg-gray-100 rounded-md overflow-hidden">
                <Image
                    src={imageUrls[selectedImage]}
                    width={0}
                    height={0}
                    sizes="100vw"
                    alt=""
                    className="object-cover h-[600px] w-[600px] max-sm:h-[450px] max-sm:p-4 max-sm:w-[450px]"
                />
                <div className="absolute bottom-6 right-5">
                    <div className="flex items-center gap-2">
                        <div
                            onClick={handlePrevClick}
                            className="bg-gray-300 hover:bg-gray-400 transition rounded-full p-1 cursor-pointer"
                        >
                            <BiChevronLeft size={24} />
                        </div>
                        <div
                            onClick={handleNextClick}
                            className="bg-gray-300 hover:bg-gray-400 transition rounded-full cursor-pointer p-1"
                        >
                            <BiChevronRight size={24} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(ImageGallery);
