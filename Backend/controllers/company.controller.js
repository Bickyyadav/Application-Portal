import { Company } from "../models/company.model.js";
import mongoose from "mongoose";

export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;
    if (!companyName) {
      return res.status(400).json({
        message: "Company name is required..",
        success: false,
      });
    }
    let company = await Company.findOne({ name: companyName });
    if (company) {
      return res.status(400).json({
        message: "You cannot register same company",
        success: false,
      });
    }
    company = await Company.create({
      name: companyName,
      userId: req.id,
    });
    return res.status(201).json({
      message: "Company Registered successfully",
      company,
      success: true,
    });
  } catch (error) {
    console.log("🚀 ~ registerCompany ~ error:", error);
  }
};

//getallcompany
export const getCompany = async (req, res) => {
  try {
    const userId = req.id; //logged in user logged in user company only  see
    const companies = await Company.find({ userId });
    if (!companies) {
      return res.status(404).json({
        message: "companies not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "",
      companies,
      success: true,
    });
  } catch (error) {
    console.log("🚀 ~ getCompany ~ error:", error);
  }
};

//get company by id
export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id.trim();
    if (!mongoose.Types.ObjectId.isValid(companyId)) {
      return res.status(400).json({
        message: "Invalid company ID format.",
        success: false,
      });
    }
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({
        message: "Invalid company ID format.",
        success: false,
      });
    }
    return res.status(200).json({
      success: true,
      company,
    });
  } catch (error) {
    console.log("🚀 ~ getCompanyById ~ error:", error);
  }
};

//update company
export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    const file = req.file;

    const updateData = { name, description, website, location };
    const company = await Company.findByIdAndUpdate(req.params.id, updateData);
    if (!company) {
      return res.send(404).json({
        message: "Company not found.",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Company information updated",
      success: true,
    });
  } catch (error) {
    console.log("🚀 ~ updateCompany ~ error:", error);
  }
};
