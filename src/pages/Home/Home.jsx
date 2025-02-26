import React, { useEffect, useState } from "react";
import Loading from "../../components/Loading/Loading";
import Card from "../../components/Card/Card";
import axios from "axios";
import HomeSlider from "../../components/HomeSlider/HomeSlider";
import CategorySlider from "../../components/CategorySlider/CategorySlider";
import { Helmet } from "react-helmet";

const Home = () => {
  const [allProducts, setallProducts] = useState(null);
  async function getProducts() {
    let { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/products"
    );
    console.log(data);
    console.log(data.data);
    setallProducts(data.data);
  }
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <HomeSlider />
      <CategorySlider />
      {allProducts ? (
        <div className="mt-7 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {allProducts.map((product) => (
            <Card key={product.id} productObject={product} />
          ))}
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Home;
