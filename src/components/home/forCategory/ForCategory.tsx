import React from 'react';
import { Container } from 'react-bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';

const ForCategory = () => {
    return (
        <Container className="my-5">
            <Swiper
        slidesPerView={1}
        spaceBetween={20}
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
        pagination={{
          clickable: true,
        }}
        modules={[]}
        className="mySwiper"
      >
        <SwiperSlide>
            <div className='text-center'>
                <img className='w-100' src="https://cdn.shopify.com/s/files/1/2617/9878/files/avenue-shopify-theme-womens-clothing_320x.jpg?v=1623794918" alt="" />
                <h5 className="mt-3">For Her</h5>
                <p className="text-secondary">What's the latest? Find your styles to look your best this summer !</p>
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className='text-center'>
                <img className='w-100' src="https://cdn.shopify.com/s/files/1/2617/9878/files/avenue-shopify-theme-mens-clothing_320x.jpg?v=1623794917" alt="" />
                <h5 className="mt-3">For Him</h5>
                <p className="text-secondary">Make Father's Day last all summer with the best fashions for him</p>
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className='text-center'>
                <img className='w-100' src="https://cdn.shopify.com/s/files/1/2617/9878/files/avenue-shopify-theme-kids-clothing_345a3c9c-1fed-486a-b43e-ede68cdf4294_320x.jpg?v=1623794917" alt="" />
                <h5 className="mt-3">For Them</h5>
                <p className="text-secondary">Don't forget about the most important people in your life !</p>
            </div>
        </SwiperSlide>
        
      </Swiper>
        </Container>
    );
};

export default ForCategory;