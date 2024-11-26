"use client";

import { useEffect, useState } from "react";
import CreateClient from "./components/CreateClient"; 
import ListClients from "./components/ListClients"; // Tilføj denne import

const TrainerPage = () => {
  const [token, setToken] = useState("");
  const [refresh, setRefresh] = useState(false); // Trigger for at opdatere klientlisten

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  const handleRefresh = () => {
    setRefresh(!refresh);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Personal Trainer Dashboard</h1>

      {/* Brug CreateClient-komponenten */}
      <CreateClient token={token} onClientCreated={handleRefresh} />

      {/* Liste over klienter */}
      <ListClients token={token} refresh={refresh} />
    </div>
  );
};

export default TrainerPage;
