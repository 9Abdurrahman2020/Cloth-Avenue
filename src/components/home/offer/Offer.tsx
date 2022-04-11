import React from 'react';
import { Autoplay } from "swiper";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import './offer.css';

const Offer = () => {
    return (
        <div className='offer-container'>
            <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
        speed={500}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay]}
        navigation={true}
        className="mySwiper"
      >
        <SwiperSlide className='offer-slide'>Free shipping on all orders over $150</SwiperSlide>
        <SwiperSlide className='offer-slide'>See the newest Women's styles: Shop</SwiperSlide>
        <SwiperSlide className='offer-slide'>SALE: Men's shorts are 50% Off! Shop</SwiperSlide>
        
      </Swiper>
        </div>
    );
};

export default Offer;