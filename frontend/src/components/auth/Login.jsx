import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_ENT_POINT } from "../../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "../../redux/authSlice";
import { Loader2 } from "lucide-react";

const Login = () => {
  const [input, setInput] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading } = useSelector((store) => store.auth);

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_ENT_POINT}/login`, input, {
        headers: {
          "Content-Types": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        console.log("🚀 ~ onFormSubmidafasfasdft ~ res:", res.data.user)
        
        dispatch(setUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log("🚀 ~ onFormSubmit ~ error:", error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
          onSubmit={onFormSubmit}
        >
          <h1 className="font-bold text-xl mb-5">Login</h1>
          <div className="my-2">
            <Label className="mb-2"> FullName</Label>
            <Input
              type="fullName"
              value={input.fullName}
              onChange={changeEventHandler}
              name="fullName"
              placeholder="Email"
            />
          </div>
          <div className="my-2">
            <Label className="mb-2"> Email</Label>
            <Input
              type="email"
              value={input.email}
              onChange={changeEventHandler}
              name="email"
              placeholder="Email"
            />
          </div>
          <div className="my-2">
            <Label className="mb-2"> Password</Label>
            <Input
              type="password"
              value={input.password}
              onChange={changeEventHandler}
              name="password"
              placeholder="password"
            />
          </div>

          <div className=" flex items-center justify-between">
            <RadioGroup className="flex items-center gap-4 my-5">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r1">Students</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                  value="recruiter"
                  className="cursor-pointer"
                />
                <Label htmlFor="r3">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>
          {loading ? (
            <Button className="w-full my-4 ">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please Wait
            </Button>
          ) : (
            <Button className="w-full bg-gray-400">Login</Button>
          )}
          <span className="">
            Don't have an account?{" "}
            <Link to="/signup" className=" text-blue-600">
              Signup
            </Link>{" "}
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
