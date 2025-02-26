import React from "react";
import sliderImgOne from "../../assets/imgs/slider-image-1.jpeg";
import sliderImgTwo from "../../assets/imgs/slider-image-2.jpeg";
import sliderImgThree from "../../assets/imgs/slider-image-3.jpeg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const HomeSlider = () => {
  return (
    <section className="grid grid-cols-12 ">
      
      <div className="col-span-12 md:col-span-8">
        <Swiper
          className="h-full"
          slidesPerView={1}
          loop={true}
          spaceBetween={10}
          breakpoints={{
            480: { slidesPerView: 1, spaceBetween: 20 },
            768: { slidesPerView: 1, spaceBetween: 30 },
            1024: { slidesPerView: 1, spaceBetween: 40 },
          }}
        >
          <SwiperSlide>
            <img
              src={sliderImgThree}
              alt="slider image three"
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src={sliderImgThree}
              alt="slider image three"
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src={sliderImgThree}
              alt="slider image three"
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src={sliderImgThree}
              alt="slider image three"
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
        </Swiper>
      </div>

      <div className="col-span-12 md:col-span-4 flex flex-col gap-4 mt-4 md:mt-0">
        <img src={sliderImgOne} alt="slider image one" className="w-full" />
        <img src={sliderImgTwo} alt="slider image two" className="w-full" />
      </div>
    </section>
  );
};

export default HomeSlider;
