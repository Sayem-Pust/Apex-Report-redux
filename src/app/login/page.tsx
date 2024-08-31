"use client";

import { Poppins } from "next/font/google";
import LoginBanner from "@/components/Login/LoginBanner";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { login } from "@/lib/store/API/UserApis";
import { useRouter } from "next/navigation";

// Importing Poppins font
const PoppinsFont = Poppins({
  weight: "500",
  subsets: ["latin"],
});

export default function Login() {
  const { user, error } = useAppSelector((state) => state.users);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  const router = useRouter();
  const dispatch = useAppDispatch();

  // Function to validate the form fields
  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email format";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form submit handler
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (validate()) {
      dispatch(
        login({
          email,
          password,
        })
      );
    }
  };

  // Redirect to home if the user is logged in
  useEffect(() => {
    if (user?.id) {
      router.push("/");
    }
  }, [user, router]);

  return (
    <section className="overflow-hidden md:h-screen">
      <div className="py-5 h-full">
        <div className="container-fluid mx-auto h-full">
          <div className="flex flex-col items-center h-full gap-6 md:flex-row lg:gap-20">
            {/* First Section: Login Banner */}
            <LoginBanner />

            {/* Second Section: Login Form */}
            <div className="w-full lg:w-[60%] flex-grow items-center ml-4 md:ml-0">
              <div className="lg:mb-14">
                <h1 className="section-title">Welcome back!</h1>
                <div className="mt-1 text-left">
                  <p className="text-[#52525B] text-xs p-2 rounded">
                    Clarity gives you the blocks & components
                  </p>
                  <p className="text-[#52525B] text-xs p-2 -mt-2 rounded">
                    you need to create a truly professional website.
                  </p>
                </div>
              </div>

              {/* Form Section */}
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className={`${PoppinsFont.className}`}>
                  <label
                    htmlFor="email"
                    id="email-label"
                    className=" !text-black "
                  >
                    Email address
                    <span className="text-red-400" aria-hidden="true">
                      {" "}
                      *
                    </span>
                  </label>
                  <div className="mantine-TextInput-wrapper relative">
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      aria-label="Your email address"
                      placeholder="boss@gmail.com"
                      id="email"
                      type="text"
                      aria-invalid={errors.email ? "true" : "false"}
                      className={`w-full lg:w-[60%] p-2 border rounded outline-none ${
                        errors.email
                          ? "border-red-500 focus:border-red-500"
                          : "border-[#CBD5E1]"
                      }`}
                    />
                    {/* Display error message for email */}
                    {errors.email && (
                      <div className="flex items-center mt-2 gap-2 text-red-500 text-sm">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                        <span>{errors.email}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className={`${PoppinsFont.className}`}>
                  <label
                    htmlFor="password"
                    id="password-label"
                    className=" !text-black "
                  >
                    Password
                    <span className="text-red-400" aria-hidden="true">
                      {" "}
                      *
                    </span>
                  </label>
                  <div className="mantine-PasswordInput-wrapper relative">
                    <input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`w-full lg:w-[60%] p-2 border rounded outline-none ${
                        errors.password
                          ? "border-red-500 focus:border-red-500"
                          : "border-[#CBD5E1]"
                      }`}
                      id="password"
                      placeholder="anyPassword1971"
                      aria-label="Your password"
                      type="password"
                      aria-invalid={errors.password ? "true" : "false"}
                    />
                    {/* Display error message for password */}
                    {errors.password && (
                      <div className="flex items-center mt-2 gap-2 text-red-500 text-sm">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                        <span>{errors.password}</span>
                      </div>
                    )}
                  </div>
                </div>
                <button
                  className={`mt-0 lg:!mt-10 bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 disabled:bg-gray-400`}
                >
                  Sign In
                </button>
              </form>

              {/* Display error message from API */}
              {error && (
                <div className="mt-4 p-3 bg-red-100 text-red-700 rounded">
                  <p>{error}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
