import { removeItem } from '@/redux/slices/favouriteSlice';
import { convertPriceToStringVNDWithD } from '@/utils/convertPrice';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { IoClose } from 'react-icons/io5';
import { useDispatch } from 'react-redux';

interface FavouriteCardProps {
    id: string;
    image: string;
    name: string;
    price: number;
    color: string;
}

const FavouriteCard: React.FC<FavouriteCardProps> = (props: FavouriteCardProps) => {
    const dispatch = useDispatch();

    const handleRemoveFromFavourite = (id: string) => {
        dispatch(removeItem(id));
    };

    return (
        <div className="h-[428px] max-sm:h-[300px] relative rounded-md shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.18)] hover:shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.28)] transition-shadow">
            <div className="absolute top-[4%] right-[4%] cursor-pointer pointer z-10">
                <span
                    onClick={() => handleRemoveFromFavourite(props.id)}
                    className="cursor-pointer"
                >
                    <IoClose size={24} />
                </span>
            </div>
            <div className="relative flex items-center justify-center overflow-hidden max-sm:px-3 px-10 py-12 max-sm:py-8">
                <Image
                    width={0}
                    height={0}
                    src={props.image}
                    sizes="100vw"
                    alt="product_card"
                    className="object-cover w-[85%] h-[180px] max-sm:w-[85%] max-sm:h-[85px]"
                />
            </div>
            <div className="p-4 uppercase text-[16px] max-sm:text-sm text-[#3A3A3A] font-bold">
                <Link href={`/${props.id}`} className="cursor-pointer hover:underline transition">
                    {props.name}
                </Link>
                <span className="block my-3 opacity-40">{props.color}</span>
                <span className="opacity-40">{convertPriceToStringVNDWithD(props.price)}</span>
            </div>
        </div>
    );
};

export default FavouriteCard;
