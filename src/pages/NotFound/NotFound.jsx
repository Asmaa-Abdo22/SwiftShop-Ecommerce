import React from "react";
import notFoundImage from "../../assets/imgs/error.svg";
import { Helmet } from "react-helmet";
const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>Not Found 404</title>
      </Helmet>
      <div className="w-96 m-auto mt-8">
        <h1 className="text-primary-800 text-2xl font-bold mb-6 text-center">
          404 Pgae Not Found
        </h1>
        <img src={notFoundImage} alt="" />
      </div>
    </>
  );
};

export default NotFound;
