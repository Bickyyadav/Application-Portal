/* eslint-disable no-unused-vars */
import React from "react";
import LatestJobCards from "./LatestJobCards";

const randomJobs = [1, 2, 3, 4, 4, 5, 6, 67];

const LatestJobs = () => {
  return (
    <div className="max-w-7xl mx-auto my-20 ">
      <h1 className=" text-4xl font-bold">
        <span className="text-[#6A38c2]">Latest & Top</span> Job Openings
      </h1>
      <div className=" w-full  grid grid-cols-3    my-5  items-center  justify-between ">
        {randomJobs.slice(0, 6).map((item, index) => (
          <LatestJobCards />
        ))}
      </div>
    </div>
  );
};

export default LatestJobs;
