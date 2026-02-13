import OTPVerification from "@/components/Auth/OTPVerification";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verify Email | 7Awaleen Faisal",
  description: "Verify your email address",
};

const VerifyEmailPage = () => {
  return (
    <>
      <Breadcrumb title="Verify Email" pages={["Verify Email"]} />
      <OTPVerification />
    </>
  );
};

export default VerifyEmailPage;
