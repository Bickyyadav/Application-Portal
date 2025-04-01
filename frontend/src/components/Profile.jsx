import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";

const skills = ["HTML", "JS", "CSS", "Python"];
const isResumse = true;

const Profile = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
        <div className="flex  justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src="./image.png"></AvatarImage>
            </Avatar>
            <div>
              <h1 className="font-medium text-xl">Full Name</h1>
              <p className="">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Doloribus, libero.
              </p>
            </div>
          </div>
          <Button
            onClick={() => setOpen(true)}
            className="text-right"
            variant="outline"
          >
            <Pen />
          </Button>
        </div>
        <div className="my-5">
          <div className="flex items-center gap-3 my-2">
            <Mail />
            <span>bickyyadav@gmail.com</span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <Contact />
            <span>7782827701</span>
          </div>
        </div>
        <div>
          <h1>Skills</h1>
          <div className="flex items-center gap-2">
            {skills.length !== 0 ? (
              skills.map((item, index) => <Badge key={index}>{item}</Badge>)
            ) : (
              <span>NA</span>
            )}
          </div>
        </div>
        <div className="grid w-full max-w-sm items-center mt-3">
          <Label className="text-md font-bold ">Resume</Label>
          {isResumse ? (
            <span>
              <a
                target="blank"
                href="https://google.com"
                className="text-blue-400  w-full hover:underline cursor-pointer"
              >
                Bicky
              </a>
            </span>
          ) : (
            <span>NA</span>
          )}
        </div>
      </div>
      <div className="max-w-4xl mx-auto  rounded-2xl ">
        <h1 className="font-bold text-lg my-5">Applied Jobs</h1>
        {/* Applied Jobs */}
        <AppliedJobTable />
      </div>
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
