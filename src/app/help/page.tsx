'use client';

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { MdOutlineKeyboardBackspace } from 'react-icons/md';

interface HelpPageProps {}

const HelpPage: React.FC<HelpPageProps> = (props: HelpPageProps) => {
    const router = useRouter();

    return (
        <div>
            <div className={`border-b border-gray-300`}>
                <div className="max-w-[1400px] mx-auto px-2">
                    <Navbar />
                </div>
            </div>
            <div className="max-w-[1280px] mx-auto my-7 max-md:px-2">
                <div className="flex gap-1 items-center mb-6">
                    <span
                        className="cursor-pointer hover:text-[#2c6ecb] transition-colors"
                        onClick={() => router.back()}
                    >
                        <MdOutlineKeyboardBackspace size={20} />
                    </span>
                </div>
                <div className="text-[18px] max-sm:text-sm">
                    <h1 className="uppercase text-[28px] max-sm:text-base font-medium mb-7 max-sm:mb-5">
                        Hướng dẫn mua hàng
                    </h1>
                    <div className="flex flex-col gap-5">
                        <p>
                            <strong>Bước 1: </strong>Truy cập website và lựa chọn sản phẩm cần mua
                            để mua hàng
                        </p>
                        <p>
                            <strong>Bước 2: </strong>Click và sản phẩm muốn mua, màn hình hiển thị
                            ra pop up với các lựa chọn sau
                        </p>
                        <p>
                            Nếu bạn muốn tiếp tục mua hàng: Bấm vào phần tiếp tục mua hàng để lựa
                            chọn thêm sản phẩm vào giỏ hàng
                        </p>
                        <p>Nếu bạn muốn xem giỏ hàng để cập nhật sản phẩm: Bấm vào xem giỏ hàng</p>
                        <p>
                            Nếu bạn muốn đặt hàng và thanh toán cho sản phẩm này vui lòng bấm vào:
                            Đặt hàng và thanh toán
                        </p>
                        <p>
                            <strong>Bước 3: </strong>Lựa chọn thông tin tài khoản thanh toán
                        </p>
                        <p>
                            Nếu bạn đã có tài khoản vui lòng nhập thông tin tên đăng nhập là email
                            và mật khẩu vào mục đã có tài khoản trên hệ thống
                        </p>
                        <p>
                            Nếu bạn chưa có tài khoản và muốn đăng ký tài khoản vui lòng điền các
                            thông tin cá nhân để tiếp tục đăng ký tài khoản. Khi có tài khoản bạn sẽ
                            dễ dàng theo dõi được đơn hàng của mình
                        </p>
                        <p>Bạn sẽ không được phép đặt hàng nếu chưa đăng ký tài khoản</p>
                        <p>
                            <strong>Bước 4: </strong>Điền các thông tin của bạn để nhận đơn hàng,
                            lựa chọn hình thức thanh toán và vận chuyển cho đơn hàng của mình
                        </p>
                        <p>
                            <strong>Bước 5: </strong>Xem lại thông tin đặt hàng, điền chú thích và
                            gửi đơn hàng
                        </p>
                        <p>
                            Sau khi nhận được đơn hàng bạn gửi chúng tôi sẽ liên hệ bằng cách gọi
                            điện lại để xác nhận lại đơn hàng và địa chỉ của bạn.
                        </p>
                        <p>Trân trọng cảm ơn.</p>
                    </div>
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </div>
    );
};

export default HelpPage;
