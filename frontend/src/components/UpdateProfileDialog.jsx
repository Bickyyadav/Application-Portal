import React, { useState } from "react";
import { Label } from "./ui/label";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

const UpdateProfileDialog = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);






  return (
    <div>
      <Dialog open={open}>
        <DialogContent
          className="sm:max-w-[425px] bg-gray-400"
          onInteractOutside={() => setOpen(false)}
        >
          <DialogHeader>
            <DialogTitle>Update Profile</DialogTitle>
          </DialogHeader>
          <form>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="col-span-3  border-2"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  className="col-span-3 border-2"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="number" className="text-right">
                  Number
                </Label>
                <input
                  type="text"
                  id="number"
                  name="number"
                  className="col-span-3  border-2"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="bio" className="text-right">
                  Bio
                </Label>
                <input
                  type="text"
                  id="bio"
                  name="bio"
                  className="col-span-3  border-2"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="skills" className="text-right">
                  Skills
                </Label>
                <input
                  type="text"
                  id="skills"
                  name="skills"
                  className="col-span-3  border-2"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="file" className="text-right">
                  Resume
                </Label>
                <input
                  type="file"
                  id="file"
                  name="file"
                  accept="application/pdf"
                  className="col-span-3 border"
                />
              </div>
            </div>
            <DialogFooter>
              {loading ? (
                <Button className="w-full my-4 ">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please Wait
                </Button>
              ) : (
                <Button className="w-full bg-gray-400">Update</Button>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateProfileDialog;
