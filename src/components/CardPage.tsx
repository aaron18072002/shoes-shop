import React from 'react';
import Image from 'next/image';
import Button from './Button';
import Link from 'next/link';

interface CardPageProps {
    title: string;
    desc: string;
    image: string;
    href: string;
}

const CardPage: React.FC<CardPageProps> = (props: CardPageProps) => {
    const { title, desc, image, href } = props;

    return (
        <div>
            <div className="text-center max-md:h-[571px] h-[350px]">
                <Image
                    src={image}
                    alt="banner"
                    width="0"
                    height="0"
                    sizes="100vw"
                    className="w-full h-full object-cover"
                />
            </div>
            <h3 className="my-2 uppercase tracking-wider text-[20px] font-normal">
                {title + ' shoes collection'}
            </h3>
            <div className="mt-2 mb-4">
                <p className="text-base text-gray-500">{desc}</p>
            </div>
            <div className="mt-auto">
                <Button className="uppercase mt-auto inline-block">
                    <Link href={href}>
                        <span>{'shop ' + title}</span>
                    </Link>
                </Button>
            </div>
        </div>
    );
};

export default CardPage;
