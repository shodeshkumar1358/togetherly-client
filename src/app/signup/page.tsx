"use client";

import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import Link from "next/link";
import {
  HeartHandshake,
  User,
  Mail,
  Image as ImageIcon,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  X,
  Check,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photoURL: "",
    password: "",
  });

  const passwordRules = [
    {
      label: "At least one uppercase letter (A-Z)",
      valid: /[A-Z]/.test(formData.password),
    },
    {
      label: "At least one lowercase letter (a-z)",
      valid: /[a-z]/.test(formData.password),
    },
    {
      label: "Minimum 6 characters length",
      valid: formData.password.length >= 6,
    },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrorMessage("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrorMessage("");

    const isPasswordValid = passwordRules.every((rule) => rule.valid);

    if (!isPasswordValid) {
      setErrorMessage("Please fulfill all password requirements.");
      return;
    }

    setIsLoading(true);

    try {
      // Better Auth registration
      const { data, error } = await authClient.signUp.email({
        name: formData.name.trim(),
        email: formData.email.trim(),
        image: formData.photoURL.trim() || undefined,
        password: formData.password,
      });

      if (error) {
        setErrorMessage(
          error.message || "Registration failed. Please try again.",
        );
        return;
      }

      console.log("Registration Successful:", data);

      // Redirect after successful registration
      router.push("/event");
      router.refresh();
    } catch (error) {
      console.error("Registration error:", error);

      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
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
      <div className="relative w-full max-w-lg rounded-3xl border border-[#dce7df] bg-white px-6 py-8 shadow-[0_24px_70px_rgba(6,78,53,0.13)] sm:px-9 sm:py-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#087443] to-[#25c45c] shadow-md shadow-emerald-200">
            <HeartHandshake size={24} className="text-white" />
          </div>

          <h1 className="mt-2 text-3xl font-extrabold leading-tight tracking-tight text-[#17251d]">
            Create Account
          </h1>

          <p className="mt-2 text-sm leading-6 text-[#68776d]">
            Join the community and start driving social change
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-[17px]">
          {/* Full Name */}
          <div>
            <label className="mb-2 block text-sm font-bold text-[#17251d]">
              Full Name
            </label>

            <div className="relative">
              <User
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748b]"
              />

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Tanvir Ahmed"
                required
                className="h-12 w-full rounded-xl border border-[#dce7df] bg-[#f8fbf9] pl-10 pr-3 text-sm text-[#334155] outline-none transition placeholder:text-[#819187] focus:border-[#078f4c] focus:ring-4 focus:ring-emerald-700/10"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-bold text-[#17251d]">
              Email Address
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
                className="h-12 w-full rounded-xl border border-[#dce7df] bg-[#f8fbf9] pl-10 pr-3 text-sm text-[#334155] outline-none transition placeholder:text-[#819187] focus:border-[#078f4c] focus:ring-4 focus:ring-emerald-700/10"
              />
            </div>
          </div>

          {/* Profile Photo URL */}
          <div>
            <label className="mb-2 block text-sm font-bold text-[#17251d]">
              Profile Photo URL
            </label>

            <div className="relative">
              <ImageIcon
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748b]"
              />

              <input
                type="url"
                name="photoURL"
                value={formData.photoURL}
                onChange={handleChange}
                placeholder="https://images.unsplash.com/..."
                className="h-12 w-full rounded-xl border border-[#dce7df] bg-[#f8fbf9] pl-10 pr-3 text-sm text-[#334155] outline-none transition placeholder:text-[#819187] focus:border-[#078f4c] focus:ring-4 focus:ring-emerald-700/10"
              />
            </div>

            <p className="mt-1 text-xs text-[#68776d]">
              Optional: Leave empty for default avatar
            </p>
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block text-sm font-bold text-[#17251d]">
              Password
            </label>

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
                className="h-12 w-full rounded-xl border border-[#dce7df] bg-[#f8fbf9] pl-10 pr-11 text-sm text-[#334155] outline-none transition placeholder:text-[#819187] focus:border-[#078f4c] focus:ring-4 focus:ring-emerald-700/10"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#68776d] transition hover:text-[#087443]"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>

            {/* Password Requirements */}
            <div className="mt-3 space-y-1">
              {passwordRules.map((rule) => (
                <div key={rule.label} className="flex items-center gap-2">
                  {rule.valid ? (
                    <Check size={11} className="text-[#0da38f]" />
                  ) : (
                    <X size={11} className="text-[#94a3b8]" />
                  )}

                  <span
                    className={`text-xs ${
                      rule.valid ? "text-[#087443]" : "text-[#68776d]"
                    }`}
                  >
                    {rule.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-[11px] font-medium text-red-600">
              {errorMessage}
            </div>
          )}

          {/* Register Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#078f4c] to-[#25c45c] text-sm font-bold text-white shadow-md shadow-emerald-900/15 transition hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? "Creating Account..." : "Register"}

            {!isLoading && <ArrowRight size={15} />}
          </button>
        </form>

        {/* Login Link */}
        <div className="text-center mt-5">
          <p className="text-sm text-[#68776d]">
            Already have an account?{" "}
            <Link
              href="/login"
              className="ml-1 font-bold text-[#087443] transition hover:text-[#056b39]"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
