import React, { useState } from "react";
import authService from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    setError("");
    setLoading(true);
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const currentUser = await authService.getCurrentUser();
        if (currentUser) dispatch(login({ currentUser }));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    // 🌟 FIX: 'w-full' add kiya aur min-h hata diya taaki flexbox isko center mein stretch kare
    <div className="flex items-center justify-center w-full py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="w-full max-w-lg bg-white rounded-3xl p-8 sm:p-12 shadow-[0_8px_30px_rgb(147,51,234,0.08)] border border-purple-100/50">
        <div className="mb-6 flex justify-center">
          <span className="inline-block">
            <Logo width="60px" />
          </span>
        </div>

        <h2 className="text-center text-3xl font-extrabold text-gray-900 tracking-tight">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-500 font-medium">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="text-purple-600 font-bold transition-all duration-200 hover:text-purple-800 hover:underline"
          >
            Sign In
          </Link>
        </p>

        {error && (
          <div className="mt-6 bg-red-50 border border-red-200 text-red-600 p-3 rounded-xl text-center text-sm font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(create)} className="mt-8">
          <div className="space-y-6">
            <Input
              label="Full Name"
              placeholder="e.g. Hunter Op"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none bg-gray-50/50"
              {...register("name", {
                required: true,
              })}
            />

            <Input
              label="Email Address"
              placeholder="hunter@example.com"
              type="email"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none bg-gray-50/50"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />

            <Input
              label="Password"
              type="password"
              placeholder="Create a strong password"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none bg-gray-50/50"
              {...register("password", {
                required: true,
              })}
            />

            <div className="pt-2">
              <Button
                type="submit"
                disabled={loading}
                className={`w-full py-4 rounded-xl text-lg font-bold text-white shadow-[0_8px_20px_rgb(147,51,234,0.3)] transition-all duration-300 active:scale-95 
                    ${
                      loading
                        ? "bg-purple-400 cursor-not-allowed"
                        : "bg-linear-to-r from-purple-600 to-indigo-600 hover:-translate-y-1 hover:shadow-[0_12px_25px_rgb(147,51,234,0.4)]"
                    }`}
              >
                {loading ? "Creating Account..." : "Create Account 🚀"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
