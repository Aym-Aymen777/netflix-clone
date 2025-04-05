import React from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/Auth";
import { useState } from "react";

const LoginPage = () => {
  const [credentials, setCredentials] = useState({});
  const [inputType, setInputType] = useState("text");
  const [inputId, setInputId] = useState("username");

  const { login,isLoggingIn } = useAuthStore();
 

  const handleSubmit = (e) => {
    e.preventDefault();
    login(credentials);
  };
  const handleChange = (e) => {
    const {id,value} = e.target;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmail = emailRegex.test(value);
  
    setInputType(isEmail ? "email" : "text");
    setInputId(isEmail ? "email" : "username");
  
    setCredentials((prev) => ({
      ...prev,
      [id]: value,
    }));
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center hero-bg ">
      <form
        className="bg-gray-950 p-6 rounded shadow-md w-96 text-white"
        onSubmit={handleSubmit}
        onChange={handleChange}>
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <div className="mb-4">
          <label className="block  text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input
            type={inputType}
            id={inputId}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Username or Email"
            required
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block  text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            onChange={handleChange}
            type="password"
            id="password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Password"
            required
          />
        </div>
        <button
          disabled={isLoggingIn}
          type="submit"
          className="bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
          Login
        </button>
        <p className="text-center text-sm text-gray-500 mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-red-500 hover:text-red-400">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
