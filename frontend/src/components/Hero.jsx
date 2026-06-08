import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  ShieldCheck,
  Clock3,
  BadgeCheck,
} from "lucide-react";

function Hero() {
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

const handleDashboardAccess = () => {
  if (password === "vito123") {
    setShowModal(false);
    setPassword("");

    Swal.fire({
      icon: "success",
      title: "Access Granted",
      text: "Redirecting to Dashboard...",
      timer: 1500,
      showConfirmButton: false,
    });

    setTimeout(() => {
      navigate("/dashboard");
    }, 1500);
  } else {
    Swal.fire({
      icon: "error",
      title: "Authentication Failed",
      text: "Incorrect administrator password.",
      footer:
        "Please verify the demo password and try again.",
      confirmButtonColor: "#2563eb",
    });
  }
};

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Side */}
            <div>
              <span className="bg-white/20 px-4 py-2 rounded-full text-sm">
                Trusted Loan Management Platform
              </span>

              <h1 className="text-4xl md:text-6xl font-bold leading-tight mt-6">
                Quick & Secure
                <span className="block text-yellow-300">
                  Loan Approval
                </span>
              </h1>

              <p className="mt-6 text-lg text-gray-200">
                Apply for loans online, track applications,
                and receive approval updates instantly.
                Fast, secure, and transparent.
              </p>

              <div className="flex flex-wrap gap-4 mt-8">
                <Link
                  to="/apply"
                  className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition"
                >
                  Apply Loan
                </Link>

                <button
                  onClick={() => setShowModal(true)}
                  className="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-black transition"
                >
                  Admin Dashboard
                </button>
              </div>
            </div>

            {/* Right Side */}
            <div>
              <img
                src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1200"
                alt="Loan Management"
                className="rounded-3xl shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        className="max-w-7xl mx-auto px-6 py-20"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Why Choose Vitto?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white shadow-lg hover:shadow-xl transition p-8 rounded-2xl">
            <ShieldCheck
              className="text-blue-600 mb-4"
              size={42}
            />

            <h3 className="font-bold text-xl mb-2">
              Secure Process
            </h3>

            <p className="text-gray-600">
              Your loan application data remains secure
              with industry-standard protection.
            </p>
          </div>

          <div className="bg-white shadow-lg hover:shadow-xl transition p-8 rounded-2xl">
            <Clock3
              className="text-blue-600 mb-4"
              size={42}
            />

            <h3 className="font-bold text-xl mb-2">
              Fast Approval
            </h3>

            <p className="text-gray-600">
              Quick processing and real-time status
              updates for every application.
            </p>
          </div>

          <div className="bg-white shadow-lg hover:shadow-xl transition p-8 rounded-2xl">
            <BadgeCheck
              className="text-blue-600 mb-4"
              size={42}
            />

            <h3 className="font-bold text-xl mb-2">
              Trusted Platform
            </h3>

            <p className="text-gray-600">
              Built for reliability with transparent
              application tracking and management.
            </p>
          </div>
        </div>
      </section>

      {/* Admin Password Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto text-4xl">
                🔐
              </div>

              <h2 className="text-2xl font-bold text-gray-800 mt-4">
                Admin Dashboard
              </h2>

              <p className="text-gray-500 mt-2">
                Please enter the administrator password to
                access the dashboard.
                </p>

                <div className="mt-4 bg-blue-50 border border-blue-200 rounded-xl p-3">
                <p className="text-sm text-blue-700">
                    <span className="font-semibold">
                    Demo Password:
                    </span>{" "}
                    <b>vito123</b>
                </p>
                </div>
            </div>

            <div className="mt-6">
              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                onKeyDown={(e) =>
                  e.key === "Enter" &&
                  handleDashboardAccess()
                }
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowModal(false);
                  setPassword("");
                }}
                className="flex-1 border border-gray-300 py-3 rounded-xl hover:bg-gray-100 transition"
              >
                Cancel
              </button>

              <button
                onClick={handleDashboardAccess}
                className="flex-1 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition"
              >
                Access Dashboard
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Hero;