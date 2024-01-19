'use client';

import Navbar from '@/components/Navbar';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HiArrowLongRight } from 'react-icons/hi2';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';

import { convertPriceToStringVNDWithD } from '@/utils/convertPrice';
import { decrementQuantity, incrementQuantity, removeItem } from '@/redux/slices/cartSlice';
import { upperFirstOfEachWord } from '@/utils/upperFirstOfEachWord';

interface CartPageProps {}

const CartPage: React.FC<CartPageProps> = (props: CartPageProps) => {
    const dispatch = useDispatch();
    const cart = useSelector((state: any) => state.cart.cart);

    let totalPrice = 0;
    cart.forEach((item: any) => {
        totalPrice += item.price * item.quantity;
    });

    const handleRemoveItem = (id: string) => {
        dispatch(removeItem(id));
    };

    const handlePlusQuantity = (id: string) => {
        dispatch(incrementQuantity(id));
    };

    const handleMinusQuantity = (id: string) => {
        dispatch(decrementQuantity(id));
    };

    const isLogging = localStorage.getItem('access_token');

    return (
        <section>
            <div className={`border-b border-gray-300`}>
                <div className="max-w-[1400px] mx-auto px-2">
                    <Navbar />
                </div>
            </div>
            <div className="max-w-[1280px] mx-auto my-7 max-md:px-2">
                <div className="flex gap-1 items-center mb-6">
                    <Link className="cursor-pointer text-[#2c6ecb]" href="/">
                        Home
                    </Link>
                    <span>/</span>
                    <span>Giỏ hàng</span>
                </div>
                {cart.length === 0 && (
                    <div className="mt-[150px]">
                        <div>
                            <h2 className="text-center text-[30px] font-light">Shopping cart</h2>
                        </div>
                        <div className="mt-2 text-center">
                            <span className="text-sm font-light">Your cart is empty!</span>
                        </div>
                        <div className="mt-[30px]">
                            <div className="flex w-[250px] items-center hover:opacity-80 transition-colors text-white mx-auto py-2 px-4 bg-[#3a3a3a]  justify-center gap-2">
                                <Link className="uppercase text-base" href="/">
                                    continue shopping
                                </Link>
                                <span>
                                    <HiArrowLongRight size={18} />
                                </span>
                            </div>
                        </div>
                    </div>
                )}
                {cart.length > 0 && (
                    <div className="grid gap-4 grid-cols-4 max-md:grid-cols-1">
                        <div className="col-span-3 max-md:col-span-1">
                            <div>
                                <table className="table-auto w-full">
                                    <thead className="uppercase font-light tracking-wide max-sm:text-sm">
                                        <tr className="leading-8">
                                            <td className="w-[60%] text-left">
                                                <span>product</span>
                                            </td>
                                            <td>price</td>
                                            <td>quantity</td>
                                            <td className="text-right pr-0">total</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cart &&
                                            cart.length > 0 &&
                                            cart.map(
                                                (item: {
                                                    id: string;
                                                    product_id: string;
                                                    name: string;
                                                    size: string;
                                                    color: string;
                                                    price: number;
                                                    image: string;
                                                    quantity: number;
                                                }) => {
                                                    return (
                                                        <tr
                                                            key={item.id}
                                                            style={{
                                                                borderBottom: '1px solid #ccc',
                                                                borderTop: '1px solid #ccc',
                                                            }}
                                                        >
                                                            <td className="py-3">
                                                                <div className="flex justify-start space-x-1">
                                                                    <div>
                                                                        <Image
                                                                            width={0}
                                                                            height={0}
                                                                            sizes="100vw"
                                                                            alt="product_img"
                                                                            src={item.image}
                                                                            className="object-cover w-[100px] h-[100px] max-sm:w-[40px] max-sm:h-[60px]"
                                                                        />
                                                                    </div>
                                                                    <div
                                                                        style={{
                                                                            marginLeft: '12px',
                                                                        }}
                                                                        className=""
                                                                    >
                                                                        <Link
                                                                            className="font-medium hover:underline max-md:text-sm transition"
                                                                            href={`/${item.product_id}`}
                                                                        >
                                                                            {item.name}
                                                                        </Link>
                                                                        <div className="flex flex-col text-sm font-light">
                                                                            <div className="flex gap-1">
                                                                                <span>Size:</span>
                                                                                <span>
                                                                                    {item.size}
                                                                                </span>
                                                                            </div>
                                                                            <div>
                                                                                <div className="flex gap-1">
                                                                                    <span>
                                                                                        Color:
                                                                                    </span>
                                                                                    <span>
                                                                                        {upperFirstOfEachWord(
                                                                                            item.color,
                                                                                        )}
                                                                                    </span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <button
                                                                            onClick={() =>
                                                                                handleRemoveItem(
                                                                                    item.id,
                                                                                )
                                                                            }
                                                                            className="py-2 mt-2 px-4 rounded-md bg-red-500 hover:bg-red-400 transition text-white"
                                                                        >
                                                                            Remove
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="text-sm font-light py-3">
                                                                <span>
                                                                    {convertPriceToStringVNDWithD(
                                                                        item.price,
                                                                    )}
                                                                </span>
                                                            </td>
                                                            <td className="py-3">
                                                                <div className="px-1 flex items-center justify-between border border-gray-400 w-[100px] max-md:text-center max-md:w-[80px] text-sm font-light rounded-md overflow-hidden">
                                                                    <button
                                                                        onClick={() =>
                                                                            handleMinusQuantity(
                                                                                item.id,
                                                                            )
                                                                        }
                                                                        style={{
                                                                            borderRight:
                                                                                '1px solid #ccc',
                                                                        }}
                                                                        className="py-1 max-md:py-2 px-1"
                                                                        type="button"
                                                                    >
                                                                        <AiOutlineMinus size={14} />
                                                                    </button>
                                                                    <input
                                                                        type="number"
                                                                        id="quantity"
                                                                        name="quantity"
                                                                        value={item.quantity}
                                                                        onChange={() => {}}
                                                                        readOnly={true}
                                                                        style={{
                                                                            appearance: 'textfield',
                                                                        }}
                                                                        className="py-2 max-md:py-1 px-1 inline-block w-full text-center text-sm"
                                                                    />
                                                                    <button
                                                                        onClick={() =>
                                                                            handlePlusQuantity(
                                                                                item.id,
                                                                            )
                                                                        }
                                                                        style={{
                                                                            borderLeft:
                                                                                '1px solid #ccc',
                                                                        }}
                                                                        className="py-1 max-md:py-2 px-1"
                                                                        type="button"
                                                                    >
                                                                        <AiOutlinePlus size={14} />
                                                                    </button>
                                                                </div>
                                                            </td>
                                                            <td className="text-sm font-light text-right py-3">
                                                                <span>
                                                                    {convertPriceToStringVNDWithD(
                                                                        item.price * item.quantity,
                                                                    )}
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    );
                                                },
                                            )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="col-span-1 max-md:col-span-1 px-6 max-md:px-2">
                            <div className="sumary">
                                <div className="grid grid-cols-1 gap-4">
                                    <h4 className="text-[24px] text-[#3a3a3a] font-light">
                                        Order sumary
                                    </h4>
                                    <div className="flex items-center justify-between text-sm font-light">
                                        <h4>Thành tiền:</h4>
                                        <div className="flex items-center gap-1">
                                            <span>{convertPriceToStringVNDWithD(totalPrice)}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between text-sm font-light">
                                        <span>
                                            Vui lòng kiểm tra chi tiết hóa đơn và thanh toán tại đây
                                        </span>
                                    </div>
                                    <div
                                        className={`rounded-md max-w-[120px] text-center py-2 px-4 uppercase bg-[#3a3a3a] text-white hover:opacity-80 transition-colors ${
                                            isLogging ? '' : 'opacity-80 cursor-not-allowed'
                                        }`}
                                    >
                                        <Link
                                            className={`${
                                                isLogging ? '' : 'opacity-80 cursor-not-allowed'
                                            }`}
                                            href={isLogging ? '/checkout' : '/cart'}
                                        >
                                            checkout
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex mt-5 text-base font-semibold flex-col gap-y-2">
                            <h4>Nhập mã giảm giá</h4>
                            <div className="flex gap-x-2 font-normal">
                                <input
                                    type="text"
                                    id="coupon"
                                    name="coupon"
                                    placeholder="Enter coupon code"
                                    className="p-3 border border-gray-300 rounded placeholder:text-sm placeholder:font-light"
                                />
                                <button
                                    className="py-3 px-5 rounded hover:opacity-80 transition-colors text-white text-sm bg-[#3a3a3a]"
                                    type="button"
                                >
                                    Apply
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default CartPage;
