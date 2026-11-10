import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "../../Shared/context/AdminAuthContext";
import { adminApi } from "../../Shared/utils/api";
// 1. Yahan Eye aur EyeOff add kiye hain
import { Lock, Mail, AlertCircle, LockKeyhole, Eye, EyeOff } from "lucide-react";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  // 2. Yeh state add ki hai password show/hide ke liye
  const [showPassword, setShowPassword] = useState(false);

  const { login, isAuthenticated } = useAdminAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/admin/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data } = await adminApi.login({ email, password });
      login(data, data.token);
      navigate("/admin/dashboard");
    } catch (error) {
      setError(
        error.response?.data?.message || "Login failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-[#F9F6F0] px-4 py-12 relative overflow-hidden"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      {/* Google Font */}
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');`}
      </style>

      {/* --- BACKGROUND DECORATIVE SHAPES --- */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-16 w-96 h-96 rounded-full border-[40px] border-[#FFFFFF] opacity-60"></div>
        <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 w-[500px] h-[500px] rounded-full bg-[#EBE5D9] opacity-40"></div>
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-72 h-72 rounded-full bg-[#FFFFFF] opacity-50 blur-3xl"></div>
      </div>

      {/* --- LOGIN CARD --- */}
      <div className="w-full max-w-[420px] relative z-10">
        {/* Header Section */}
        <div className="text-center mb-8 flex flex-col items-center">
          {/* Brand Icon */}
          <div className="w-16 h-16 bg-[#FFFFFF] border border-[#EBE5D9] rounded-2xl flex items-center justify-center shadow-sm mb-5">
            <LockKeyhole
              size={32}
              className="text-[#D48C70]"
              strokeWidth={1.8}
            />
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#1A1816]">
            Admin Login
          </h2>
          <p className="mt-2 text-[15px] font-medium text-[#706A63]">
            Sign in to manage your courses
          </p>
        </div>

        {/* Form Card */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-3xl border border-[#EBE5D9] bg-[#FFFFFF] p-7 sm:p-9 shadow-[0_8px_30px_rgba(235,229,217,0.5)]"
        >
          {/* Error Message */}
          {error && (
            <div className="flex items-start gap-3 rounded-xl bg-[#D48C70]/10 px-4 py-3 text-sm text-[#D48C70] border border-[#D48C70]/20">
              <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
              <span className="font-medium">{error}</span>
            </div>
          )}

          <div className="space-y-5">
            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-[13px] font-bold text-[#1A1816] mb-2 uppercase tracking-wide"
              >
                Email Address
              </label>
              <div className="relative group">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <Mail className="h-5 w-5 text-[#706A63] group-focus-within:text-[#D48C70] transition-colors" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-xl border border-[#EBE5D9] bg-[#F9F6F0] py-3.5 pl-11 pr-4 text-[15px] text-[#1A1816] font-medium placeholder:text-[#706A63]/60 focus:border-[#D48C70] focus:bg-[#FFFFFF] focus:outline-none focus:ring-4 focus:ring-[#D48C70]/10 transition-all duration-200"
                  placeholder="admin@learnflow.com"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label
                  htmlFor="password"
                  className="block text-[13px] font-bold text-[#1A1816] uppercase tracking-wide"
                >
                  Password
                </label>
                <a
                  href="#"
                  className="text-[12px] font-semibold text-[#D48C70] hover:text-[#1A1816] transition-colors"
                >
                  Forgot?
                </a>
              </div>
              <div className="relative group">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <Lock className="h-5 w-5 text-[#706A63] group-focus-within:text-[#D48C70] transition-colors" />
                </div>

                <input
                  id="password"
                  name="password"
                  // Yahan type change hoga based on state
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  // pr-12 add kiya hai taake text eye button ke neeche na aaye
                  className="block w-full rounded-xl border border-[#EBE5D9] bg-[#F9F6F0] py-3.5 pl-11 pr-12 text-[15px] text-[#1A1816] font-medium placeholder:text-[#706A63]/60 focus:border-[#D48C70] focus:bg-[#FFFFFF] focus:outline-none focus:ring-4 focus:ring-[#D48C70]/10 transition-all duration-200"
                  placeholder="••••••••"
                />

                {/* Eye Button (Right Side) */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-4 text-[#706A63] hover:text-[#D48C70] focus:outline-none transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#D48C70] px-5 py-3.5 text-[15px] font-bold text-[#FFFFFF] shadow-md shadow-[#D48C70]/20 transition-all duration-200 hover:bg-[#c47a5e] hover:shadow-lg hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-[#D48C70]/30 disabled:opacity-70 disabled:hover:translate-y-0 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Signing in...
              </span>
            ) : (
              "Sign in to Dashboard"
            )}
          </button>
        </form>

        {/* Footer Link */}
        <p className="text-center mt-8 text-[14px] font-medium text-[#706A63]">
          Not an admin?{" "}
          <a
            href="/Home"
            className="text-[#1A1816] font-bold hover:text-[#D48C70] transition-colors"
          >
            Return to Home
          </a>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;