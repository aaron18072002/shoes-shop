'use client';

import Navbar from '@/components/Navbar';
import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';

import { MdKeyboardArrowRight } from 'react-icons/md';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import InputHook from '@/components/InputHook';
import Image from 'next/image';
import { convertPriceToStringVNDWithD } from '@/utils/convertPrice';
import RadioInput from '@/components/RadioInput';
import { FaShippingFast } from 'react-icons/fa';
import { MdAirlineSeatReclineNormal } from 'react-icons/md';
import { FaHandHoldingUsd } from 'react-icons/fa';
import { jwtDecode } from 'jwt-decode';
import { createCustomer, getCustomerByUserId } from '@/apis/customers.api';
import { createOrder } from '@/apis/orders.api';
import { createSalesItem } from '@/apis/salesItems.api';
import { clearCart } from '@/redux/slices/cartSlice';
import { useRouter } from 'next/navigation';
import { MEDIA_IMAGE_PATH } from '@/constants/common';

interface CheckoutPageProps {}

type UserDecodedType = {
    exp: number;
    iat: number;
    role: number;
    userId: string;
};

const schema = yup.object({
    name: yup
        .string()
        .min(3, 'Tên quá ngắn')
        .max(30, 'Tên của bạn phải ít hơn 30 ký tự')
        .required('Làm ơn điền tên của bạn'),
    phone_number: yup
        .string()
        .max(10, 'Số điện thoại không hợp lệ')
        .required('Vui lòng điền số điện thoại của bạn'),
    address: yup.string().required('Vui lòng nhập địa chỉ nơi bạn sinh sống'),
    city: yup.string().required('Vui lòng chọn thành phố nơi bạn sống'),
    country: yup.string().notOneOf([''], 'Bạn phải lựa chọn đất nước của bạn'),
    discount_code: yup.string(),
    delivery_method: yup.string().required('').oneOf(['fast', 'normal']),
    payment_method: yup.string().required('').oneOf(['cash', 'paypal', 'momo']),
});

