import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from 'swiper/react';

const ForCategory = () => {
    return (
        <Container className="my-5">
            <Swiper
        slidesPerView={1}
        spaceBetween={20}
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
          }}
          
        className="mySwiper"
      >
        <SwiperSlide>
            <div className='text-center'>
                <img className='w-100' src="https://cdn.shopify.com/s/files/1/2617/9878/files/avenue-shopify-theme-womens-clothing_320x.jpg?v=1623794918" alt="" />
                <Link className='cart-product-title' to="/products-for/female"><h5 className="mt-3">For Her</h5></Link>
                <p className="text-secondary">What's the latest? Find your styles to look your best this summer !</p>
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className='text-center'>
                <img className='w-100' src="https://cdn.shopify.com/s/files/1/2617/9878/files/avenue-shopify-theme-mens-clothing_320x.jpg?v=1623794917" alt="" />
                <Link className='cart-product-title' to="/products-for/male"><h5 className="mt-3">For Him</h5></Link>
                <p className="text-secondary">Make Father's Day last all summer with the best fashions for him</p>
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className='text-center'>
                <img className='w-100' src="https://cdn.shopify.com/s/files/1/2617/9878/files/avenue-shopify-theme-kids-clothing_345a3c9c-1fed-486a-b43e-ede68cdf4294_320x.jpg?v=1623794917" alt="" />
                <Link className='cart-product-title' to="/products-for/kids"><h5 className="mt-3">For Them</h5></Link>
                <p className="text-secondary">Don't forget about the most important people in your life !</p>
            </div>
        </SwiperSlide>
        
      </Swiper>
        </Container>
    );
};

export default ForCategory;