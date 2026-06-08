const express = require("express");
const router = express.Router();

const {
  createApplication,
  getApplications,
  updateApplicationStatus,
  getSummary,
} = require("../controllers/applicationController");

router.post("/", createApplication);
router.get("/", getApplications);
router.patch("/:id/status", updateApplicationStatus);
router.get("/summary", getSummary);

module.exports = router;