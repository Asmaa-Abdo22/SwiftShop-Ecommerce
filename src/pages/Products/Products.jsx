import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import Loading from "../../components/Loading/Loading";
import Card from "../../components/Card/Card";
import { Helmet } from "react-helmet";

const Products = () => {
  async function getAllProducts() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }
  const { data, isLoading, isError } = useQuery({
    queryKey: ["getProducts"],
    queryFn: getAllProducts,
  });
  console.log(data?.data.data, "getall products");
  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
    <Helmet>
        <title>Products</title>
    </Helmet>
      <section>
        <h1 className="text-2xl font-bold text-slate-200 text-center ">
          All Products{" "}
        </h1>
        <div className="mt-7 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {data?.data.data.map((product) => {
            return (
              <>
                <Card key={product.id} productObject={product} />
              </>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default Products;
