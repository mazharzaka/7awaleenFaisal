"use client";
import React, { useState, useEffect } from "react";
import { useSendOtpMutation, useVerifyOtpMutation } from "@/redux/features/Api.slice";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/redux/features/Auth.slice";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

const OTPVerification = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // 1: Email Input, 2: OTP Input
  const dispatch = useDispatch();
  const router = useRouter();

  const [sendOtp, { isLoading: isSending }] = useSendOtpMutation();
  const [verifyOtp, { isLoading: isVerifying }] = useVerifyOtpMutation();

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await sendOtp({ email }).unwrap();
      toast.success("OTP sent to your email");
      setStep(2);
    } catch (err: any) {
      toast.error(err?.data?.error || "Failed to send OTP");
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await verifyOtp({ email, otp }).unwrap();
      dispatch(setCredentials(res));

      // Set Cookies
      Cookies.set("token", res.accessToken, { expires: 1 });
      Cookies.set("userType", res.user?.userType || "customer", { expires: 1 });

      toast.success("OTP Verified! Logged in successfully.");
      if (res.user?.userType === "admin") {
          router.push("/AdminOrders");
      } else {
          router.push("/");
      }
    } catch (err: any) {
      toast.error(err?.data?.error || "Invalid OTP");
    }
  };

  return (
    <section className="overflow-hidden py-20 bg-gray-2">
      <div className="max-w-[570px] w-full mx-auto px-4">
        <div className="rounded-xl bg-white dark:bg-[#121212] shadow-1 p-8">
          <div className="text-center mb-8">
            <h2 className="font-semibold text-2xl mb-2 text-dark dark:text-white">
              {step === 1 ? "Verify Email" : "Enter OTP"}
            </h2>
            <p className="text-body-color dark:text-gray-400">
              {step === 1
                ? "Enter your email to receive a One-Time Password."
                : `Enter the code sent to ${email}`}
            </p>
          </div>

          {step === 1 ? (
            <form onSubmit={handleSendOtp}>
              <div className="mb-5">
                <label className="block mb-2 font-medium">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full rounded-lg border border-gray-300 bg-transparent py-3 px-5 outline-none focus:border-primary dark:border-gray-700 dark:bg-form-input"
                />
              </div>
              <button
                type="submit"
                disabled={isSending}
                className="w-full rounded-lg bg-primary py-3 px-6 text-white font-medium hover:bg-opacity-90 disabled:opacity-70"
              >
                {isSending ? "Sending OTP..." : "Send OTP"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp}>
              <div className="mb-5">
                <label className="block mb-2 font-medium">One-Time Password</label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter 6-digit code"
                  required
                  className="w-full rounded-lg border border-gray-300 bg-transparent py-3 px-5 outline-none focus:border-primary dark:border-gray-700 dark:bg-form-input"
                />
              </div>
              <button
                type="submit"
                disabled={isVerifying}
                className="w-full rounded-lg bg-primary py-3 px-6 text-white font-medium hover:bg-opacity-90 disabled:opacity-70"
              >
                {isVerifying ? "Verifying..." : "Verify & Login"}
              </button>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-full mt-4 text-primary hover:underline text-sm"
              >
                Change Email
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default OTPVerification;
