import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";
import {
  Users,
  IndianRupee,
  Clock,
  CheckCircle,
  XCircle,
  Filter,
  ArrowLeft,
} from "lucide-react";

function Dashboard() {
  const [summary, setSummary] = useState({
    totalApplications: 0,
    totalAmount: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
  });

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      const summaryRes = await API.get(
        "/applications/summary"
      );

      const applicationsRes = await API.get(
        filter
          ? `/applications?status=${filter}`
          : "/applications"
      );

      setSummary(summaryRes.data);
      setApplications(applicationsRes.data);
    } catch (error) {
      console.error("Dashboard Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [filter]);

  const updateStatus = async (id, status) => {
    try {
      await API.patch(
        `/applications/${id}/status`,
        {
          status,
        }
      );

      setApplications((prev) =>
        prev.map((app) =>
          app.id === id
            ? { ...app, status }
            : app
        )
      );

      setSummary((prev) => ({
        ...prev,
        pending:
          prev.pending > 0
            ? prev.pending - 1
            : 0,
        approved:
          status === "approved"
            ? prev.approved + 1
            : prev.approved,
        rejected:
          status === "rejected"
            ? prev.rejected + 1
            : prev.rejected,
      }));
    } catch (error) {
      console.error(error);
      alert("Failed to update status");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="max-w-7xl mx-auto p-4 md:p-6">
        {/* Header */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800">
            Loan Dashboard
            </h1>

            <p className="text-gray-500 mt-2">
            Manage and review all loan applications
            </p>
        </div>

        <Link
            to="/"
            className="inline-flex items-center gap-2 bg-white border px-5 py-3 rounded-xl shadow hover:bg-slate-50 transition font-medium"
        >
            <ArrowLeft size={18} />
            Back to Home
        </Link>
        </div>

        {/* Stats Cards */}

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow p-5">
            <Users className="text-blue-600 mb-3" />

            <p className="text-gray-500 text-sm">
              Applications
            </p>

            <h2 className="text-2xl md:text-3xl font-bold">
              {summary.totalApplications}
            </h2>
          </div>

          <div className="bg-white rounded-xl shadow p-5">
            <IndianRupee className="text-green-600 mb-3" />

            <p className="text-gray-500 text-sm">
              Total Amount
            </p>

            <h2 className="text-2xl md:text-3xl font-bold">
              ₹{summary.totalAmount}
            </h2>
          </div>

          <div className="bg-white rounded-xl shadow p-5">
            <Clock className="text-yellow-500 mb-3" />

            <p className="text-gray-500 text-sm">
              Pending
            </p>

            <h2 className="text-2xl md:text-3xl font-bold">
              {summary.pending}
            </h2>
          </div>

          <div className="bg-white rounded-xl shadow p-5">
            <CheckCircle className="text-green-500 mb-3" />

            <p className="text-gray-500 text-sm">
              Approved
            </p>

            <h2 className="text-2xl md:text-3xl font-bold">
              {summary.approved}
            </h2>
          </div>

          <div className="bg-white rounded-xl shadow p-5">
            <XCircle className="text-red-500 mb-3" />

            <p className="text-gray-500 text-sm">
              Rejected
            </p>

            <h2 className="text-2xl md:text-3xl font-bold">
              {summary.rejected}
            </h2>
          </div>
        </div>

        {/* Filter */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h2 className="text-xl font-semibold">
            Applications
          </h2>

          <div className="flex items-center gap-2">
            <Filter size={18} />

            <select
              value={filter}
              onChange={(e) =>
                setFilter(e.target.value)
              }
              className="border rounded-lg px-4 py-2 bg-white"
            >
              <option value="">
                All Status
              </option>

              <option value="pending">
                Pending
              </option>

              <option value="approved">
                Approved
              </option>

              <option value="rejected">
                Rejected
              </option>
            </select>
          </div>
        </div>

        {/* Applications */}

        <div className="bg-white rounded-xl shadow overflow-hidden">
          {loading ? (
            <div className="p-10 text-center">
              Loading...
            </div>
          ) : applications.length === 0 ? (
            <div className="p-10 text-center">
              No Applications Found
            </div>
          ) : (
            <>
              {/* Desktop Table */}

              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="p-4 text-left">
                        Name
                      </th>

                      <th className="p-4 text-left">
                        Mobile
                      </th>

                      <th className="p-4 text-left">
                        Amount
                      </th>

                      <th className="p-4 text-left">
                        Language
                      </th>

                      <th className="p-4 text-left">
                        Purpose
                      </th>

                      <th className="p-4 text-left">
                        Date
                      </th>

                      <th className="p-4 text-left">
                        Status
                      </th>

                      <th className="p-4 text-left">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {applications.map((app) => (
                      <tr
                        key={app.id}
                        className="border-t hover:bg-slate-50"
                      >
                        <td className="p-4 font-medium">
                          {app.name}
                        </td>

                        <td className="p-4">
                          {app.mobile}
                        </td>

                        <td className="p-4">
                          ₹{app.amount}
                        </td>

                        <td className="p-4">
                          {app.language}
                        </td>

                        <td className="p-4 max-w-xs">
                          {app.purpose}
                        </td>

                        <td className="p-4">
                          {new Date(
                            app.created_at
                          ).toLocaleDateString()}
                        </td>

                        <td className="p-4">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                              app.status ===
                              "approved"
                                ? "bg-green-100 text-green-700"
                                : app.status ===
                                  "rejected"
                                ? "bg-red-100 text-red-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {app.status}
                          </span>
                        </td>

                        <td className="p-4">
                          {app.status ===
                          "pending" ? (
                            <div className="flex gap-2">
                              <button
                                onClick={() =>
                                  updateStatus(
                                    app.id,
                                    "approved"
                                  )
                                }
                                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                              >
                                Approve
                              </button>

                              <button
                                onClick={() =>
                                  updateStatus(
                                    app.id,
                                    "rejected"
                                  )
                                }
                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                              >
                                Reject
                              </button>
                            </div>
                          ) : (
                            <span className="text-gray-400">
                              Completed
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}

              <div className="lg:hidden p-4 space-y-4">
                {applications.map((app) => (
                  <div
                    key={app.id}
                    className="border rounded-xl p-4 shadow-sm"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-lg">
                          {app.name}
                        </h3>

                        <p className="text-gray-500 text-sm">
                          {new Date(
                            app.created_at
                          ).toLocaleDateString()}
                        </p>
                      </div>

                      <span
                        className={`px-3 py-1 rounded-full text-xs ${
                          app.status ===
                          "approved"
                            ? "bg-green-100 text-green-700"
                            : app.status ===
                              "rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {app.status}
                      </span>
                    </div>

                    <div className="mt-4 space-y-2 text-sm">
                      <p>
                        <strong>
                          📞 Mobile:
                        </strong>{" "}
                        {app.mobile}
                      </p>

                      <p>
                        <strong>
                          💰 Amount:
                        </strong>{" "}
                        ₹{app.amount}
                      </p>

                      <p>
                        <strong>
                          🌐 Language:
                        </strong>{" "}
                        {app.language}
                      </p>

                      <p>
                        <strong>
                          📝 Purpose:
                        </strong>{" "}
                        {app.purpose}
                      </p>
                    </div>

                    {app.status ===
                      "pending" && (
                      <div className="flex gap-2 mt-4">
                        <button
                          onClick={() =>
                            updateStatus(
                              app.id,
                              "approved"
                            )
                          }
                          className="flex-1 bg-green-600 text-white py-2 rounded-lg"
                        >
                          Approve
                        </button>

                        <button
                          onClick={() =>
                            updateStatus(
                              app.id,
                              "rejected"
                            )
                          }
                          className="flex-1 bg-red-600 text-white py-2 rounded-lg"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;