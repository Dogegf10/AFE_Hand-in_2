"use client";

import { useEffect, useState } from "react";
import CreateClient from "./components/CreateClient"; 
import ListClients from "./components/ListClients"; // Tilføj denne import
import ListWorkoutPrograms from "./components/ListWorkoutPrograms";
import CreateWorkoutProgram from "./components/CreateWorkoutProgram";
import AddExercise from "./components/AddExercise";

const TrainerPage = () => {
  const [token, setToken] = useState("");
  const [refresh, setRefresh] = useState(false); // Trigger for at opdatere klientlisten
  const [trainerName, setTrainerName] = useState(""); // Ny state til trænerens navn

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  const handleRefresh = () => {
    setRefresh(!refresh);
  };

   // Udtræk personalTrainerId fra JWT-tokenet
   useEffect(() => {
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1])); // Decode token payload
      console.log("Decoded token payload:", payload);
      setTrainerName(payload.Name || "Your");
    }
  }, [token]);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">
         {trainerName}'s Personal Trainer Dashboard
      </h1>

        {/* billede i øverste højre hjørne */}
        <div className="absolute top-20 right-4">
        <img
         src="/img/Personal_Trainer.png"
         alt="Logo"
         className="h-32 w-auto"
        />
      </div>
      
      <div className="mt-12">
      {/* Brug CreateClient-komponenten */}
      <CreateClient token={token} onClientCreated={handleRefresh} />
      </div>

      {/* Liste over klienter */}
      <ListClients token={token} refresh={refresh} />

       {/* Liste over træningsprogrammer */}
       <ListWorkoutPrograms token={token} refresh={refresh} />

       <CreateWorkoutProgram token={token}  onProgramCreated={handleRefresh} />

       <AddExercise token={token} />
    </div>
  );
};

export default TrainerPage;
