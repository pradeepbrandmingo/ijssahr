import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";
import { FaEnvelope, FaLock, FaArrowRight, FaShieldAlt, FaUserTie, FaUsers, FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await API.post("/auth/login", formData);
      const { user, accessToken } = response.data.data;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("user", JSON.stringify(user));

      navigate("/admin/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message || "Invalid credentials or login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-100/70 font-sans">
      <div className="max-w-md w-full space-y-6 bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-slate-200">
        <div className="text-center">
          {/* Official Journal Logo */}
          <div className="mx-auto h-16 w-16 mb-3 p-1 rounded-2xl bg-white border border-slate-200 shadow-md flex items-center justify-center overflow-hidden">
            <img
              src="/ijaemr-fab-logo.png"
              alt="IJSSAHR Logo"
              className="h-full w-full object-contain"
            />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Portal Access
          </h2>
          <p className="mt-1.5 text-[11px] font-medium text-slate-500 whitespace-nowrap">
            Sign in with your account credentials to access the management portal
          </p>
        </div>

        {/* Read-Only Non-Clickable Supported Roles Container */}
        <div className="space-y-1.5">
          <p className="text-[11px] font-semibold text-slate-400 text-center uppercase tracking-wider">
            Authorized Account Roles
          </p>
          <div className="flex items-center justify-center gap-1.5 p-1.5 bg-slate-100/80 rounded-xl border border-slate-200">
            <div className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-[11px] font-medium text-slate-700 bg-white shadow-xs border border-slate-200/80">
              <FaShieldAlt className="text-[10px] text-slate-500" /> SuperAdmin
            </div>

            <div className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-[11px] font-medium text-slate-700 bg-white shadow-xs border border-slate-200/80">
              <FaUserTie className="text-[10px] text-slate-500" /> Employee
            </div>

            <div className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-[11px] font-medium text-slate-700 bg-white shadow-xs border border-slate-200/80">
              <FaUsers className="text-[10px] text-slate-500" /> Author
            </div>
          </div>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium text-center">
            {error}
          </div>
        )}

        <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-xs font-medium text-slate-900 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-600 text-sm">
                <FaEnvelope />
              </div>
              <input
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter registered email address..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-normal text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all placeholder:text-slate-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-900 mb-1.5">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-600 text-sm">
                <FaLock />
              </div>
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-normal text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all placeholder:text-slate-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer"
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FaEyeSlash className="text-sm" /> : <FaEye className="text-sm" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-sm rounded-xl shadow-lg shadow-blue-600/25 transition-all cursor-pointer disabled:opacity-50"
          >
            {loading ? "Authenticating..." : "Sign In to Dashboard"}
            {!loading && <FaArrowRight className="text-base" />}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
