import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const CreateWorkoutProgram = ({ token, onProgramCreated, refresh  }) => {
  const [clients, setClients] = useState([]);
  const [newProgram, setNewProgram] = useState({
    name: "",
    description: "",
    clientId: "",
  });

  useEffect(() => {
    if (token) {
      fetchClients();
    }
  }, [token, refresh]);

  // Hent liste over klienter
  const fetchClients = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/Users/Clients`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setClients(response.data);
    } catch (err) {
      console.error("Error fetching clients:", err);
    }
  };

  // Opret workout-program
  const createWorkoutProgram = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/WorkoutPrograms`,
        {
          name: newProgram.name,
          description: newProgram.description,
          clientId: parseInt(newProgram.clientId, 10), // Sørg for, at clientId er et nummer
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success('Program successfully created');
      setNewProgram({ name: "", description: "", clientId: "" });
      
      if (onProgramCreated) {
        onProgramCreated(); // Kald callback-funktionen for at opdatere listen
      }
    } catch (err) {
      console.error("Error creating workout program:", err);
      toast.error("Error creating workout program");
    }
  };

  return (
    <section className="mt-8">
      <h2 className="text-xl font-bold mb-4">Create New Workout Program</h2>
      <form onSubmit={createWorkoutProgram} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Program Name"
          value={newProgram.name}
          onChange={(e) => setNewProgram({ ...newProgram, name: e.target.value })}
          className="border p-2 rounded"
          required
        />
        <textarea
          placeholder="Description"
          value={newProgram.description}
          onChange={(e) => setNewProgram({ ...newProgram, description: e.target.value })}
          className="border p-2 rounded"
          required
        ></textarea>
        <select
          value={newProgram.clientId}
          onChange={(e) => setNewProgram({ ...newProgram, clientId: e.target.value })}
          className="border p-2 rounded"
          required
        >
          <option value="">Select Client</option>
          {clients.map((client) => (
            <option key={client.userId} value={client.userId}>
              {client.firstName} {client.lastName}
            </option>
          ))}
        </select>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Create Program
        </button>
      </form>
    </section>
  );
};

export default CreateWorkoutProgram;
