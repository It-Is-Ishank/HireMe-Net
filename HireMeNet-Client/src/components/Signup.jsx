import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const isStrongPassword = (password) => {
    // Define your password criteria (e.g., minimum length and complexity)
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);
  
    // Check if the password meets the criteria
    return (
      password.length >= minLength &&
      hasUppercase &&
      hasLowercase &&
      hasDigit
    );
  };


  const handleSignup = (data,e) => {
    e.preventDefault();
    // Basic validation using data object
    if (
      !(
        data.fullName &&
        data.email &&
        data.password &&
        data.repeatPassword &&
        data.role
      )
    ) {
      alert("Please fill in all fields");
      return;
    }

    if (!isStrongPassword(data.password)) {
      alert(
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one digit."
      );
      return;
    }

    if (data.password !== data.repeatPassword) {
      alert("Passwords do not match");
      return;
    }

    fetch("/api/user/sign-up", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    fullName: data.fullName,
    email: data.email,
    password: data.password,
    role: data.role,
  }),
})
.then((res) => {
  if (res.status === 401) {
    // User already exists, show alert
    return res.text().then((errorMessage) => {
      alert(`${errorMessage}`);
      reset();
      throw new Error(errorMessage);
    });
  } else if (!res.ok) {
    throw new Error("Signup failed");
  }

  return res.json();
})
.then((result) => {
  console.log(result);
  alert("Signed Up successfully");
  navigate("/login")
})
.catch((error) => {
  console.error(error);
});
};

    // Dispatch your signup action or API call here
    // dispatch(signupAction(fullName, email, password));

    // Reset form fields after successful signup
    // setFullName("");
    // setEmail("");
    // setPassword("");
    // setRepeatPassword("");

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden bg-[#fafafa]">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-blue uppercase">
          Sign UP
        </h1>
        <form className="mt-6" onSubmit={handleSubmit(handleSignup)}>
          <div className="mb-2">
            <label
              htmlFor="fullName"
              className="block text-sm font-semibold text-gray-800"
            >
              Full Name
            </label>
            <input
              type="fullName"
              id="fullName"
              {...register("fullName")}
              className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-800"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email")}
              className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password")}
              className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="repeatPassword"
              className="block text-sm font-semibold text-gray-800"
            >
              Repeat Password
            </label>
            <input
              type="password"
              id="repeatPassword"
              {...register("repeatPassword")}
              className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div>
            <label className="mb-2">Are you ?</label>
            <select
              {...register("role", { required: true })}
              className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 "
            >
              <option value="employer">Looking for employee's</option>
              <option value="employee">Looking for jobs</option>
            </select>
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Register
            </button>
          </div>
        </form>
        <p className="mt-8 text-xs font-light text-center text-gray-700">
          {" "}
          Allready have an account?{" "}
          <a onClick={() => navigate("/login")} className="font-medium text-blue hover:underline">
            Log In
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
