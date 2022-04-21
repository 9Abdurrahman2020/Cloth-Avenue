import React from 'react';
import { Container } from 'react-bootstrap';
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from 'swiper/react';

const OurBrand = () => {
    return (
        <div className='my-5 py-5' style={{background:"#efefef"}}>
            <Container>
                <h3 className='text-center'>Our Brands</h3>
                <Swiper
                    slidesPerView={2}
                    spaceBetween={20}
                    pagination={{
                    dynamicBullets: true,
                    }}
                    modules={[Pagination]}
                    breakpoints={{
                        640: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                        },
                        768: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                        },
                    }}
          
                    className="mySwiper"
                >
          <SwiperSlide>
              <div style={{display:'flex', justifyContent:"center"}}>
                  <img src="https://cdn.shopify.com/s/files/1/2617/9878/files/avenue-shopify-theme-copper-thompson_220x.png?v=1542666623" alt="" />
              </div>
          </SwiperSlide>
          <SwiperSlide>
              <div style={{display:'flex', justifyContent:"center"}}>
                  <img src="https://cdn.shopify.com/s/files/1/2617/9878/files/avenue-shopify-theme-kd_220x.png?v=1542666623" alt="" />
              </div>
          </SwiperSlide>
          <SwiperSlide>
              <div style={{display:'flex', justifyContent:"center"}}>
                  <img src="https://cdn.shopify.com/s/files/1/2617/9878/files/avenue-shopify-theme-leystone_220x.png?v=1542666623" alt="" />
              </div>
          </SwiperSlide>
          
      </Swiper>
            </Container>
        </div>
    );
};

export default OurBrand;