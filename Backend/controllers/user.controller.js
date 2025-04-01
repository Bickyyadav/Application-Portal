import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { fullName, email, password, phoneNumber, role } = req.body;
    console.log("🚀 ~ register ~ fullName:", fullName);
    console.log("🚀 ~ register ~ role:", role);
    console.log("🚀 ~ register ~ phoneNumber:", phoneNumber);
    console.log("🚀 ~ register ~ password:", password);
    console.log("🚀 ~ register ~ email:", email);

    if (!fullName || !email || !password || !phoneNumber || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already exist with this email",
        success: false,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      fullName,
      email,
      password: hashedPassword,
      phoneNumber,
      role,
    });
    return res.status(200).json({
      message: "User created Successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Somethings went wrong",
      success: false,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Somethings is missing",
        success: false,
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Incorrect Email or password",
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect Email or password",
      });
    }
    //check the role is correct or not which they have crated means if the account is user and login is admin
    if (role !== user.role) {
      return res.status(400).json({
        success: false,
        message: "Account doesn't exist with current role",
      });
    }

    const tokenData = {
      userId: user._id,
    };

    const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    //to prevent sensitive data we are doing this step user again writting
    const filteredUser = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `Welcome back ${user.fullName}`,
        success: true,
        user: filteredUser,
      });
  } catch (error) {
    console.log("🚀 ~ login ~ error:", error);

    return res.status(400).json({
      message: "Somethings went wrong",
      success: false,
    });
  }
};

export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "logged out successfully",
      success: true,
    });
  } catch (error) {
    console.log("🚀 ~ logout ~ error:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, bio, skills } = req.body;
    const file = req.file;
    // if (!fullName || !email || !phoneNumber || !bio || !skills) {
    //   return res.status(400).json({
    //     message: "Something is missing",
    //     success: false,
    //   });
    // }

    //cloudinary ayega idhar

    //skills are in the form of string so we have to convert in form of array
    let skillsArray;
    if (skills) {
      skillsArray = skills.split(",");
    }
    const userId = req.id; //middleware authentication se aayaga
    if (!userId) {
      return res.status(400).json({
        message: "please sign before edit your profile",
        success: false,
      });
    }
    let user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        message: "User not found",
        success: false,
      });
    }

    //updating the field
    if (fullName) user.fullName = fullName;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.bio = bio;
    if (skills) user.skills = skillsArray;

    //resume comes latter here

    await user.save();

    //if we send user then it will send my password to so we do this step
    user = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res.status(200).json({
      message: "Profile Updated succesfully",
      success: true,
      user,
    });
  } catch (error) {
    console.log("🚀 ~ updateProfile ~ error:", error);
  }
};
