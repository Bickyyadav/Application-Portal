import express from "express";
import {
  applyJob,
  getApplication,
  getAppliedJobs,
  updateStatus,
} from "../controllers/application.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

router.route("/apply/:id").get(isAuthenticated, applyJob);
router.route("/get").get(isAuthenticated, getAppliedJobs);
router.route("/:id/application").get(isAuthenticated, getApplication);
router.route("/status/:id/update").post(isAuthenticated, updateStatus);

export default router;
