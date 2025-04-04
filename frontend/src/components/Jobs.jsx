/* eslint-disable no-unused-vars */
import React from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";

import Job from "./Job";
import { Badge } from "lucide-react";

const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const Jobs = () => {
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-4">
        <div className="flex  gap-5">
          {/* filter page */}
          <div className="w-20%">
            <FilterCard />
          </div>

          {/* Job card */}

          {jobsArray.length <= 0 ? (
            <span>Job not found</span>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5 ">
              <div className="grid grid-cols-3 gap-4">
                {jobsArray.map((item, index) => (
                  <div>
                    <Job />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
     
    </div>
  );
};

export default Jobs;
