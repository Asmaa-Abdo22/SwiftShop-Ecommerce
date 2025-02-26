import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import Loading from "../../components/Loading/Loading";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Categories = () => {
  async function getAllCategories() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }
  const { data, isLoading, isError } = useQuery({
    queryKey: ["allCategories"],
    queryFn: getAllCategories,
  });
  console.log(data?.data, "allcategories");
  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    toast.error("Error in Getting Categories");
  }
  const allCategories = data?.data.data;
  return (
    <>
      <section>
        <h1 className="text-2xl font-bold text-primary-700 text-center ">All Categories</h1>
        <div className="mt-7 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4">
            {allCategories.map((category)=>{return <>
            <div key={category._id} className="border-2 border-primary-600 rounded-lg p-1  overflow-hidden">
                <Link to={`/categories/${category._id}/subcategories`}>
                <img src={category.image} alt={category.name} className="w-full h-72 object-cover" />
                <h2 className="text-xl text-gray-300 font-bold text-center mt-2">{category.name}</h2>
                </Link>
            </div>
            </>})}
        </div>
      </section>
    </>
  );
};

export default Categories;
