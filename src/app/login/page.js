"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    console.log("Login validation");

    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/Users/login`,
        { email, password }
      );

      // Hent JWT fra svaret
      const token = response.data.jwt;

      // Gem token i localStorage
      localStorage.setItem("token", token);

      // /home validates jwt role
      router.push("/home");
    } catch (err) {
      console.error(err);
      alert("Login mislykkedes! Tjek dine loginoplysninger.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800">
      <form
        onSubmit={handleLogin}
        className="bg-white dark:bg-gray-900 p-8 rounded shadow-2xl w-full max-w-sm"
      >
        <h1 className="text-xl font-bold mb-4 dark:text-white">Log in</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full mb-4 rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full mb-4 rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 w-full rounded dark:bg-blue-600 transition-all duration-200 ease-in-out hover:bg-blue-600 dark:hover:bg-blue-700 active:bg-blue-700 dark:active:bg-blue-800 transform active:scale-95"
        >
          Log in
        </button>
      </form>
    </div>
  );
};

export default Login;
