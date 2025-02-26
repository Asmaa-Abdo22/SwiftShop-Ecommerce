import React, { useContext, useEffect, useState } from "react";
import exampleimg from "../../assets/imgs/paypal.png";
import axios from "axios";
import Loading from "../../components/Loading/Loading";
import { useParams } from "react-router-dom";
import { Cartcontext } from "../../context/CartContext";
import ReactImageGallery from "react-image-gallery";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Card from "../../components/Card/Card";
import { Helmet } from "react-helmet";

const ProductDetails = () => {
  const { addProductToCart } = useContext(Cartcontext);
  const { id } = useParams();
  const [productDetails, setproductDetails] = useState(null);
  const [allrelatedProducts, setallrelatedProducts] = useState(null);

  useEffect(() => {
    getProductDetails();
  }, []);

  async function getProductDetails() {
    try {
      let { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products/${id}`
      );
      console.log("response from getproduct-details", data);
      setproductDetails(data.data);
    } catch (error) {
      console.log(error);
    }
  }
  async function getRelatedProducts() {
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/products",
        {
          params: {
            "category[in]": productDetails.category._id,
          },
        }
      );
      console.log(data, "get related products");
      setallrelatedProducts(data.data);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  useEffect(() => {
    if (productDetails === null) {
      return;
    }

    getRelatedProducts();
  }, [productDetails]);

  return (
    <>
    <Helmet>
      <title>Product Details</title>
    </Helmet>
      {productDetails ? (
        <>
        
          <section className="grid text-white gap-8 md:gap-12 grid-cols-1 md:grid-cols-12">
            {/* Image Gallery */}
            <div className="md:col-span-4 lg:col-span-3 p-4 md:p-0">
              <ReactImageGallery
                showFullscreenButton={false}
                showPlayButton={false}
                showNav={false}
                items={productDetails.images.map((image) => ({
                  original: image,
                  thumbnail: image,
                }))}
              />
            </div>

            {/* Product Details */}
            <div className="md:col-span-8 lg:col-span-9 space-y-4 p-4 md:p-0">
              <h2 className="text-2xl md:text-3xl font-semibold text-slate-200">
                {productDetails.title}
              </h2>
              <h3 className="text-primary-700 font-semibold">
                {productDetails.category.name}
              </h3>
              <p className="text-gray-300">{productDetails.description}</p>
              <div className="priceating flex justify-between items-center">
                <span>{productDetails.price} L.E</span>
                <div>
                  <i className="fa-solid fa-star text-yellow-500 mr-2"></i>
                  <span>{productDetails.ratingsAverage}</span>
                </div>
              </div>
            </div>
          </section>

          {/* Add to Cart Button */}
          <button
            onClick={() => addProductToCart(id)}
            className="mt-5 btn w-full text-white bg-primary-900 hover:bg-primary-700 font-semibold py-3 px-6 rounded-lg"
          >
            Add To Cart
          </button>

          {/* Related Products Section */}
          <section>
            {allrelatedProducts ? (
              <>
                <h2 className="my-10 text-primary-600 font-bold text-2xl">
                  Related Products
                </h2>
                <Swiper
                  slidesPerView={1}
                  breakpoints={{
                    640: { slidesPerView: 2 },
                    768: { slidesPerView: 3 },
                    1024: { slidesPerView: 4 },
                    1280: { slidesPerView: 6 },
                  }}
                  loop={true}
                  spaceBetween={10}
                >
                  {allrelatedProducts.map((product) => (
                    <SwiperSlide key={product.id}>
                      <div className="bg-slate-800 rounded-lg overflow-hidden shadow-lg">
                        <img
                          src={product.imageCover}
                          alt={product.title}
                          className="w-full  object-cover"
                        />
                        <div className="cardBody p-4">
                          <h3 className="text-lg text-gray-300 font-semibold line-clamp-2">
                            {product.title}
                          </h3>
                          <h4 className="text-primary-600 font-semibold">
                            {product.category.name}
                          </h4>
                          <p className="text-gray-400 text-sm line-clamp-2 my-2">
                            {product.description}
                          </p>
                          <div className="flex justify-between items-center mt-3">
                            <span className="text-slate-300">
                              {product.price} EGP
                            </span>
                            <div>
                              <i className="fa-solid fa-star text-yellow-400 mr-1"></i>
                              <span className="text-slate-300">
                                {product.ratingsAverage}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </>
            ) : (
              <Loading />
            )}
          </section>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default ProductDetails;
