'use client';

import Footer from '@/components/Footer';
import ImageGallery from '@/components/ImageGallery';
import Navbar from '@/components/Navbar';
import { convertPriceToStringVND } from '@/utils/convertPrice';
import { addToCart } from '@/redux/slices/cartSlice';

import { useRouter } from 'next/navigation';
import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { AiOutlineHeart, AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { upperFirstOfEachWord } from '@/utils/upperFirstOfEachWord';
// import { useQuery } from '@tanstack/react-query';
import { getProductById, getMenProductsByOption } from '@/apis/products.api';
import { ProductType } from '@/types/products.type';
import formatParagraph from '@/utils/formatParagraph';
import { addToFavourite } from '@/redux/slices/favouriteSlice';
import Modal from '@/components/Modal';
import Image from 'next/image';
import Slider from '@/components/Slider';
import { FaMinus, FaPlus } from 'react-icons/fa';

import Link from 'next/link';

interface SizeObj {
    id: number;
    size: string;
}

const sizes: SizeObj[] = [
    {
        id: 1,
        size: '35.5',
    },
    {
        id: 2,
        size: '36',
    },
    {
        id: 3,
        size: '36.5',
    },
    {
        id: 4,
        size: '37',
    },
    {
        id: 5,
        size: '37.5',
    },
    {
        id: 6,
        size: '38',
    },
    {
        id: 7,
        size: '38.5',
    },
    {
        id: 8,
        size: '39',
    },
    {
        id: 9,
        size: '39.5',
    },
    {
        id: 10,
        size: '40',
    },
    {
        id: 11,
        size: '40.5',
    },
    {
        id: 12,
        size: '41',
    },
    {
        id: 13,
        size: '41.5',
    },
    {
        id: 14,
        size: '42',
    },
    {
        id: 15,
        size: '42.5',
    },
    {
        id: 16,
        size: '43',
    },
];

const initialProductData = {
    id: '',
    color: '',
    description: '',
    gender_type: '',
    images: [
        '/images/products/nike_air_zoom_pegasus_35/d_1.png',
        '/images/products/nike_air_zoom_pegasus_35/d_2.png',
        '/images/products/nike_air_zoom_pegasus_35/d_3.png',
        '/images/products/nike_air_zoom_pegasus_35/d_4.png',
        '/images/products/nike_air_zoom_pegasus_35/d_5.png',
        '/images/products/nike_air_zoom_pegasus_35/d_6.png',
    ],
    name: '',
    price: 0,
    quantity: 0,
    status: '',
    brand: {
        id: 0,
        name: '',
        description: '',
    },
    is_discount: false,
    promotion: {
        id: 0,
        name: '',
        percent: '',
    },
    created_at: new Date(),
    updated_at: new Date(),
};

const ProductDetailPage = ({
    params,
}: {
    params: {
        id: string;
    };
}) => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [productData, setProductData] = useState<ProductType>(initialProductData);
    const [id, setId] = useState<string>(params.id);
    // const [name, setName] = useState<string>('Nike Air Zoom Pegasus 35');
    const [size, setSize] = useState<string>('');
    // const [price, setPirce] = useState<number>(2758000);
    // const [color, setColor] = useState<string>('blue');
    const [image, setImage] = useState<string>('');
    // const [status, setStatus] = useState<string>('Còn hàng');
    const [quantity, setQuantity] = useState<number>(0);
    const [imageUrls, setImageUrls] = useState<string[]>([
        '/images/products/nike_air_zoom_pegasus_35/d_1.png',
        '/images/products/nike_air_zoom_pegasus_35/d_2.png',
        '/images/products/nike_air_zoom_pegasus_35/d_3.png',
        '/images/products/nike_air_zoom_pegasus_35/d_4.png',
        '/images/products/nike_air_zoom_pegasus_35/d_5.png',
        '/images/products/nike_air_zoom_pegasus_35/d_6.png',
    ]);
    const [sizesProduct, setSizesProduct] = useState<number[]>([1]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [showDesc, setShowDesc] = useState<boolean>(false);
    const [showHelper, setShowHelper] = useState<boolean>(false);
    const [genderSize, setGenderSize] = useState<string>('male');
    const [sameCategoryProducts, setSameCategoryProducts] = useState<any>([]);

    const handleSetShowDesc = () => {
        setShowDesc((prevState) => !prevState);
    };

    const handleSetShowHelper = () => {
        setShowHelper((prevState) => !prevState);
    };

    const getProduct = useCallback(async () => {
        const { data } = await getProductById(id);
        setProductData(data?.data);
        const sameCategoryProductsRes = await getMenProductsByOption(
            1,
            12,
            data?.data?.category?.name,
        );
        setSameCategoryProducts(sameCategoryProductsRes?.data?.data);
        setImageUrls(data?.data?.images);
        setImage(data?.data?.images[0]);
        setSizesProduct(data?.data?.sizes);
    }, [id]);

    console.log('size product', sizesProduct);
    console.log(
        'sizes',
        sizes.map((value) => value.size),
    );
    console.log(sizesProduct.includes(42));

    useEffect(() => {
        setIsLoading(true);
        getProduct();
        setIsLoading(false);
    }, [getProduct]);

    const dispatch = useDispatch();

    const handlePlusQuantity = () => {
        if (quantity >= 0) {
            setQuantity((prevState) => prevState + 1);
        }
    };

    const handleMinusQuantity = () => {
        if (quantity <= 0) {
            setQuantity(0);
        } else {
            setQuantity((prevState) => prevState - 1);
        }
    };

    const router = useRouter();

    const handleSelectSize = (e: any) => {
        setSize(e?.target?.value);
    };

    const handleAddToCart = () => {
        if (quantity === 0) {
            toast.warn('Vui lòng chọn số lượng');
            return;
        }
        if (size === '') {
            toast.warn('Vui lòng chọn size giày bạn muốn');
            return;
        }

        dispatch(
            addToCart({
                id: id + size,
                product_id: id,
                name: productData.name,
                size,
                price: productData.is_discount
                    ? productData.price * (1 - Number(productData.promotion?.percent))
                    : Number(productData.price),
                color: productData.color,
                image,
                quantity,
            }),
        );

        toast.success('Đã thêm vào giỏ hàng');
    };

    const handleAddToFavourite = () => {
        dispatch(
            addToFavourite({
                name: productData.name,
                price: productData.is_discount
                    ? productData.price * (1 - Number(productData.promotion?.percent))
                    : Number(productData.price),
                color: productData.color,
                id,
                image,
            }),
        );
        toast.success('Đã thêm vào mục yêu thích');
    };

    const handleGenderSizeChange = (e: any) => {
        setGenderSize(e.target.value);
    };

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
                        className="cursor-pointer text-[#2c6ecb]"
                    >
                        Home
                    </span>
                    <span>/</span>
                    <span
                        onClick={() => router.push(`/${productData.gender_type}`)}
                        className="cursor-pointer text-[#2c6ecb]"
                    >
                        {upperFirstOfEachWord(productData.gender_type)}
                    </span>
                    <span>/</span>
                    <span>{productData.name}</span>
                </div>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2 max-md:px-4 mb-8">
                    <div className="flex gap-4 max-md:flex-col-reverse">
                        <ImageGallery imageUrls={imageUrls} />
                    </div>
                    <div className="px-16 max-sm:px-0 flex-1 bg-white">
                        <div className="flex flex-col gap-2 text-[#3A3A3A]">
                            <h3 className="text-[26px] max-md:text-[22px] font-semibold leading-8 tracking-wide ">
                                {productData.name}
                            </h3>
                            <div className="flex items-center gap-x-3">
                                <h4 className="text-lg max-md:text-base font-medium">{`Men's Shoes`}</h4>
                                <span>|</span>
                                <h4 className="text-lg max-md:text-base font-medium">
                                    Thương hiệu:{' '}
                                    <span
                                        onClick={() =>
                                            router.push(`${productData.brand.name.toLowerCase()}`)
                                        }
                                        className="hover:underline transition-colors cursor-pointer"
                                    >
                                        {productData.brand.name}
                                    </span>
                                </h4>
                            </div>
                        </div>
                        <div className="pt-4 pb-2 flex text-[#3A3A3A]">
                            <h4
                                className={`inline-block max-md:text-base text-lg font-medium ${
                                    productData.is_discount ? 'line-through' : ''
                                }`}
                            >
                                {convertPriceToStringVND(Number(productData.price))}
                            </h4>
                            <h4 className="inline-block text-sm font-light">đ</h4>
                            {productData && productData.is_discount && (
                                <div className="ml-3 flex text-red-500">
                                    <h4 className="inline-block max-md:text-base text-lg font-medium">
                                        {convertPriceToStringVND(
                                            productData.price *
                                                (1 - Number(productData.promotion?.percent)),
                                        )}
                                    </h4>
                                    <h4 className="inline-block text-sm font-light">đ</h4>
                                </div>
                            )}
                        </div>
                        <div className="mt-1 flex items-center justify-between text-base max-md:text-sm text-gray-500">
                            <h4>Trình trạng: {productData.status}</h4>
                            <h4>Màu sắc: {upperFirstOfEachWord(productData.color)}</h4>
                        </div>
                        <div className="mt-5 px-1 flex items-center justify-between border border-gray-400 w-[150px] rounded-md overflow-hidden">
                            <button
                                onClick={handleMinusQuantity}
                                style={{
                                    borderRight: '1px solid #ccc',
                                }}
                                className="py-3 max-md:py-2 px-2"
                                type="button"
                            >
                                <AiOutlineMinus size={16} />
                            </button>
                            <input
                                type="number"
                                id="quantity"
                                name="quantity"
                                value={quantity}
                                onChange={() => {}}
                                readOnly={true}
                                style={{
                                    appearance: 'textfield',
                                }}
                                className="py-3 px-2 inline-block w-full text-center"
                            />
                            <button
                                onClick={handlePlusQuantity}
                                style={{
                                    borderLeft: '1px solid #ccc',
                                }}
                                className="py-3 max-md:py-2 px-2"
                                type="button"
                            >
                                <AiOutlinePlus size={16} />
                            </button>
                        </div>
                        <div className="mt-16 max-md:mt-10 flex justify-between items-center text-base">
                            <h4 className="font-medium tracking-wide">Chọn Size</h4>

                            <h4
                                onClick={() => setShowModal(true)}
                                className="font-medium tracking-wide text-gray-500 cursor-pointer border-b-[1px] border-transparent hover:border-gray-500"
                            >
                                Hướng dẫn chọn size
                            </h4>
                        </div>
                        <div className="mt-5">
                            <div className="grid grid-cols-3 max-sm:grid-cols-2 gap-2">
                                {sizes &&
                                    sizes.length > 0 &&
                                    sizes
                                        .map((value) => value.size)
                                        .map((item, index) => {
                                            return sizesProduct.includes(Number(item)) ? (
                                                <input
                                                    onClick={handleSelectSize}
                                                    key={index}
                                                    type="text"
                                                    id={item}
                                                    name={item}
                                                    defaultValue={item}
                                                    readOnly={true}
                                                    className="px-6 py-4 cursor-pointer flex items-center justify-center rounded-md border border-gray-300 hover:border-gray-600 text-center"
                                                    placeholder={item}
                                                />
                                            ) : (
                                                <div
                                                    onClick={() => {
                                                        toast.warning('Hiện tại đã hết size này');
                                                    }}
                                                    key={index}
                                                    id={item}
                                                    className="px-6 py-4 sold_out cursor-not-allowed opacity-50 flex items-center justify-center rounded-md border border-gray-300 hover:border-gray-600 text-center"
                                                    placeholder={item}
                                                >
                                                    {item}
                                                </div>
                                            );
                                        })}
                            </div>
                        </div>
                        <div className="mt-5 flex flex-col gap-4">
                            <button
                                onClick={handleAddToCart}
                                type="button"
                                className="py-6 px-8 max-md:py-4 text-center text-white bg-[#3a3a3a] rounded-3xl text-lg hover:opacity-80 transition"
                            >
                                <span>Thêm vào giỏ hàng</span>
                            </button>
                            <button
                                onClick={handleAddToFavourite}
                                type="button"
                                className="flex justify-center max-md:py-4 items-center gap-2 py-6 px-8 text-center rounded-3xl text-lg border border-gray-300 hover:border-gray-500 transition"
                            >
                                <span>Favourite</span>
                                <span>
                                    <AiOutlineHeart size={18} />
                                </span>
                            </button>
                        </div>
                        <div className="mt-8 leading-7">
                            <div
                                onClick={handleSetShowDesc}
                                className="cursor-pointer relative flex items-center justify-between gap-3 font-medium text-[22px] max-md:text-base border-b-[1px] py-2 border-gray-300"
                            >
                                <h4>Thông tin sản phẩm</h4>
                                {!showDesc ? <FaPlus size={18} /> : <FaMinus size={18} />}
                            </div>
                            <div
                                className={`${
                                    showDesc ? 'mt-3' : 'h-0 invisible opacity-0'
                                }  transition-all ease-in text-lg max-md:text-sm`}

                                // className="hover:translate-y-0 hover:opacity-100 transition-all translate-y-[-100%] opacity-0"
                            >
                                <p>{formatParagraph(productData.description)}</p>
                            </div>
                        </div>
                        <div className="mt-8 leading-7">
                            <div
                                onClick={handleSetShowHelper}
                                className="cursor-pointer relative flex items-center justify-between gap-3 font-medium text-[22px] max-md:text-base border-b-[1px] py-2 border-gray-300"
                            >
                                <h4>Chính sách bảo hành</h4>
                                {!showHelper ? <FaPlus size={18} /> : <FaMinus size={18} />}
                            </div>
                            <div
                                className={`${
                                    showHelper ? 'mt-[12px]' : 'h-0 invisible opacity-0'
                                }  transition-all text-lg max-md:text-sm`}
                            >
                                <Link href={'/help'} className="cursor-pointer">
                                    Xem chính sách bảo hành tại đây
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-5 max-sm:px-4">
                    <div className="py-3 flex flex-col gap-1 items-center justify-center">
                        <h3 className="text-[26px] max-sm:text-lg uppercase font-medium">
                            Sản phẩm liên quan
                        </h3>
                        <div className="flex gap-3 items-center justify-center">
                            <div className="h-[2px] w-[45px] bg-black"></div>
                            <span className="text-base font-bold">{`///`}</span>
                            <div className="h-[2px] w-[45px] bg-black"></div>
                        </div>
                        <div className="w-full h-fit">
                            <Slider products={sameCategoryProducts} />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            <Modal onClose={() => setShowModal(false)} isVisible={showModal}>
                <div className="flex flex-col gap-3 items-center justify-center">
                    <div className="w-[400px] max-sm:w-full rounded-[12px] text-lg max-sm:text-sm text-white bg-[#4b5160] py-[16px] flex items-center justify-center">
                        <span>Bảng size</span>
                    </div>
                    <div className="mt-3 w-full h-[500px] overflow-y-scroll">
                        <div className="mr-auto max-sm:w-[150px]">
                            <select
                                name="gender_size"
                                className="border-2 focus:border-gray-400 focus:outline-none py-3 px-5 w-[150px] max-sm:w-full overflow-hidden cursor-pointer rounded-lg border-gray-400"
                                id="gender_size"
                                value={genderSize}
                                onChange={handleGenderSizeChange}
                            >
                                <option value="male" defaultChecked>
                                    Nam
                                </option>
                                <option value="female">Nữ</option>
                            </select>
                        </div>
                        <div className="mt-5 px-[12px]">
                            {genderSize === 'male' && (
                                <Image
                                    alt="size_chart"
                                    height={0}
                                    width={0}
                                    sizes="100vw"
                                    src={'/images/men_shoe_size.png'}
                                    className="object-cover w-full h-[600px] max-sm:h-[400px]"
                                />
                            )}
                            {genderSize === 'female' && (
                                <Image
                                    alt="size_chart"
                                    height={0}
                                    width={0}
                                    sizes="100vw"
                                    src={'/images/women_shoe_size.png'}
                                    className="object-cover w-full h-[600px] max-sm:h-[400px]"
                                />
                            )}
                        </div>
                    </div>
                </div>
            </Modal>
        </Fragment>
    );
};

export default ProductDetailPage;
