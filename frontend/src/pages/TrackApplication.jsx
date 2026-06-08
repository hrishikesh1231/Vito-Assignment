import { useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";
import {
  Search,
  ArrowLeft,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";

function TrackApplication() {
  const [referenceId, setReferenceId] =
    useState("");

  const [application, setApplication] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!referenceId.trim()) {
      setError("Please enter Reference ID");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await API.get(
        `/applications/${referenceId}`
      );

      setApplication(res.data);
    } catch (err) {
      console.error(err);

      setApplication(null);

      setError(
        "Application not found. Please check your Reference ID."
      );
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "approved":
        return (
          <span className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full font-medium">
            <CheckCircle size={18} />
            Approved
          </span>
        );

      case "rejected":
        return (
          <span className="flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full font-medium">
            <XCircle size={18} />
            Rejected
          </span>
        );

      default:
        return (
          <span className="flex items-center gap-2 bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full font-medium">
            <Clock size={18} />
            Pending
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Back Button */}

        <Link
          to="/"
          className="inline-flex items-center gap-2 mb-6 bg-white px-4 py-2 rounded-lg shadow hover:bg-gray-50"
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>

        {/* Header */}

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center text-slate-800">
            Track Application
          </h1>

          <p className="text-center text-gray-500 mt-2">
            Enter your Reference ID to
            check loan status
          </p>

          {/* Search Form */}

          <form
            onSubmit={handleSearch}
            className="mt-8"
          >
            <div className="flex flex-col md:flex-row gap-3">
              <input
                type="text"
                value={referenceId}
                onChange={(e) =>
                  setReferenceId(
                    e.target.value
                  )
                }
                placeholder="Enter Reference ID"
                className="flex-1 border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 flex items-center justify-center gap-2"
              >
                <Search size={18} />

                {loading
                  ? "Searching..."
                  : "Check Status"}
              </button>
            </div>
          </form>

          {/* Error */}

          {error && (
            <div className="mt-4 bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl">
              {error}
            </div>
          )}
        </div>

        {/* Result Card */}

        {application && (
          <div className="mt-8 bg-white rounded-2xl shadow-lg p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                Application Details
              </h2>

              {getStatusBadge(
                application.status
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-gray-500 text-sm">
                  Applicant Name
                </p>

                <p className="font-semibold text-lg">
                  {application.name}
                </p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">
                  Mobile Number
                </p>

                <p className="font-semibold text-lg">
                  {application.mobile}
                </p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">
                  Loan Amount
                </p>

                <p className="font-semibold text-lg">
                  ₹{application.amount}
                </p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">
                  Preferred Language
                </p>

                <p className="font-semibold text-lg">
                  {application.language}
                </p>
              </div>

              <div className="md:col-span-2">
                <p className="text-gray-500 text-sm">
                  Loan Purpose
                </p>

                <p className="font-semibold text-lg">
                  {application.purpose}
                </p>
              </div>

              <div className="md:col-span-2">
                <p className="text-gray-500 text-sm">
                  Reference ID
                </p>

                <p className="font-mono break-all font-bold">
                  {application.id}
                </p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">
                  Submitted On
                </p>

                <p className="font-semibold">
                  {new Date(
                    application.created_at
                  ).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TrackApplication;