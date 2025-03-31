import React from "react";
import Navbar from "./shared/Navbar";
import { Button } from "./ui/button";
import { BookMarked } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";

const Job = () => {
  return (
    <div className="p-6 rounded-md shadow-2xl bg-white border border-gray-100">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">2 days ago</p>
        <Button variant="outline" className="rounded-full" size="icon">
          <BookMarked />
        </Button>
      </div>
      <div className="flex gap-2 items-center my-2 ">
        <Button className="p-6 " variant="outline" size="icon">
          <Avatar>
            <AvatarImage src="./image.png" />
          </Avatar>
        </Button>
        <div>
          <h1>Company Name</h1>
          <p>India</p>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">Title</h1>
        <p className="text-gray-600 text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo,
          explicabo!
        </p>
      </div>
      <div className="flex items-center gap-2  mt-4">
        <Badge className={"text-blue-700 font-bold"} variant="ghost">
          12 position
        </Badge>
        <Badge className={"text-[#F83002] font-bold"} variant="ghost">
          Part Time
        </Badge>
        <Badge className={"text-[#7209b7] font-bold"} variant="ghost">
          24LPA
        </Badge>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <Button variant="outline">Details</Button>
        <Button className="bg-[#ba77e6]">Save for Later</Button>
      </div>
    </div>
  );
};

export default Job;
