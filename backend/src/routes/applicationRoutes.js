const express = require("express");
const router = express.Router();

const {
  createApplication,
  getApplications,
  updateApplicationStatus,
  getSummary,
  getApplicationById,
} = require("../controllers/applicationController");

router.post("/", createApplication);

router.get("/summary", getSummary);

router.get("/", getApplications);

router.get("/:id", getApplicationById);

router.patch("/:id/status", updateApplicationStatus);

module.exports = router;