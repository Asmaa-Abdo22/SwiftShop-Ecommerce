import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import Loading from "../Loading/Loading";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";

const SubCategories = () => {
  const { id } = useParams();
  async function GetAllSubCategoriesOnCategory() {
    return axios.get(
      `https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`
    );
  }
  const { data, isLoading, isError } = useQuery({
    queryKey: ["GetAllSubCategoriesOnCategory"],
    queryFn: GetAllSubCategoriesOnCategory,
  });
  if (isLoading) {
    return <Loading />;
  }
  console.log(data?.data.data, "subb");
  if (isError) [toast.error("Can't get subcategories")];
  const allSubCategories = data?.data.data;
  return (
    <>
      <Helmet>
        <title>SubCategories</title>
      </Helmet>
      <section>
        <h1 className="text-3xl mb-3 font-bold text-primary-700  text-center">
          Sub Categories
        </h1>
        <div className="mt-7 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4">
          {allSubCategories.map((category) => {
            return (
              <>
                <div key={category._id} className="bg-[#C0EBA6]">
                  <h2 className="text-center text-xl text-orange-800 font-semibold py-2">
                    {category.name}
                  </h2>
                </div>
              </>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default SubCategories;
