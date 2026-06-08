import { useState } from "react";
import API from "../services/api";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import {
  User,
  Phone,
  IndianRupee,
  FileText,
  Languages,
  Copy,
  Check,
  X,
} from "lucide-react";

function ApplyLoan() {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    amount: "",
    purpose: "",
    language: "English",
  });

const [loading, setLoading] = useState(false);
const [referenceId, setReferenceId] = useState("");
const [showSuccessModal, setShowSuccessModal] = useState(false);
const [copied, setCopied] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

const copyReferenceId = async () => {
  try {
    await navigator.clipboard.writeText(
      referenceId
    );

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  } catch (error) {
    console.error(error);
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client Side Validation

    if (formData.name.trim().length < 3) {
      alert(
        "Name must be at least 3 characters long"
      );
      return;
    }

    if (
      !/^[0-9]{10}$/.test(
        formData.mobile
      )
    ) {
      alert(
        "Please enter a valid 10-digit mobile number"
      );
      return;
    }

    if (
      Number(formData.amount) < 1000
    ) {
      alert(
        "Loan amount must be at least ₹1000"
      );
      return;
    }

    if (
      formData.purpose.trim().length < 10
    ) {
      alert(
        "Loan purpose must contain at least 10 characters"
      );
      return;
    }

    try {
      setLoading(true);

      const res = await API.post(
        "/applications",
        formData
      );

      const applicationId =
        res.data.application.id;

        setReferenceId(applicationId);
        setShowSuccessModal(true);

      setFormData({
        name: "",
        mobile: "",
        amount: "",
        purpose: "",
        language: "English",
      });
    } catch (error) {
      console.error(error);

      alert(
        error?.response?.data?.message ||
          "Failed to submit application"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8">
        <div className="mb-6">
        <Link
            to="/"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
        >
            <ArrowLeft size={18} />
            Back to Home
        </Link>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800">
            Apply For Loan
          </h1>

          <p className="text-gray-500 mt-2">
            Fill in your details and submit
            your loan application.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* Name */}

          <div>
            <label className="block font-medium mb-2">
              Applicant Name
            </label>

            <div className="relative">
              <User
                size={20}
                className="absolute left-3 top-3 text-gray-400"
              />

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
                className="w-full border rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Mobile */}

          <div>
            <label className="block font-medium mb-2">
              Mobile Number
            </label>

            <div className="relative">
              <Phone
                size={20}
                className="absolute left-3 top-3 text-gray-400"
              />

              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="9876543210"
                maxLength={10}
                required
                className="w-full border rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Amount */}

          <div>
            <label className="block font-medium mb-2">
              Loan Amount (₹)
            </label>

            <div className="relative">
              <IndianRupee
                size={20}
                className="absolute left-3 top-3 text-gray-400"
              />

              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="Enter loan amount"
                min="1000"
                required
                className="w-full border rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Purpose */}

          <div>
            <label className="block font-medium mb-2">
              Loan Purpose
            </label>

            <div className="relative">
              <FileText
                size={20}
                className="absolute left-3 top-3 text-gray-400"
              />

              <textarea
                name="purpose"
                value={formData.purpose}
                onChange={handleChange}
                rows="4"
                placeholder="Education, Medical, Business, Personal..."
                required
                className="w-full border rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Language */}

          <div>
            <label className="block font-medium mb-2">
              Preferred Language
            </label>

            <div className="relative">
              <Languages
                size={20}
                className="absolute left-3 top-3 text-gray-400"
              />

              <select
                name="language"
                value={formData.language}
                onChange={handleChange}
                required
                className="w-full border rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="English">
                  English
                </option>
                <option value="Hindi">
                  Hindi
                </option>
                <option value="Marathi">
                  Marathi
                </option>
                <option value="Tamil">
                  Tamil
                </option>
                <option value="Telugu">
                  Telugu
                </option>
              </select>
            </div>
          </div>

          {/* Submit */}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            {loading
              ? "Submitting..."
              : "Submit Application"}
          </button>
        </form>

        {/* Success Card */}

        {showSuccessModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-8 text-center text-white">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <Check
                    size={40}
                    className="text-green-600"
                />
                </div>

                <h2 className="text-3xl font-bold">
                Application Submitted
                </h2>

                <p className="mt-2 text-green-100">
                Your loan request has been received
                successfully
                </p>
            </div>

            <div className="p-6">
                <div className="bg-slate-50 border rounded-2xl p-4">
                <p className="text-xs text-gray-500 mb-2">
                    APPLICATION REFERENCE ID
                </p>

                <p className="font-mono text-sm break-all font-bold">
                    {referenceId}
                </p>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mt-4">
                <p className="text-sm text-yellow-800">
                    Save this Reference ID. You will
                    need it later to track your loan
                    application status.
                </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-3 mt-6">
                <button
                    onClick={copyReferenceId}
                    className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
                >
                    {copied ? (
                    <>
                        <Check size={18} />
                        Copied
                    </>
                    ) : (
                    <>
                        <Copy size={18} />
                        Copy Reference ID
                    </>
                    )}
                </button>

                <button
                    onClick={() =>
                    setShowSuccessModal(false)
                    }
                    className="border border-gray-300 hover:bg-gray-100 py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
                >
                    <X size={18} />
                    Close
                </button>
                </div>
            </div>
            </div>
        </div>
        )}
      </div>
    </div>
  );
}

export default ApplyLoan;