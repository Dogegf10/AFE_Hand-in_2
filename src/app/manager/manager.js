"use client";

import { useState, useEffect } from "react";
import axios from "axios";

const ManagerComponent = () => {
  const [trainers, setTrainers] = useState([]);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");

  // Fetch trainers on page load
  useEffect(() => {
    fetchTrainers();
  }, []);

  const fetchTrainers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/Users`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTrainers(
        response.data.filter((user) => user.accountType === "PersonalTrainer")
      );
    } catch (error) {
      console.error("Error fetching trainers:", error);
      alert("Kunne ikke hente trænere.");
    }
  };

  const createTrainer = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/Users`,
        {
          email,
          firstName,
          lastName,
          password,
          accountType: "PersonalTrainer",
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Personal Trainer oprettet!");
      fetchTrainers(); // Update the trainer list
      setEmail("");
      setFirstName("");
      setLastName("");
      setPassword("");
    } catch (error) {
      console.error("Error creating trainer:", error);
      alert("Kunne ikke oprette træner.");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4 text-center">Manager Dashboard</h1>

      {/* billede i øverste højre hjørne */}
      <div className="absolute top-20 right-4">
        <img src="/img/manager_pig.png" alt="Logo" className="h-32 w-auto" />
      </div>

      <h2 className="text-xl font-semibold mb-2">
        Create a new Personal Trainer
      </h2>
      <form
        onSubmit={createTrainer}
        className="bg-white p-4 rounded shadow mb-6 max-w-md"
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full mb-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Fornavn"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="border p-2 w-full mb-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Efternavn"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="border p-2 w-full mb-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="Adgangskode"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full mb-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          Opret Træner
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-2">List of Personal Trainers</h2>
      <ul className="bg-white p-4 rounded shadow max-w-md">
        {trainers.length === 0 ? (
          <p>Ingen trænere fundet.</p>
        ) : (
          trainers.map((trainer) => (
            <li
              key={trainer.id}
              className="border-b last:border-none p-2 flex justify-between"
            >
              <span>
                {trainer.firstName} {trainer.lastName}
              </span>
              <span>{trainer.email}</span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default ManagerComponent;