const CheckoutPage: React.FC<CheckoutPageProps> = (props: CheckoutPageProps) => {
    const [discount, setDiscount] = useState();
    // const [orderData, setOrderData] = useState({});
    const [priceDelivery, setPriceDelivery] = useState<number>(0);
    // const sticky = useSelector((state: any) => state.header.sticky);
    const user = useSelector((state: any) => state.user.user);

    const dispatch = useDispatch();

    const router = useRouter();

    // console.log(user);

    const cart = useSelector((state: any) => state.cart.cart);

    let totalPrice = 0;
    cart.forEach((item: any) => {
        totalPrice += item.price * item.quantity;
    });

    let totalProducts = 0;
    cart.forEach((item: any) => {
        totalProducts++;
    });

    // const mutation = useMutation({
    //     mutationFn: (data: any) => {
    //         return createCustomer(data);
    //     },
    // });

    const {
        control,
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors, isSubmitting, isValid },
    } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange',
        defaultValues: {
            delivery_method: 'normal',
            payment_method: 'cash',
        },
    });

    const genderWatch = watch('delivery_method');
    const paymentWatch = watch('payment_method');

    const onSubmitHandler = (values: any) => {
        if (!isValid) return 0;
        return new Promise<void>(async (resolve) => {
            setTimeout(async () => {
                resolve();
                const decoded = jwtDecode(user.access_token) as UserDecodedType;
                // check user already has an customer
                const customer = await getCustomerByUserId(decoded.userId);
                console.log(customer);
                if (customer?.data?.msg === 'Cant not find this user') {
                    const customerData = { ...values, user_id: decoded.userId };
                    const customerResponse = await createCustomer(customerData);
                    const customerId = customerResponse?.data?.data?.id;
                    const orderData = {
                        ...values,
                        total_amount: totalPrice + priceDelivery,
                        order_status: 'Chờ xác nhận',
                        customer_id: customerId,
                    };
                    const orderResponse = await createOrder(orderData);
                    const orderId = orderResponse?.data?.data?.id;

                    const salesItemsData = cart.map((item: any) => {
                        return {
                            order_id: orderId,
                            product_id: item.product_id,
                            price: item.price,
                            quantity: item.quantity,
                            size: item.size,
                        };
                    });
                    console.log(salesItemsData);
                    const salesItemResponse = await createSalesItem(salesItemsData);
                    console.log(salesItemResponse);
                    reset({
                        name: '',
                        phone_number: '',
                        address: '',
                        city: '',
                        country: '',
                        delivery_method: '',
                        payment_method: '',
                        discount_code: '',
                    });
                    dispatch(clearCart());
                    router.push('/');
                } else {
                    const customerId = customer.data?.data?.id;
                    const orderData = {
                        ...values,
                        total_amount: totalPrice + priceDelivery,
                        order_status: 'Chờ xác nhận',
                        customer_id: customerId,
                    };
                    const orderResponse = await createOrder(orderData);
                    const orderId = orderResponse?.data?.data?.id;

                    const salesItemsData = cart.map((item: any) => {
                        return {
                            order_id: orderId,
                            product_id: item.product_id,
                            price: item.price,
                            quantity: item.quantity,
                            size: item.size,
                        };
                    });
                    console.log(salesItemsData);
                    const salesItemResponse = await createSalesItem(salesItemsData);
                    console.log(salesItemResponse);
                    reset({
                        name: '',
                        phone_number: '',
                        address: '',
                        city: '',
                        country: '',
                        delivery_method: '',
                        payment_method: '',
                        discount_code: '',
                    });
                    dispatch(clearCart());
                    router.push('/');
                }
            }, 5000);
        });
    };

    // useEffect(() => {
    //     if (mutation.isSuccess) {
    //         const customerId = mutation?.data?.data?.data?.id;
    //         console.log(customerId);
    //         if(customerId) {

    //             setOrderData((prev) => ({ ...prev, customer_id: customerId }));
    //         }
    //     }
    // }, [mutation]);

    const handleSetPriceDelivery = (price: number) => {
        setPriceDelivery(price);
    };

    console.log(totalPrice + priceDelivery);

    return (
        <div className="w-full relative">
            <div
                className={`border-b border-gray-300 fixed top-0 w-full bg-white z-10 shadow-md opacity-95`}
            >
                <div className="max-w-[1400px] mx-auto px-2">
                    <Navbar />
                </div>
            </div>
            <div className="max-w-[1280px] mx-auto mb-7 mt-[110px] max-md:px-2">
                <div className="flex gap-1 items-center mb-6">
                    <Link className="cursor-pointer text-[#2c6ecb]" href="/">
                        Home
                    </Link>
                    <span>/</span>
                    <span>Liên hệ</span>
                </div>
                <div className="flex gap-1 items-center text-sm text-[#3a3a3a]">
                    <span>Thông tin chi tiết</span>
                    <span>
                        <MdKeyboardArrowRight size={12} />
                    </span>
                    <span className="text-[#2c6ecb]">Giao hàng</span>
                    <span>
                        <MdKeyboardArrowRight size={12} />
                    </span>
                    <span className="text-[#2c6ecb]">Thanh toán</span>
                </div>
                <div className="w-full grid grid-cols-2 max-sm:grid-cols-1 gap-3">
                    <div>
                        <div className="mt-6 grid gap-1 grid-cols-4 border border-gray-300 py-3 px-5 text-base">
                            <div className="col-span-1">
                                <span>Tài khoản</span>
                            </div>
                            <div className="col-span-3">
                                <span>{user?.email}</span>
                            </div>
                        </div>
                        <div className="mt-6 text-base text-[#3a3a3a]">
                            <h4 className="text-[20px]">Địa chỉ giao hàng</h4>
                            <form autoComplete="off" onSubmit={handleSubmit(onSubmitHandler)}>
                                <div className="flex flex-col gap-4 mt-3">
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="flex flex-col gap-2">
                                            <label htmlFor="name">Họ tên</label>
                                            <InputHook
                                                id="name"
                                                name="name"
                                                type="text"
                                                className="py-2 px-4 border border-gray-300 rounded placeholder:text-sm"
                                                placeholder="Vui lòng nhập họ tên của bạn"
                                                control={control}
                                            />
                                            {errors.name && (
                                                <div className="text-red-500 text-sm">
                                                    <p>{errors.name.message}</p>
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label htmlFor="name">Số điện thoại</label>
                                            <InputHook
                                                id="phone_number"
                                                name="phone_number"
                                                type="text"
                                                className="py-2 px-4 border border-gray-300 rounded placeholder:text-sm"
                                                placeholder="Vui lòng nhập số điện thoại của bạn"
                                                control={control}
                                            />
                                            {errors.phone_number && (
                                                <div className="text-red-500 text-sm">
                                                    <p>{errors.phone_number.message}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="address">Địa chỉ</label>
                                        <InputHook
                                            id="address"
                                            name="address"
                                            type="text"
                                            className="py-2 px-4 border border-gray-300 rounded placeholder:text-sm"
                                            placeholder="Nhập địa chỉ nơi ở của bạn"
                                            control={control}
                                        />
                                        {errors.address && (
                                            <div className="text-red-500 text-sm">
                                                <p>{errors.address.message}</p>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="city">Thành phố</label>
                                        <InputHook
                                            id="city"
                                            name="city"
                                            type="text"
                                            className="py-2 px-4 border border-gray-300 rounded placeholder:text-sm"
                                            placeholder="Nhập tên thành phố mà bạn sinh sống"
                                            control={control}
                                        />
                                        {errors.address && (
                                            <div className="text-red-500 text-sm">
                                                <p>{errors.city?.message}</p>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="country">Quốc gia</label>
                                        <div className="border border-gray-300 rounded text-sm overflow-hidden">
                                            <select
                                                className="w-full h-full py-3 px-4"
                                                {...register('country')}
                                            >
                                                <option value="" disabled>
                                                    Chọn quốc gia của bạn
                                                </option>
                                                <option value="Việt Nam">Việt Nam</option>
                                                <option value="Hàn quốc">Hàn quốc</option>
                                                <option value="Trung quốc">Trung quốc</option>
                                            </select>
                                        </div>
                                        {/* <InputHook
                                            id="country"
                                            name="country"
                                            type="text"
                                            className="py-2 px-4 border border-gray-300 rounded placeholder:text-sm"
                                            placeholder="Enter your address"
                                            control={control}
                                        /> */}
                                        {errors.address && (
                                            <div className="text-red-500 text-sm">
                                                <p>{errors.country?.message}</p>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex flex-col gap-2 w-[300px] max-sm:w-[200px]">
                                        <label htmlFor="discount_code">Mã giảm giá</label>
                                        <InputHook
                                            id="discount_code"
                                            name="discount_code"
                                            type="text"
                                            className="py-2 px-4 border border-gray-300 rounded placeholder:text-sm"
                                            placeholder="Nhập mã mà bạn có"
                                            control={control}
                                        />
                                        {errors.discount_code && (
                                            <div className="text-red-500 text-sm">
                                                <p>{errors.discount_code.message}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <div className="px-5 py-3 bg-gray-100 rounded">
                                        <h4 className="text-[20px]">Phương thức giao hàng</h4>
                                    </div>
                                    <div className="flex flex-col gap-3 mt-5">
                                        <div
                                            onClick={() => handleSetPriceDelivery(37000)}
                                            className="flex items-center gap-x-2"
                                        >
                                            <RadioInput
                                                control={control}
                                                name="delivery_method"
                                                value="fast"
                                                checked={genderWatch === 'fast'}
                                                className="rounded-full"
                                            ></RadioInput>
                                            <span>{`Nhanh ( chỉ từ 2 - 5 ngày chuyển giao)`}</span>
                                            <span>
                                                <FaShippingFast size={18} />
                                            </span>
                                            <span className="text-base text-red-500 ml-auto">
                                                {convertPriceToStringVNDWithD(37000)}
                                            </span>
                                        </div>
                                        <div
                                            onClick={() => handleSetPriceDelivery(0)}
                                            className="flex items-center gap-x-3"
                                        >
                                            <RadioInput
                                                control={control}
                                                name="delivery_method"
                                                value="normal"
                                                checked={genderWatch === 'normal'}
                                                className="rounded-full"
                                            ></RadioInput>
                                            <span>{`Tốc độ tiêu chuẩn ( từ 5 - 12 ngày chuyển giao)`}</span>
                                            <span>
                                                <MdAirlineSeatReclineNormal size={18} />
                                            </span>
                                            <span className="text-base text-red-500 ml-auto">
                                                {convertPriceToStringVNDWithD(0)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <div className="px-5 py-3 bg-gray-100 rounded">
                                        <h4 className="text-[20px]">Phương thức thanh toán</h4>
                                    </div>
                                    <div className="flex flex-col gap-3 mt-5">
                                        <div className="flex items-center gap-x-2">
                                            <RadioInput
                                                control={control}
                                                name="payment_method"
                                                value="cash"
                                                checked={paymentWatch === 'cash'}
                                                className="rounded-full"
                                            ></RadioInput>
                                            <span>{`Thanh toán trực tiếp khi nhận hàng`}</span>
                                            <span>
                                                <FaHandHoldingUsd size={18} />
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-x-3">
                                            <RadioInput
                                                control={control}
                                                name="payment_method"
                                                value="paypal"
                                                checked={paymentWatch === 'paypal'}
                                                className="rounded-full"
                                            ></RadioInput>
                                            <span>{`Thanh toán bằng paypal`}</span>
                                            <span>
                                                <Image
                                                    width={0}
                                                    height={0}
                                                    sizes="100vw"
                                                    alt="paypal-icom"
                                                    // src={'/images/paypal.png'}
                                                    src={`${MEDIA_IMAGE_PATH}cee953f5a0c6d52f038059932`}
                                                    className="w-[18px] h-[18px] object-cover"
                                                />
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-x-3">
                                            <RadioInput
                                                control={control}
                                                name="payment_method"
                                                value="momo"
                                                checked={paymentWatch === 'momo'}
                                                className="rounded-full"
                                            ></RadioInput>
                                            <span>{`Thanh toán bằng ví momo`}</span>
                                            <span>
                                                <Image
                                                    width={0}
                                                    height={0}
                                                    sizes="100vw"
                                                    alt="paypal-icom"
                                                    // src={'/images/momo.webp'}
                                                    src={`${MEDIA_IMAGE_PATH}cee953f5a0c6d52f038059934`}
                                                    className="w-[18px] h-[18px] object-cover"
                                                />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-end">
                                    <button
                                        className={`mt-6 w-[300px] max-sm:w-[200px] max-sm:text-sm p-3 bg-[#3a3a3a] text-white hover:opacity-80 transition rounded-xl uppercase font-semibold ${
                                            isSubmitting ? 'opacity-50' : ''
                                        }`}
                                        disabled={isSubmitting}
                                        type="submit"
                                    >
                                        {isSubmitting ? (
                                            <div className="w-5 h-5 rounded-full mx-auto border-2 text-base max-md:text-[14px] tracking-wide border-white border-t-2 border-t-transparent animate-spin"></div>
                                        ) : (
                                            'Nhấn để đặt hàng'
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div>
                        <div className="bg-gray-50 h-fit">
                            <div className="flex flex-col py-8 px-6 max-sm:py-5 max-sm:px-3">
                                <div>
                                    <table className="w-full table-auto">
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
                                                                }}
                                                            >
                                                                <td className="py-3">
                                                                    <div className="flex items-center gap-6 max-sm:gap-3">
                                                                        <div className="bg-white relative rounded w-[60px] h-[60px] border border-gray-300">
                                                                            <Image
                                                                                width={0}
                                                                                height={0}
                                                                                sizes="100vw"
                                                                                src={item.image}
                                                                                alt="product image"
                                                                                className="h-[60px] w-[60px] object-cover rounded"
                                                                            />
                                                                            <div className="absolute w-[20px] h-[20px] flex items-center justify-center bg-slate-200 rounded-full top-[-12px] right-[-10px]">
                                                                                <span className="h-fit text-[12px] text-[#3A3A3A] font-medium">
                                                                                    {item.quantity}
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                        <div className="h-full flex flex-col gap-[4px] text-base justify-centerr">
                                                                            <span className="font-semibold">
                                                                                {item.name}
                                                                            </span>
                                                                            <div className="flex flex-col font-light">
                                                                                <ul>
                                                                                    <li>
                                                                                        <span>
                                                                                            Color:{' '}
                                                                                        </span>
                                                                                        <span>
                                                                                            {
                                                                                                item.color
                                                                                            }
                                                                                        </span>
                                                                                    </li>
                                                                                    <li>
                                                                                        <span>
                                                                                            Size:{' '}
                                                                                        </span>
                                                                                        <span>
                                                                                            {
                                                                                                item.size
                                                                                            }
                                                                                        </span>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td className="text-sm text-right py-3">
                                                                    <span>
                                                                        {convertPriceToStringVNDWithD(
                                                                            item.price,
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
                                <div
                                    style={{
                                        borderBottom: '1px solid #ccc',
                                    }}
                                    className="py-3"
                                >
                                    <div className="flex justify-between items-center mb-3">
                                        <span>Tổng sản phẩm</span>
                                        <span>{`${totalProducts} sản phẩm`}</span>
                                        <span>{convertPriceToStringVNDWithD(totalPrice)}</span>
                                    </div>
                                    <div className="flex justify-between items-center mb-3">
                                        <span>Giảm giá</span>
                                        <span>{convertPriceToStringVNDWithD(0)}</span>
                                    </div>
                                    <div className="flex justify-between items-center mb-3">
                                        <span>Phí vận chuyển</span>
                                        <span>{convertPriceToStringVNDWithD(priceDelivery)}</span>
                                    </div>
                                    <div className="flex justify-between items-center mb-3">
                                        <span>Thuế</span>
                                        <span>{convertPriceToStringVNDWithD(0)}</span>
                                    </div>
                                </div>
                                <div className="py-3">
                                    <div className="flex justify-between items-center">
                                        <div className="flex flex-col">
                                            <span className="font-semibold">Tổng tiền</span>
                                            <span>{`( Không bao gồm thuế )`}</span>
                                        </div>
                                        <span className="font-semibold text-xl">
                                            {convertPriceToStringVNDWithD(
                                                totalPrice + priceDelivery,
                                            )}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
