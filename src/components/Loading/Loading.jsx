import React from "react";
import { BeatLoader } from "react-spinners";

const Loading = () => {
  return (
    <>
      <div className="loading h-screen bg-slate-800 bg-opacity-90 flex justify-center items-center fixed left-0 right-0 bottom-0">
        <BeatLoader color="#0aad0a" />
      </div>
    </>
  );
};

export default Loading;
