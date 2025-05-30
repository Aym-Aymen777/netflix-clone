import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuthStore } from "../store/Auth.js"; // Adjust the import path as necessary

const SignupPage = () => {
  const [isFilled, setIsFilled] = useState(false);
  const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

  const { signup } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
     await signup({ username, email, password });
  };


  
  return (
    <div className="min-h-screen flex items-center justify-center hero-bg ">
      <form
        className="bg-gray-950 p-6 rounded shadow-md w-96 text-white"
        onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
        <div className="mb-4">
          <label className="block  text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            value={username}
            name="username"
            id="username"
            className="shadow text-gray-200 appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Username"
            required
            onChange={(e) => {
              setUsername(e.target.value);
              setIsFilled(e.target.value.length > 0 && email.length > 0 && password.length > 0);
            }
            }
          />
        </div>
        <div className="mb-4">
          <label className="block  text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            value={email}
            name="email"
            id="email"
            className="shadow text-gray-200 appearance-none border rounded w-full py-2 px-3leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Email"
            required
            onChange={(e) => {
                setEmail(e.target.value);
                setIsFilled(e.target.value.length > 0 && username.length > 0 && password.length > 0);
            }
            }
          />
        </div>
        <div className="mb-4">
          <label className="block  text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            value={password}
            name="password"
            id="password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Password"
            required
            onChange={(e) => {
                setPassword(e.target.value);
                setIsFilled(e.target.value.length > 0 && username.length > 0 && email.length > 0);
            }
            }
          />
        </div>
        <button
          disabled={!isFilled}
          type="submit"
          className="bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          style={
            !isFilled
              ? { backgroundColor: "rgb(254, 105, 105)", cursor: "not-allowed" }
              : {}
          }>
          Register
        </button>
        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-red-500 hover:text-red-400">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignupPage;
