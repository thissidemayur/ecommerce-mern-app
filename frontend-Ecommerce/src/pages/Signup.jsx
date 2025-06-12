import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useCreateAccountMutation } from "../store/ApiUserFetch.js";

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
  } = useForm({ mode: "onBlur" });
  const [signupType, setSignupType] = useState("email");

  useState(() => {
    clearErrors("identifer");
  }, [signupType]);
  const [createAccount, { data, isLoading, isSuccess, error }] =
    useCreateAccountMutation();

  const navigate = useNavigate();
  const submitForm = async (data) => {
    try {
      data.purpose = signupType;
      if (isSuccess) {
        await createAccount(data).unwrap();
        reset();
        navigate("/");
      }
    } catch (error) {
      console.error("Full error object: ", error);
    }
  };

  return (
    <section className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8">
        {/* Logo and Title */}
        <div className="flex flex-col items-center mb-6">
          <Link
            to="/"
            className="flex items-center text-2xl font-bold text-blue-600"
          >
            <img
              className="w-9 h-9 mr-2 animate-bounce"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
              alt="logo"
            />
            MayurBite
          </Link>
          <h1 className="text-xl font-semibold text-gray-800 mt-2">
            Create a new account
          </h1>
        </div>

        {error && (
          <p className="text-red-600 text-lg text-center mb-4 animate-pulse ">
            {
              error?.data?.message || "Something went wrong"
              // JSON.stringify(error)
            }
          </p>
        )}

        <form onSubmit={handleSubmit(submitForm)} className="space-y-5">
          {/* toggle signup options:  */}
          <div className="flex justify-center items-center gap-5 w-full">
            <button
              type="button"
              onClick={() => setSignupType("email")}
              className={`text-center  ${
                signupType === "email"
                  ? "bg-blue-600 text-white"
                  : "bg-blue-400 text-white"
              }  rounded-lg  hover:cursor-pointer w-[45%] p-2`}
            >
              Email
            </button>
            <button
              type="button"
              onClick={() => setSignupType("phoneNumber")}
              className={`text-center  ${
                signupType === "phoneNumber"
                  ? "bg-blue-600  text-white"
                  : "bg-blue-400 text-white"
              } rounded-lg  hover:cursor-pointer w-[45%] p-2`}
            >
              Phone Number
            </button>
          </div>

          {/* Name */}
          <div className="flex justify-between items-center gap-5">
            <div>
              <label
                htmlFor="name"
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                className={`w-full px-4 py-2 border rounded-md text-gray-900 focus:outline-none focus:ring-2 transition ${
                  errors.name
                    ? "border-red-500 focus:ring-red-400"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
                placeholder="first name"
                {...register("firstName", {
                  required: "first name is required",
                })}
              />
              {errors.firstName && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.firstName.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                className={`w-full px-4 py-2 border rounded-md text-gray-900 focus:outline-none focus:ring-2 transition ${
                  errors.name
                    ? "border-red-500 focus:ring-red-400"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
                placeholder="last name"
                {...register("lastName", { required: "last Name is required" })}
              />
              {errors.lastName && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          {/* Date of Birth */}
          <div>
            <label
              htmlFor="dob"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Date of Birth
            </label>
            <input
              type="date"
              id="dob"
              className={`w-full px-4 py-2 border rounded-md text-gray-900 focus:outline-none focus:ring-2 transition ${
                errors.dob
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
              {...register("dob", { required: "Date of Birth is required" })}
            />
            {errors.dob && (
              <p className="text-xs text-red-500 mt-1">{errors.dob.message}</p>
            )}
          </div>

          {/* Gender */}
          <div>
            <label
              htmlFor="gender"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Gender
            </label>
            <select
              id="gender"
              className={`w-full px-4 py-2 border rounded-md text-gray-900 focus:outline-none focus:ring-2 transition ${
                errors.gender
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
              {...register("gender", { required: "Gender is required" })}
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {errors.gender && (
              <p className="text-xs text-red-500 mt-1">
                {errors.gender.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              {signupType === "email" ? "Email" : "phoneNumber"}
            </label>
            <input
              type={signupType === "email" ? "email" : "tel"}
              id="email"
              className={`w-full px-4 py-2 border rounded-md text-gray-900 focus:outline-none focus:ring-2 transition ${
                errors.identifer
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
              placeholder={
                signupType === "email" ? "xyz@gmail.com" : "9887765432"
              }
              {...register("identifer", {
                required:
                  signupType === "email"
                    ? "email is required"
                    : "Phone Number is required",
                pattern:
                  signupType === "email"
                    ? {
                        value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                        message: "Enter a valid email",
                      }
                    : {
                        value: /^[0-9]{10}$/,
                        message: "Enter a valid 10-digit phone number",
                      },
              })}
            />
            {errors.identifer && (
              <p className="text-xs text-red-500 mt-1">
                {errors.identifer.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className={`w-full px-4 py-2 border rounded-md text-gray-900 focus:outline-none focus:ring-2 transition ${
                errors.password
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
              placeholder="••••••••"
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
                  message:
                    "Password must include uppercase, lowercase, and a number",
                },
              })}
            />
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-2.5 rounded-md text-white font-medium transition ${
              isLoading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-400"
            }`}
            disabled={isLoading ? true : false}
          >
            {isLoading ? "Signing up..." : "Sign Up"}
          </button>

          {/* Already have an account */}
          <p className="text-sm text-center text-gray-500">
            Already have an account?{" "}
            <Link
              to="/signin"
              className="text-blue-600 hover:underline hover:cursor-pointer"
            >
              Login
            </Link>
          </p>

          {isSuccess && (
            <p className="text-green-800"> Acount created successfull</p>
          )}
        </form>
      </div>
    </section>
  );
}
