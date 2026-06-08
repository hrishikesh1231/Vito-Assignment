const pool = require("../config/db");

const createApplication = async (req, res) => {
  try {
    const { name, mobile, amount, purpose, language } = req.body;

    if (!name || !mobile || !amount || !purpose || !language) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const query = `
      INSERT INTO applications
      (name,mobile,amount,purpose,language)
      VALUES($1,$2,$3,$4,$5)
      RETURNING *;
    `;

    const values = [
      name,
      mobile,
      amount,
      purpose,
      language,
    ];

    const result = await pool.query(query, values);

    res.status(201).json({
      success: true,
      application: result.rows[0],
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getApplications = async (req, res) => {
  try {
    const { status } = req.query;

    let query =
      "SELECT * FROM applications ORDER BY created_at DESC";

    let values = [];

    if (status) {
      query =
        "SELECT * FROM applications WHERE status=$1 ORDER BY created_at DESC";
      values = [status];
    }

    const result = await pool.query(query, values);

    res.status(200).json(result.rows);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({
        message: "Status must be approved or rejected",
      });
    }

    const result = await pool.query(
      `
      UPDATE applications
      SET status=$1
      WHERE id=$2
      RETURNING *
      `,
      [status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    res.status(200).json({
      success: true,
      application: result.rows[0],
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const getSummary = async (req, res) => {
  try {

    const totalApps = await pool.query(
      "SELECT COUNT(*) FROM applications"
    );

    const totalAmount = await pool.query(
      "SELECT COALESCE(SUM(amount),0) FROM applications"
    );

    const pending = await pool.query(
      "SELECT COUNT(*) FROM applications WHERE status='pending'"
    );

    const approved = await pool.query(
      "SELECT COUNT(*) FROM applications WHERE status='approved'"
    );

    const rejected = await pool.query(
      "SELECT COUNT(*) FROM applications WHERE status='rejected'"
    );

    res.json({
      totalApplications: Number(totalApps.rows[0].count),
      totalAmount: Number(totalAmount.rows[0].coalesce),
      pending: Number(pending.rows[0].count),
      approved: Number(approved.rows[0].count),
      rejected: Number(rejected.rows[0].count),
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { createApplication,getApplications,updateApplicationStatus,getSummary };