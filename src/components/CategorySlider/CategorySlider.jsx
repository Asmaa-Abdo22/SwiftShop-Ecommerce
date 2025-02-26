import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
const CategorySlider = () => {
  const [allCategories, setallCategories] = useState(null);
  async function getCategories() {
    const { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/categories"
    );
    console.log(data.data);
    setallCategories(data.data);
  }
  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
    {allCategories ? (
  <>
    <h2 className="mt-5 mb-3 text-xl text-primary-700 font-semibold">
      Ship All Categories
    </h2>
    <Swiper
      className="mb-8"
      slidesPerView={3} 
      loop={true}
      spaceBetween={10}
      breakpoints={{
        480: { slidesPerView: 1, spaceBetween: 20 },
        768: { slidesPerView: 2, spaceBetween: 30 },
        1024: { slidesPerView: 4, spaceBetween: 15 }, 
        1280: { slidesPerView: 6, spaceBetween: 10 }, 
      }}
    >
      {allCategories.map((item) => (
        <SwiperSlide key={item._id}>
          <div className="text-center">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-52 object-cover cursor-pointer rounded-lg"
            />
            <h3 className="mt-4 text-primary-800 font-medium">{item.name}</h3>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  </>
) : (
  <Loading />
)}

    </>
  );
};

export default CategorySlider;
