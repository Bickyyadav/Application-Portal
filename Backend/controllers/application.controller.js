import { Application } from "../models/application.model";
import { Job } from "../models/job.model";

export const applyJob = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;
    if (!jobId) {
      return res.status(400).json({
        message: "Job id is required.",
        success: false,
      });
    }
    //check teh user has already applied or not for the job role
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });
    if (existingApplication) {
      return res.status(400).json({
        message: "You have already applied for this jobs",
        success: false,
      });
    }
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }
    //create a new application
    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
    });
    job.application.push(newApplication._id);
    await job.save();
    return res.status(200).json({
      message: "job created succesfully",
      success: true,
    });
  } catch (error) {
    console.log("🚀 ~ applyJob ~ error:", error);
  }
};

export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.id;
    const application = await Application.find({ applicant: userId })
      .sort({
        createAt: -1,
      })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "company",
          options: { sort: { createdAt: -1 } },
        },
      });

    if (!application) {
      return res.status(404).json({
        message: "No Applications",
        success: false,
      });
    }
    return res.status(201).json({
      application,
      success: true,
    });
  } catch (error) {
    console.log("🚀 ~ getAppliedJobs ~ error:", error);
  }
};

//admin dekhaga kitna user ne job apply kiya hya

export const getApplication = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "applicant",
      },
    });
    if (!jobId) {
      return res.status(404).json({
        message: "Job not found.",
        success: false,
      });
    }
    return res.status(200).json({
      job,
      success: true,
    });
  } catch (error) {
    console.log("🚀 ~ getApplication ~ error:", error);
  }
};



export const updateStatus = await(req,res)=>{
    try {
        const {status} = req.body;
        const applicationId = req.params.id;
        if(!status){
            return res.status(400).json({
                message:'status is required',
                success:false
            })
        };

        return res.status(200).json({
            message:"Status updated successfully.",
            success:true
        });
        
    } catch (error) {
        console.log("🚀 ~ updateStatus ~ error:", error)
        
    }
}