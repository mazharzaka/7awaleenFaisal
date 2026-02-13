"use client";

import Breadcrumb from "@/components/Common/Breadcrumb";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLoginMutation, useGoogleLoginMutation, useVerifyOtpMutation } from "@/redux/features/Api.slice";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/redux/features/Auth.slice";
import toast from "react-hot-toast";
import { GoogleLogin } from "@react-oauth/google";
import Cookies from "js-cookie";

const Signin = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [login, { isLoading: isLoginLoading }] = useLoginMutation();
  const [googleLoginApi] = useGoogleLoginMutation();
  const [verifyOtp, { isLoading: isVerifyLoading }] = useVerifyOtpMutation();
  
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [step, setStep] = useState(1); // 1: Credentials, 2: OTP
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      const { credential } = credentialResponse;
      const res = await googleLoginApi({ token: credential }).unwrap();
      dispatch(setCredentials(res));
      
      // Set Cookies for Middleware
      Cookies.set("token", res.accessToken, { expires: 1 }); // 1 day
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

  const onLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormSubmitting(true);
    try {
      const formData = new FormData(e.currentTarget);
      const data = Object.fromEntries(formData.entries());
      const emailVal = data.email as string;
      const res = await login(data).unwrap();
      console.log(data);
      
      if (res.requireOtp) {
          toast.success(res.message);
          setEmail(emailVal);
          setStep(2);
      } else {
           // Fallback
           dispatch(setCredentials(res));
           
           // Set Cookies
           Cookies.set("token", res.accessToken, { expires: 1 });
           Cookies.set("userType", res.user?.userType || "customer", { expires: 1 });

           toast.success("Logged in successfully");
           if (res.user?.userType === "admin") {
             router.push("/AddStores");
           } else {
             router.push("/");
           }
      }
    } catch (error: any) {
      console.error("login error:", error);
      toast.error(error?.data?.error || "Login failed");
    } finally {
      setFormSubmitting(false);
    }
  };

  const onOtpSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
          const res = await verifyOtp({ email, otp }).unwrap();
          dispatch(setCredentials(res));

          // Set Cookies
          Cookies.set("token", res.accessToken, { expires: 1 });
          Cookies.set("userType", res.user?.userType || "customer", { expires: 1 });

          toast.success("OTP Verified! Logged in successfully.");
          if (res.user?.userType === "admin") {
               router.push("/Addstores");
          } else {
               router.push("/");
          }
      } catch(error: any) {
          toast.error(error?.data?.error || "Invalid OTP");
      }
  }

  return (
    <>
      <Breadcrumb title="Signin" pages={["Signin"]} />
      <section className="overflow-hidden py-20 bg-gray-2">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="max-w-[570px] w-full mx-auto rounded-xl bg-white  dark:bg-[#121212]   shadow-1 p-4 sm:p-7.5 xl:p-11">
            <div className="text-center mb-11">
              <h2 className="font-semibold text-xl sm:text-2xl xl:text-heading-5  text-dark dark:text-[#8b8b8b] dark:text-[#E0E0E0]  mb-1.5">
                {step === 1 ? "Sign In to Your Account" : "Enter Verification Code"}
              </h2>
              <p>{step === 1 ? "Enter your detail below" : `We sent a code to ${email}`}</p>
            </div>

            {step === 1 && (
            <>
                <div className="flex flex-col gap-4.5 mb-6">
                <div className="flex justify-center w-full">
                    <GoogleLogin
                        onSuccess={handleGoogleSuccess}
                        onError={handleGoogleError}
                        // useOneTap
                    />
                </div>
                <div className="relative z-1 block font-medium text-center mt-4.5">
                    <span className="block absolute -z-1 left-0 top-1/2 h-px w-full bg-gray-3"></span>
                    <span className="inline-block px-3 bg-white  dark:bg-[#121212]  ">
                        Or
                    </span>
                </div>
                </div>

                <form onSubmit={onLoginSubmit}>
                <div className="mb-5">
                    <label htmlFor="email" className="block mb-2.5">
                    Email
                    </label>
                    <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter your email"
                    className="rounded-lg border border-gray-3 bg-gray-1 placeholder: text-dark dark:text-[#8b8b8b] dark:text-[#E0E0E0] -5 w-full py-3 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                    required
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="password" className="block mb-2.5">
                    Password
                    </label>
                    <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter your password"
                    autoComplete="on"
                    className="rounded-lg border border-gray-3 bg-gray-1 placeholder: text-dark dark:text-[#8b8b8b] dark:text-[#E0E0E0] -5 w-full py-3 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                    required
                    />
                </div>

                <button
                    type="submit"
                    disabled={formSubmitting || isLoginLoading}
                    className="w-full flex justify-center font-medium text-white bg-dark py-3 px-6 rounded-lg ease-out duration-200 hover:bg-blue mt-7.5"
                >
                    {formSubmitting || isLoginLoading ? "Signing in..." : "Sign in to account"}
                </button>

                <p className="text-center mt-6">
                    Don't have an account?
                    <Link
                    href="/signup"
                    className=" text-dark dark:text-[#8b8b8b] dark:text-[#E0E0E0]  ease-out duration-200 hover:text-blue pl-2"
                    >
                    Create an account
                    </Link>
                </p>
                <p className="text-center mt-2">
                    Need to verify email?
                    <Link
                    href="/verify-email"
                    className="text-primary hover:underline pl-2"
                    >
                    Verify Here
                    </Link>
                </p>
                </form>
            </>
            )}

            {step === 2 && (
                <form onSubmit={onOtpSubmit}>
                    <div className="mb-5">
                        <label className="block mb-2 font-medium">One-Time Password</label>
                        <input
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder="Enter 6-digit code"
                            required
                            className="w-full rounded-lg border border-gray-3 bg-gray-1 placeholder: text-dark dark:text-[#8b8b8b] dark:text-[#E0E0E0] -5 w-full py-3 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isVerifyLoading}
                        className="w-full rounded-lg bg-primary py-3 px-6 text-white font-medium hover:bg-opacity-90 disabled:opacity-70"
                    >
                        {isVerifyLoading ? "Verifying..." : "Verify & Login"}
                    </button>
                    <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="w-full mt-4 text-primary hover:underline text-sm text-center"
                    >
                        Back to Login
                    </button>
                </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Signin;
