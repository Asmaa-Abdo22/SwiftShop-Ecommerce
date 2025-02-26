import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../../components/Loading/Loading";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";

const BrandDetails = () => {
  const { id } = useParams();

  async function getSpecificBrand() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`);
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: ["specific brand", id],
    queryFn: getSpecificBrand,
  });

  if (isLoading) return <Loading />;
  if (isError) {
    toast.error("Error getting brand details");
    return <p className="text-red-500 text-center">Failed to load brand.</p>;
  }

  const brand = data?.data.data;
  return <>
  <Helmet>
    <title>
        Brand Details
    </title>
  </Helmet>
   <div className="w-1/2 m-auto flex flex-col justify-center items-center p-2 border-2 border-primary-400  rounded-lg ">
      <h1 className="text-3xl mb-3 font-bold text-primary-700 ">
        {brand.name}
      </h1>
      <img src={brand.image} alt={brand.name} />
    </div>
  </>
   
  
};

export default BrandDetails;
