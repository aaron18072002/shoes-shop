'use client';

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import { IoBagHandleOutline } from 'react-icons/io5';
import { MdAccountCircle, MdOutlineLockReset } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { RiTruckLine } from 'react-icons/ri';
import Image from 'next/image';
import { convertPriceToStringVNDWithD } from '@/utils/convertPrice';
import { jwtDecode } from 'jwt-decode';
import { getCustomerByUserId } from '@/apis/customers.api';
import { getOrdersByCustomerId } from '@/apis/orders.api';
import { getSalesItemsByOrderId } from '@/apis/salesItems.api';
import { getProductById } from '@/apis/products.api';
import convertTimestampToLocalDate from '@/utils/convertTimestampToLocalDate';
import { PiAddressBookBold } from 'react-icons/pi';
import { MEDIA_IMAGE_PATH } from '@/constants/common';

interface PurchasePageProps {}

const PurchasePage: React.FC<PurchasePageProps> = (props: PurchasePageProps) => {
    const [status, setStatus] = useState<string>('pending');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [ordersData, setOrdersData] = useState<any[]>([]);
    const user = useSelector((state: any) => state.user.user);
    const router = useRouter();

    const handleGetOrders = useCallback(async () => {
        const decoded = jwtDecode(user.access_token) as UserDecodedType;
        const customer = await getCustomerByUserId(decoded.userId);
        if (customer?.data?.data?.length === 0) {
            setOrdersData([]);
            return;
        } else {
            const customerId = customer.data?.data?.id;
            const ordersResponse = await getOrdersByCustomerId(status, customerId);
            const orders = ordersResponse?.data?.data;
            // orders.forEach(async (order: any) => {
            //     const salesItems = await getSalesItemsByOrderId(order.id);
            //     const salesItemsData = salesItems?.data?.data;
            //     const data = await Promise.all(
            //         salesItemsData.map(async (item: any) => {
            //             const productId = item.product_id;
            //             const productResponse = await getProductById(productId);
            //             const productData = productResponse?.data?.data;
            //             return {
            // image: productData.images[0],
            // size: item.size,
            // quantity: item.quantity,
            // price: item.price,
            // name: productData.name,
            // color: productData.color,
            //             };
            //         }),
            //     );
            // });
            const orderData = await Promise.all(
                orders.map(async (order: any) => {
                    const salesItems = await getSalesItemsByOrderId(order.id);
                    const salesItemsData = salesItems?.data?.data;
                    const productDetails = await Promise.all(
                        salesItemsData.map(async (item: any) => {
                            const productId = item.product_id;
                            const productResponse = await getProductById(productId);
                            const productData = productResponse?.data?.data;
                            return {
                                id: productData.id,
                                image: productData.images[0],
                                size: item.size,
                                quantity: item.quantity,
                                price: item.price,
                                name: productData.name,
                                color: productData.color,
                            };
                        }),
                    );
                    return {
                        id: order.id,
                        navigate_id: productDetails[0].id,
                        total_price: order.total_amount,
                        created_at: order.created_at,
                        salesItems: productDetails,
                    };
                }),
            );
            setOrdersData(orderData);
        }
    }, [status, user]);

    useEffect(() => {
        handleGetOrders();
    }, [handleGetOrders]);

    const handleSetStatus = (status: string) => {
        setStatus(status);
    };

    return (
        <div className="overflow-x-hidden">
            <div className={`border-b border-gray-300`}>
                <div className="max-w-[1400px] mx-auto px-2">
                    <Navbar />
                </div>
            </div>
            <div className="bg-gray-100 max-sm:px-3">
                <div className="max-w-[1280px] mx-auto py-8 max-sm:py-3">
                    <div className="flex gap-1 items-center mb-9 max-sm:mb-3">
                        <span>Home</span>
                        <span>/</span>
                        <span className="text-[#2c6ecb]">Đơn hàng của tôi</span>
                    </div>
                    <div className="flex max-sm:flex-col gap-8 max-sm:gap-3 justify-center">
                        <div className="w-[230px] h-fit max-sm:w-full flex flex-col gap-1 mt-3 text-base bg-white py-3 px-5 max-sm:py-5 max-sm:px-7 rounded-md shadow-md cursor-pointer">
                            <div className="py-2 text-lg font-medium">
                                <span>{`Xin chào, ${user.name}`}</span>
                            </div>
                            <div
                                style={{
                                    borderBottom: '1px solid #ccc',
                                }}
                                onClick={() => router.push('/account')}
                                className="flex gap-3 items-center py-3 hover:text-[#2c6ecb] transition-colors"
                            >
                                <span>
                                    <MdAccountCircle size={24} />
                                </span>
                                <span>Hồ sơ tài khoản</span>
                            </div>
                            <div
                                style={{
                                    borderBottom: '1px solid #ccc',
                                }}
                                onClick={() => router.push('/account/customer')}
                                className="flex gap-3 items-center py-3 hover:text-[#2c6ecb] transition-colors"
                            >
                                <span>
                                    <PiAddressBookBold size={24} />
                                </span>
                                <span>Hồ sơ khách hàng</span>
                            </div>
                            <div
                                style={{
                                    borderBottom: '1px solid #ccc',
                                }}
                                onClick={() => router.push('/account/change-password')}
                                className="flex gap-3 items-center py-3 hover:text-[#2c6ecb] transition-colors"
                            >
                                <span>
                                    <MdOutlineLockReset size={24} />
                                </span>
                                <span>Đổi mật khẩu</span>
                            </div>
                            <div
                                onClick={() => router.push('/account/purchase')}
                                className="flex gap-3 items-center py-3 hover:text-[#2c6ecb] transition-colors"
                            >
                                <span>
                                    <IoBagHandleOutline size={24} />
                                </span>
                                <span>Đơn hàng của tôi</span>
                            </div>
                        </div>
                        <div className="flex-1">
                            <div className="w-full h-full px-7 py-3 max-sm:py-5 max-sm:px-0">
                                <div className="w-full bg-white rounded-md shadow-md mb-7">
                                    <div className="flex max-sm:flex-col items-center text-lg max-sm:text-sm cursor-pointer">
                                        <div
                                            onClick={() => handleSetStatus('pending')}
                                            className={`px-10 py-5 flex-1 flex justify-center hover:text-[#ee4d2d] transition-colors border-b max-sm:w-full ${
                                                status === 'pending' ? 'border-[#ee4d2d]' : ''
                                            }`}
                                        >
                                            Chờ xác nhận
                                        </div>
                                        <div
                                            onClick={() => handleSetStatus('processing')}
                                            className={`px-10 py-5 flex-1 flex justify-center hover:text-[#ee4d2d] transition-colors border-b max-sm:w-full ${
                                                status === 'processing' ? 'border-[#ee4d2d]' : ''
                                            }`}
                                        >
                                            Đang giao
                                        </div>
                                        <div
                                            onClick={() => handleSetStatus('delivered')}
                                            className={`px-10 py-5 flex-1 flex justify-center hover:text-[#ee4d2d] transition-colors border-b max-sm:w-full ${
                                                status === 'delivered' ? 'border-[#ee4d2d]' : ''
                                            }`}
                                        >
                                            Hoàn thành
                                        </div>
                                        <div
                                            onClick={() => handleSetStatus('cancelled')}
                                            className={`px-10 py-5 flex-1 flex justify-center hover:text-[#ee4d2d] transition-colors border-b max-sm:w-full ${
                                                status === 'cancelled' ? 'border-[#ee4d2d]' : ''
                                            }`}
                                        >
                                            Đã hủy
                                        </div>
                                    </div>
                                </div>
                                {ordersData.length === 0 && (
                                    <div className="w-full py-[300px] max-sm:py-[150px] bg-white rounded-md shadow-md overflow-hidden mb-5">
                                        <div className="flex flex-col items-center justify-center gap-5">
                                            <Image
                                                width={0}
                                                height={0}
                                                sizes="100vw"
                                                alt="product_img"
                                                // src={'/images/chuacodonhang.png'}
                                                src={`${MEDIA_IMAGE_PATH}cee953f5a0c6d52f038059931`}
                                                className="object-cover w-[100px] h-[100px] max-sm:w-[60px] max-sm:h-[60px]"
                                            />
                                            <h4>Chưa có đơn hàng</h4>
                                        </div>
                                    </div>
                                )}
                                {ordersData &&
                                    ordersData.length > 0 &&
                                    ordersData.map((order: any) => {
                                        return (
                                            <div
                                                key={order.id}
                                                className="w-full bg-white rounded-md shadow-md overflow-hidden mb-5"
                                            >
                                                <div
                                                    style={{
                                                        borderBottom: '1px solid #ccc',
                                                    }}
                                                    className="py-5 px-7 max-sm:py-3 max-sm:px-5 flex max-sm:flex-col max-sm:gap-3 items-center justify-between text-base max-sm:text-[12px] shadow"
                                                >
                                                    <span>{`Ngày đặt: ${convertTimestampToLocalDate(
                                                        order.created_at,
                                                    )}`}</span>
                                                    <div className="flex items-center gap-3">
                                                        {status !== 'cancelled' && (
                                                            <div className="flex items-center gap-2 text-[#16a34a]">
                                                                <span>
                                                                    <RiTruckLine size={20} />
                                                                </span>
                                                                <span>
                                                                    {status === 'pending'
                                                                        ? 'Đơn hàng đang chờ được xác nhận'
                                                                        : status === 'processing'
                                                                        ? 'Đơn hàng đang tiến hành giao đến bạn'
                                                                        : 'Đơn hàng đã được giao thành công'}
                                                                </span>
                                                            </div>
                                                        )}
                                                        {status !== 'cancelled' && <span>|</span>}
                                                        <span className="text-[#ee4d2d]">
                                                            {status !== 'cancelled'
                                                                ? 'Hoàn thành'
                                                                : 'Đơn hàng đã bị hủy'}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col text-base max-sm:text-sm border-b-[2px] border-[#d1d5db]">
                                                    {order.salesItems.map((product: any) => {
                                                        return (
                                                            <div
                                                                key={product.id}
                                                                className="flex items-center justify-between border-b-[2px] border-[#f3f4f6] box_order"
                                                            >
                                                                <div className="flex items-center gap-3">
                                                                    <div className="p-5 max-sm:p-2">
                                                                        <Image
                                                                            width={0}
                                                                            height={0}
                                                                            sizes="100vw"
                                                                            alt="product_img"
                                                                            src={product.image}
                                                                            className="object-cover w-[100px] h-[100px] max-sm:w-[60px] max-sm:h-[60px]"
                                                                        />
                                                                    </div>
                                                                    <div className="flex items-center gap-1">
                                                                        <div className="py-2 px-3 max-sm:py-1 max-sm:px-2 bg-[#1e293b] rounded-md text-white text-sm max-sm:text-[12px]">{`Size: ${product.size}`}</div>
                                                                        <span>x</span>
                                                                        <span>
                                                                            {product.quantity}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                                <div className="flex-1 p-5 max-sm:p-2">
                                                                    <div className="flex flex-col items-end gap-2 max-sm:gap-1 justify-between font-medium text-base max-sm:text-[12px]">
                                                                        <h4 className="text-lg uppercase max-sm:text-[12px]">
                                                                            {product.name}
                                                                        </h4>
                                                                        <h4>
                                                                            {convertPriceToStringVNDWithD(
                                                                                Number(
                                                                                    product.price,
                                                                                ),
                                                                            )}
                                                                        </h4>
                                                                        <h4>{`Color: ${product.color}`}</h4>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                                <div className="py-5 px-5 bg-[#fffbeb]">
                                                    <div className="flex items-center justify-between">
                                                        <div
                                                            onClick={() =>
                                                                router.push(
                                                                    `http://localhost:3000/${order.navigate_id}`,
                                                                )
                                                            }
                                                            className="py-2 px-7 border border-b-[3px]  border-r-[3px]  border-[#404040] rounded-full bg-[#fde68a] hover:text-[#d97706] hover:bg-white transition-colors font-bold text-base max-sm:text-sm cursor-pointer"
                                                        >
                                                            <span>Mua Lại</span>
                                                        </div>
                                                        <div className="flex-1 flex items-center justify-end gap-1 text-base max-sm:text-sm font-medium">
                                                            <span>Thành tiền:</span>
                                                            <span>
                                                                {convertPriceToStringVNDWithD(
                                                                    Number(order.total_price),
                                                                )}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </div>
    );
};

export default PurchasePage;
