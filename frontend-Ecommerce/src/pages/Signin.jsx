import React, { useEffect } from 'react'


import { useForm } from "react-hook-form";
import { useState } from "react";
import { data, Link, useNavigate } from "react-router";
import { useLoginUserMutation } from "../store/ApiUserFetch.js";
import { login as authLogin } from "../store/authSlice.js";
import { useDispatch } from "react-redux";





function Signin() {

  const [loginUser, { isLoading, isSuccess, error, data }] = useLoginUserMutation()
  const [signinType, setSigninType] = useState("email")

  console.log("error: ", error)
  const { register, handleSubmit, formState: { errors }, reset, clearErrors } = useForm({mode:'onBlur'});

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const submitForm = async (userData) => {
    try {
      // if (signinType === 'email') data.purpose = "email"
      // else if (signinType === 'phoneNumber') data.purpose = "phoneNumber"

      const responseData = await loginUser(userData)
      console.log("response data in loginUser: ",responseData?.data)
      if (responseData?.data?.data) {
        dispatch(authLogin(responseData?.data?.data))
        console.log("authlogin: ",dispatch(authLogin(responseData?.data?.data)))
        reset()
        navigate("/")
      }

    } catch (error) {
      console.error("error in submitform buttton in signin.jsx: ", error)
      console.error("error in submitform buttton in signin.jsx: ", error?.message)
    }
  };

  useEffect(() => {
    clearErrors('idenifer')
  }, [clearErrors])

  
  return (
    <section className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8">
        {/* Logo and Title */}
        <div className="flex flex-col items-center mb-6">
          <Link to="/" className="flex items-center text-2xl font-bold text-blue-600">
            <img
              className="w-9 h-9 mr-2 animate-bounce"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
              alt="logo"
            />

            SAUNDARYA
          </Link>
          <h1 className="text-xl font-semibold text-gray-800 mt-2">
            Sign in to your account
          </h1>
        </div>

        {/* Error Display */}
        {error && <p className="text-red-600 text-lg text-center mb-4 animate-pulse">{error?.data?.message}</p>}

        {/* Form */}
        <form onSubmit={handleSubmit(submitForm)} className="space-y-5">

          {/* toggle signup options:  */}
          <div className="flex justify-center items-center gap-5 w-full">
            <button type="button" onClick={() => setSigninType("email")} className={`text-center  ${(signinType === "email") ? "bg-blue-600 text-white" : "bg-blue-400 text-white"}  rounded-lg  hover:cursor-pointer w-[45%] p-2`}>
              Email
            </button>
            <button type="button" onClick={() => setSigninType("phoneNumber")} className={`text-center  ${(signinType === "phoneNumber") ? "bg-blue-600  text-white" : "bg-blue-400 text-white"} rounded-lg  hover:cursor-pointer w-[45%] p-2`}>
              Phone Number
            </button>
          </div>

          {/* Email || phoneNumber*/}
          <div>
            <label htmlFor="identifer" className="block mb-1 text-sm font-medium text-gray-700">
              {signinType === 'email' ? "Email" : "Phone number"}
            </label>
            <input
              type={signinType === 'email' ? "email" : "tel"}
              id="identifer"
              className={`w-full px-4 py-2 border rounded-md text-gray-900 focus:outline-none focus:ring-2 transition ${errors.identifer
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 focus:ring-blue-500"
                }`}
              placeholder={signinType === 'email' ? "name@company.com" : "9876543210"}
              {...register("identifer", {
                required: true,
                validate: (signinType === 'email') ? {
                  matchPattern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Enter a valid email!",
                } : {
                  matchPattern: (value) =>
                    /^[0-9]{10}$/.test(value) ||
                    "Enter a valid 10-digit phone number",
                },

              })}
              aria-invalid={errors.identifer ? "true" : "false"}
            />
            {errors.identifer && (
              <p className="text-xs text-red-500 mt-1">{errors.identifer.message}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              className={`w-full px-4 py-2 border rounded-md text-gray-900 focus:outline-none focus:ring-2 transition ${errors.password
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 focus:ring-blue-500"
                }`}
              placeholder="••••••••"
              {...register("password", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(value) ||
                    "Password must include uppercase, lowercase, and a number.",
                },
              })}
              aria-invalid={errors.password ? "true" : "false"}
            />
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Remember Me + Forgot Password */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="ml-2 text-gray-600">Remember me</span>
            </label>
            <Link to="/" className="text-blue-600 hover:underline">
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-2.5 rounded-md text-white font-medium transition ${isLoading
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-400"
              }`}
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Sign In"}
          </button>

          {/* Sign Up Prompt */}
          <p className="text-sm text-center text-gray-500">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>

          {isSuccess && (
            <p className="text-green-800 bg-white shadow-2xl"> Acount created successfull</p>
          )}
        </form>
      </div>
    </section>
  )

}

export default Signin




