"use client";

import { authClient } from "@/lib/auth-client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  HeartHandshake,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  X,
  Info,
} from "lucide-react";

export default function LoginForm() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Toast States
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"error" | "info">("info");

  // Form Data
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Automatically Hide Toast
  useEffect(() => {
    if (!showToast) return;

    const timer = setTimeout(() => {
      setShowToast(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [showToast, toastMessage]);

  // Show Toast Notification
  const showNotification = (
    message: string,
    type: "error" | "info" = "info",
  ) => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
  };

  // Handle Input Change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Forgot Password (Dummy)
  const handleForgotPassword = () => {
    showNotification("Password reset feature is coming soon.", "info");
  };

  // Login with Email and Password
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setShowToast(false);

    try {
      const { error } = await authClient.signIn.email({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        showNotification(
          error.message || "Invalid email or password.",
          "error",
        );
        return;
      }

      router.push("/event");
      router.refresh();
    } catch (error) {
      console.error("Login error:", error);

      showNotification("Something went wrong. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      data-auth-page
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-[#e8f5ec] via-[#f5faf5] to-[#e0f2e5] px-4 py-10 text-[#17251d]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-1/4 size-72 rounded-full bg-emerald-300/25 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 bottom-0 size-80 rounded-full bg-lime-300/20 blur-3xl"
      />
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-5 right-5 z-50 animate-in slide-in-from-right-5 fade-in duration-300">
          <div
            className={`flex items-center gap-3 bg-white border rounded-xl shadow-lg px-4 py-3 min-w-[300px] max-w-[calc(100vw-40px)] ${
              toastType === "error" ? "border-red-200" : "border-[#dce4ef]"
            }`}
          >
            {/* Toast Icon */}
            <div
              className={`w-9 h-9 shrink-0 rounded-full flex items-center justify-center ${
                toastType === "error" ? "bg-red-50" : "bg-emerald-50"
              }`}
            >
              {toastType === "error" ? (
                <X size={18} className="text-red-500" />
              ) : (
                <Info size={18} className="text-[#0d998b]" />
              )}
            </div>

            {/* Toast Message */}
            <div className="flex-1 min-w-0">
              <p
                className={`text-[12px] font-bold ${
                  toastType === "error" ? "text-red-600" : "text-[#101828]"
                }`}
              >
                {toastType === "error" ? "Login Failed!" : "Coming Soon!"}
              </p>

              <p className="text-[10px] text-[#64748b] mt-1 break-words">
                {toastMessage}
              </p>
            </div>

            {/* Close Toast */}
            <button
              type="button"
              onClick={() => setShowToast(false)}
              className="text-[#94a3b8] hover:text-[#101828] transition"
              aria-label="Close notification"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Login Card */}
      <div className="relative w-full max-w-md rounded-3xl border border-[#dce7df] bg-white px-6 py-8 shadow-[0_24px_70px_rgba(6,78,53,0.13)] sm:px-9 sm:py-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#087443] to-[#25c45c] shadow-md shadow-emerald-200">
            <HeartHandshake size={24} className="text-white" />
          </div>

          <h1 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-[#17251d]">
            Welcome Back
          </h1>

          <p className="mt-2 text-sm leading-6 text-[#68776d]">
            Sign in to organize and join community drives
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-[17px]">
          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-bold text-[#17251d]">
              Email
            </label>

            <div className="relative">
              <Mail
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748b]"
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@example.com"
                required
                autoComplete="email"
                className="h-12 w-full rounded-xl border border-[#dce7df] bg-[#f8fbf9] pl-10 pr-3 text-sm text-[#334155] outline-none transition placeholder:text-[#819187] focus:border-[#078f4c] focus:ring-4 focus:ring-emerald-700/10"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-sm font-bold text-[#17251d]">
                Password
              </label>

              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-xs font-semibold text-[#087443] transition hover:text-[#056b39]"
              >
                Forgot password?
              </button>
            </div>

            <div className="relative">
              <Lock
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748b]"
              />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                autoComplete="current-password"
                className="h-12 w-full rounded-xl border border-[#dce7df] bg-[#f8fbf9] pl-10 pr-11 text-sm text-[#334155] outline-none transition placeholder:text-[#819187] focus:border-[#078f4c] focus:ring-4 focus:ring-emerald-700/10"
              />

              {/* Show / Hide Password */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#68776d] transition hover:text-[#087443]"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#078f4c] to-[#25c45c] text-sm font-bold text-white shadow-md shadow-emerald-900/15 transition hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Signing In..." : "Sign In"}

            {!loading && <ArrowRight size={15} />}
          </button>
        </form>

        {/* Register Link */}
        <div className="text-center mt-6">
          <p className="text-sm text-[#68776d]">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="ml-1 font-bold text-[#087443] transition hover:text-[#056b39]"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
