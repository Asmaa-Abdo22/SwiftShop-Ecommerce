import React, { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import { UserContext } from "../../context/UserContext";
import { jwtDecode } from "jwt-decode";

const Profile = () => {
  const { token, userData } = useContext(UserContext);
  const { id, name, role } = jwtDecode(token);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Profile</title>
      </Helmet>
      <div className="text-white text-center text-2xl font-bold  bg-green-900 rounded-lg p-4 w-fit m-auto">
        <h3 className="my-4">
          Name : <span className="text-primary-800  capitalize ">{name}</span>
        </h3>
        <h3 className="my-4">
          Email : <span className="text-primary-800   ">{userData}</span>
        </h3>
        <h3 className="my-4">
          Role : <span className="text-primary-800 capitalize">{role}</span>
        </h3>
        <h3 className="my-4">
          Id : <span className="text-primary-800  ">{id}</span>
        </h3>
      </div>
    </>
  );
};

export default Profile;
