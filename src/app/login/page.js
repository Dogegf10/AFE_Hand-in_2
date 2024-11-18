"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
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
  
      // Decode token for at finde brugerens rolle
      const payload = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
      const accountType = payload.Role;
  
      // Omdiriger baseret på rollen
      if (accountType === "Manager") {
        router.push("/manager");
      } else if (accountType === "PersonalTrainer") {
        router.push("/trainer");
      } else if (accountType === "Client") {
        router.push("/client");
      } else {
        alert("Ukendt brugerrolle!");
      }
    } catch (err) {
      console.error(err);
      alert("Login mislykkedes! Tjek dine loginoplysninger.");
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded shadow-md w-full max-w-sm"
      >
        <h1 className="text-xl font-bold mb-4">Log in</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full mb-4 rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full mb-4 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 w-full rounded"
        >
          Log in
        </button>
      </form>
    </div>
  );
};

export default Login;
