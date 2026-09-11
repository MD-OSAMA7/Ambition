import {
  LockKeyhole,
  Mail,
  ArrowRight,
} from "lucide-react";

import { useState } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        `${API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Login failed"
        );
      }

      localStorage.setItem(
        "adminToken",
        data.token
      );

      localStorage.setItem(
        "adminUser",
        JSON.stringify(data.admin)
      );

      navigate("/admin/dashboard");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f3f7f6] px-4 py-8">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="mb-6 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center">
            <img
              src="/logo.png"
              alt="Ambition Classes"
              className="h-full w-full object-contain"
            />
          </div>

          <h1 className="mt-3 text-2xl font-extrabold text-[#00563f]">
            AMBITION CLASSES
          </h1>

          <p className="mt-1 text-xs font-semibold text-red-600">
            ADMIN PANEL
          </p>
        </div>

        {/* Login Card */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg sm:p-8">

          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800">
              Admin Login
            </h2>

            <p className="mt-1 text-xs text-gray-500">
              Sign in to manage your website.
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2.5 text-xs font-medium text-red-600">
              {error}
            </div>
          )}

          <form
            onSubmit={handleLogin}
            className="space-y-4"
          >
            {/* Email */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-gray-700">
                Email Address
              </label>

              <div className="relative">
                <Mail
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  placeholder="admin@ambitionclasses.com"
                  className="w-full rounded-md border border-gray-200 py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-[#00563f] focus:ring-2 focus:ring-[#00563f]/10"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-gray-700">
                Password
              </label>

              <div className="relative">
                <LockKeyhole
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  placeholder="Enter your password"
                  className="w-full rounded-md border border-gray-200 py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-[#00563f] focus:ring-2 focus:ring-[#00563f]/10"
                  required
                />
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-md bg-[#00563f] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#004832] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                "Signing in..."
              ) : (
                <>
                  Login
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Back Home */}
          <div className="mt-5 text-center">
            <Link
              to="/"
              className="text-xs font-medium text-gray-500 transition hover:text-[#00563f]"
            >
              ← Back to Website
            </Link>
          </div>
        </div>

        <p className="mt-4 text-center text-[10px] text-gray-400">
          Ambition Classes Admin Panel
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;