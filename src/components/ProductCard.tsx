import { getPromotionById } from '@/apis/products.api';
import { addToFavourite } from '@/redux/slices/favouriteSlice';
import { convertPriceToStringVNDWithD } from '@/utils/convertPrice';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import { FaHeart, FaEye } from 'react-icons/fa';
import { BsFillHeartFill } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

interface ProductCardProps {
    title: string;
    image: string;
    image2?: string;
    price: number;
    id: string;
    des?: string;
    color: string;
    is_discount?: boolean;
    promotionId?: number | null;
}

interface PromotionData {
    id: number;
    name: string;
    start_date: string;
    end_date: string;
    percent: string;
}

const ProductCard: React.FC<ProductCardProps> = (props: ProductCardProps) => {
    const { title, image, price, id, color, is_discount, promotionId, image2 } = props;
    const [imageUrl, setImageUrl] = useState<string>(image);
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [promotionInf, setPromotionInf] = useState<PromotionData>({
        id: 1,
        name: '',
        start_date: '',
        end_date: '',
        percent: '',
    });
    const dispatch = useDispatch();

    const router = useRouter();

    const handleMouseOver = () => {
        setIsHovered(true);
        setImageUrl(image2 as string);
    };
    const handleMouseOut = () => {
        setIsHovered(false);
        setImageUrl(image);
    };

    const handleGetPromotion = useCallback(async (id: number) => {
        const data = await getPromotionById(id);
        console.log(data?.data?.data);
        setPromotionInf(data?.data?.data as PromotionData);
    }, []);

    useEffect(() => {
        if (is_discount) {
            handleGetPromotion(promotionId as number);
        }
    }, [is_discount, handleGetPromotion, promotionId]);

    const handleAddToFavorite = () => {
        dispatch(
            addToFavourite({
                id,
                image,
                price: Number(price),
                name: title,
                color,
            }),
        );
        toast.success('Đã thêm vào mục yêu thích');
    };

    return (
        <div className="max-h-[400px] text-[#3a3a3a] h-fit relative">
            <div
                onMouseMove={handleMouseOver}
                onMouseOut={handleMouseOut}
                className="card_product relative flex flex-col items-center hover:opacity-75 overflow-hidden transition rounded-md bg-gradient-to-br from-[#fafafa] to-[#e4e4e7] shadow-md"
            >
                <Image
                    width={0}
                    height={0}
                    src={imageUrl}
                    sizes="100vw"
                    alt="product_card"
                    priority={false}
                    className={`object-cover w-[280px] h-[295px] max-sm:w-[200px] max-sm:h-[200px] ${
                        isHovered ? 'scale-75' : ''
                    }  transition-all`}
                />
                <div className="action_bar mx-auto flex items-center justify-center bg-white rounded-lg overflow-hidden shadow cursor-pointer">
                    <div className="p-4 max-sm:p-3 hover:bg-black hover:text-white transition-colors border-r-[1px] border-gray-200">
                        <BsFillHeartFill onClick={handleAddToFavorite} size={20} />
                    </div>
                    <div
                        onClick={() => router.push(id)}
                        className="p-4 max-sm:p-3 hover:bg-black hover:text-white transition-colors"
                    >
                        <FaEye size={20} />
                    </div>
                </div>
            </div>
            <div className="mt-3 flex flex-col justify-between">
                <div className="mb-1 mt-3">
                    <Link href={`/${id}`}>
                        <span className="text-lg max-md:text-base font-semibold hover:underline transition">
                            {title}
                        </span>
                    </Link>
                </div>
                <div className="flex-1 flex gap-3">
                    <span
                        className={`text-base max-md:text-sm font-semibold ${
                            is_discount ? 'line-through' : ''
                        }`}
                    >
                        {convertPriceToStringVNDWithD(price)}
                    </span>
                    {is_discount && (
                        <span className={`text-base text-red-500 max-md:text-sm font-semibold `}>
                            {convertPriceToStringVNDWithD(
                                price * (1 - Number(promotionInf.percent)),
                            )}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
