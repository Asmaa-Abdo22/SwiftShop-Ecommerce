import { useQuery } from "@tanstack/react-query";
import React from "react";
import Loading from "../../components/Loading/Loading";
import toast from "react-hot-toast";
import axios from "axios";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const Brands = () => {
  async function getAllBrands() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
  }
  const { data, isLoading, isError } = useQuery({
    queryKey: ["brands"],
    queryFn: getAllBrands,
  });
  console.log(data?.data.data, "brands");
  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    toast.error("Error getting categories");
  }
  return (
    <>
      <Helmet>
        <title>Brands</title>
      </Helmet>
      <section>
        <h1 className="text-2xl font-bold text-primary-500 text-center ">
          All Brands
        </h1>
        <div className="mt-7 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4">
          {data?.data.data.map((brand) => {
            return (
              <>
                <Link
                  to={`/brands/${brand._id}`}
                  key={brand._id}
                  className="cursor-pointer  rounded-lg overflow-hidden p-1 border-2 border-primary-400"
                >
                  <img src={brand.image} alt={brand.name} className="w-full" />
                  <h2 className="text-xl text-gray-300 font-bold text-center mt-2">
                    {brand.name}
                  </h2>
                </Link>
              </>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default Brands;
