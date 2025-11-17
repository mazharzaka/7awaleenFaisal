"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { loadToken, setCredentials } from "@/redux/features/Auth.slice";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { useLoginMutation } from "@/redux/features/Api.slice";

const Signin = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [login, { isSuccess }] = useLoginMutation();

  const [formSubmitting, setFormSubmitting] = useState(false);

  useEffect(() => {
    dispatch(loadToken());
  }, [dispatch]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormSubmitting(true);
    try {
      const formData = new FormData(e.currentTarget);
      const data = Object.fromEntries(formData.entries());
      const loginResponse = await login(data).unwrap();
      dispatch(setCredentials(loginResponse.accessToken));
      console.log("sv xcsbavde", loginResponse.accessToken);
    } catch (error) {
      console.log("login error:", error);
    } finally {
      setFormSubmitting(false);
    }
  };

  // redirect بعد نجاح login
  useEffect(() => {
    if (isSuccess) {
      router.push("/AddStores");
    }
  }, [isSuccess, router]);

  return (
    <>
      <Breadcrumb title="Signin" pages={["Signin"]} />
      <section className="overflow-hidden py-20 bg-gray-2">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="max-w-[570px] w-full mx-auto rounded-xl bg-white shadow-1 p-4 sm:p-7.5 xl:p-11">
            <div className="text-center mb-11">
              <h2 className="font-semibold text-xl sm:text-2xl xl:text-heading-5 text-dark mb-1.5">
                Sign In to Your Account
              </h2>
              <p>Enter your detail below</p>
            </div>

            <form onSubmit={onSubmit}>
              <div className="mb-5">
                <label htmlFor="email" className="block mb-2.5">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your email"
                  className="rounded-lg border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-3 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
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
                  className="rounded-lg border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-3 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={formSubmitting}
                className="w-full flex justify-center font-medium text-white bg-dark py-3 px-6 rounded-lg ease-out duration-200 hover:bg-blue mt-7.5"
              >
                {formSubmitting ? "Signing in..." : "Sign in to account"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signin;
