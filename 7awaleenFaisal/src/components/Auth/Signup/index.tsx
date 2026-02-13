"use client"
import Breadcrumb from "@/components/Common/Breadcrumb";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useRegisterMutation, useGoogleLoginMutation } from "@/redux/features/Api.slice";
import toast from "react-hot-toast";
import { GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/redux/features/Auth.slice";
import Cookies from "js-cookie";

const Signup = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [register, { isLoading }] = useRegisterMutation();
  const [googleLoginApi] = useGoogleLoginMutation();

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      const { credential } = credentialResponse;
      const res = await googleLoginApi({ token: credential }).unwrap();
      dispatch(setCredentials(res));
      
      // Set Cookies
      Cookies.set("token", res.accessToken, { expires: 1 });
      Cookies.set("userType", res.user?.userType || "customer", { expires: 1 });

      toast.success("Logged in successfully with Google");
      if (res.user?.userType === "admin") {
          router.push("/admin/dashboard");
      } else {
          router.push("/");
      }
    } catch (error: any) {
        console.error("Google login failed", error);
        toast.error(error?.data?.error || "Google login failed");
    }
  };

  const handleGoogleError = () => {
    toast.error("Google Login Failed");
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    formattedAddress: "",
    userType: "customer",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    
    try {
        const { confirmPassword, ...registerData } = formData;
         await register(registerData).unwrap();
         toast.success("Account created successfully. Please login.");
         router.push("/signin");
    } catch (err: any) {
        console.error("Registration validation failed:", err);
        toast.error(err?.data?.error || "Registration failed");
    }
  };


  


  return (
    <>
      <Breadcrumb title={"Signup"} pages={["Signup"]} />
      <section className="overflow-hidden py-20 bg-gray-2">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="max-w-[570px] w-full mx-auto rounded-xl bg-white  dark:bg-[#121212]   shadow-1 p-4 sm:p-7.5 xl:p-11">
            <div className="text-center mb-11">
              <h2 className="font-semibold text-xl sm:text-2xl xl:text-heading-5  text-dark dark:text-[#8b8b8b] dark:text-[#E0E0E0]  mb-1.5">
                Create an Account
              </h2>
              <p>Enter your detail below</p>
            </div>

            <div className="flex flex-col gap-4.5 mb-6">
               <div className="flex justify-center w-full">
                  <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={handleGoogleError}
                    useOneTap
                  />
               </div>
               <div className="relative z-1 block font-medium text-center mt-4.5">
                  <span className="block absolute -z-1 left-0 top-1/2 h-px w-full bg-gray-3"></span>
                  <span className="inline-block px-3 bg-white  dark:bg-[#121212]  ">
                    Or
                  </span>
               </div>
            </div>

            <div className="mt-5.5">
              <form onSubmit={onSubmit}>
                <div className="mb-5">
                  <label htmlFor="name" className="block mb-2.5">
                    Full Name <span className="text-red">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="rounded-lg border border-gray-3 bg-gray-1 placeholder: text-dark dark:text-[#8b8b8b] dark:text-[#E0E0E0] -5 w-full py-3 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                    required
                  />
                </div>

                <div className="mb-5">
                  <label htmlFor="email" className="block mb-2.5">
                    Email Address <span className="text-red">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    className="rounded-lg border border-gray-3 bg-gray-1 placeholder: text-dark dark:text-[#8b8b8b] dark:text-[#E0E0E0] -5 w-full py-3 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                    required
                  />
                </div>

                <div className="mb-5">
                    <label htmlFor="phone" className="block mb-2.5">
                        Phone <span className="text-red">*</span>
                    </label>
                    <input
                        type="text"
                        name="phone"
                        id="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter your phone number"
                        className="rounded-lg border border-gray-3 bg-gray-1 placeholder: text-dark dark:text-[#8b8b8b] dark:text-[#E0E0E0] -5 w-full py-3 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                        required
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="formattedAddress" className="block mb-2.5">
                        Address <span className="text-red">*</span>
                    </label>
                    <input
                        type="text"
                        name="formattedAddress"
                        id="formattedAddress"
                        value={formData.formattedAddress}
                        onChange={handleChange}
                        placeholder="Enter your address"
                        className="rounded-lg border border-gray-3 bg-gray-1 placeholder: text-dark dark:text-[#8b8b8b] dark:text-[#E0E0E0] -5 w-full py-3 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                        required
                    />
                </div>
                
                <div className="mb-5">
                    <label htmlFor="userType" className="block mb-2.5">
                        Account Type <span className="text-red">*</span>
                    </label>
                    <div className="relative z-20 bg-transparent dark:bg-form-input">
                        <select
                            name="userType"
                            value={formData.userType}
                            onChange={handleChange}
                            className={`relative z-20 w-full appearance-none rounded border border-gray-3 bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-black dark:text-white`}
                        >
                            <option value="customer" className="text-body dark:text-bodydark">Customer</option>
                            <option value="vendor" className="text-body dark:text-bodydark">Vendor</option>
                            <option value="delivery" className="text-body dark:text-bodydark">Delivery</option>
                        </select>
                        <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                            <svg
                                className="fill-current"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g opacity="0.8">
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                                        fill=""
                                    ></path>
                                </g>
                            </svg>
                        </span>
                    </div>
                </div>

                <div className="mb-5">
                  <label htmlFor="password" className="block mb-2.5">
                    Password <span className="text-red">*</span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    autoComplete="new-password"
                    className="rounded-lg border border-gray-3 bg-gray-1 placeholder: text-dark dark:text-[#8b8b8b] dark:text-[#E0E0E0] -5 w-full py-3 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                    required
                  />
                </div>

                <div className="mb-5.5">
                  <label htmlFor="confirmPassword" className="block mb-2.5">
                    Re-type Password <span className="text-red">*</span>
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Re-type your password"
                    autoComplete="new-password"
                    className="rounded-lg border border-gray-3 bg-gray-1 placeholder: text-dark dark:text-[#8b8b8b] dark:text-[#E0E0E0] -5 w-full py-3 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center font-medium text-white bg-dark py-3 px-6 rounded-lg ease-out duration-200 hover:bg-blue mt-7.5 disabled:opacity-70"
                >
                  {isLoading ? "Creating Account..." : "Create Account"}
                </button>

                <p className="text-center mt-6">
                  Already have an account?
                  <Link
                    href="/signin"
                    className=" text-dark dark:text-[#8b8b8b] dark:text-[#E0E0E0]  ease-out duration-200 hover:text-blue pl-2"
                  >
                    Sign in Now
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;
