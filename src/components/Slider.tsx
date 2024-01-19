import Image from 'next/image';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import {
    Autoplay,
    Pagination,
    Navigation,
    Scrollbar,
    A11y,
    EffectCube,
    Virtual,
} from 'swiper/modules';
import { ProductType } from '@/types/products.type';
import ProductCard from './ProductCard';

interface SliderProps {
    products: ProductType[];
}

const Slider: React.FC<SliderProps> = (props: SliderProps) => {
    const { products } = props;

    return (
        <div className="w-full my-6 ml-0">
            <Swiper
                className="w-full h-full"
                grabCursor={true}
                slidesPerView={2}
                spaceBetween={20}
                breakpoints={{
                    // when window width is >= 320px
                    480: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    // when window width is >= 640px
                    640: {
                        slidesPerView: 4,
                        spaceBetween: 30,
                    },
                }}
                // centeredSlides={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                navigation
                // pagination={{
                //     clickable: true,
                // }}
                scrollbar={{ draggable: true }}
                virtual
                modules={[Autoplay, Pagination, Navigation, Virtual]}
            >
                {products &&
                    products.length > 0 &&
                    products.map((product) => {
                        return (
                            <SwiperSlide key={product.id}>
                                <ProductCard
                                    title={product.name}
                                    price={Number(product.price)}
                                    image={product.images[0]}
                                    image2={product.images[1]}
                                    id={product.id}
                                    key={product.id}
                                    color={product.color}
                                />
                            </SwiperSlide>
                        );
                    })}
            </Swiper>
        </div>
    );
};

export default Slider;
