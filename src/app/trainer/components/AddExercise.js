import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const AddExercise = ({ token, refresh }) => {
  const [workoutPrograms, setWorkoutPrograms] = useState([]);
  const [selectedProgramId, setSelectedProgramId] = useState("");
  const [newExercise, setNewExercise] = useState({
    name: "",
    description: "",
    sets: "",
    repetitions: "",
    time: "",
  });

  useEffect(() => {
    if (token) {
      fetchWorkoutPrograms();
    }
  }, [token, refresh]);

  // Hent træningsprogrammer
  const fetchWorkoutPrograms = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/WorkoutPrograms/trainer`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setWorkoutPrograms(response.data);
    } catch (err) {
      console.error("Error fetching workout programs:", err);
      toast.error("Failed to fetch workout programs.");
    }
  };

  // Tilføj øvelse til valgt program
  const addExercise = async (e) => {
    e.preventDefault();
    if (!selectedProgramId) {
      toast("Please select a workout program.");
      return;
    }
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/Exercises/Program/${selectedProgramId}`,
        {
          name: newExercise.name,
          description: newExercise.description,
          sets: parseInt(newExercise.sets, 10),
          repetitions: parseInt(newExercise.repetitions, 10),
          time: newExercise.time,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Exercise added successfully!");
      setNewExercise({ name: "", description: "", sets: "", repetitions: "", time: "" });
    } catch (err) {
      console.error("Error adding exercise:", err);
      toast.error("Failed to add exercise. Please try again.");
    }
  };

  return (
    <section className="mt-8">
      <h2 className="text-xl font-bold mb-4">Add Exercise to Workout Program</h2>
      <form onSubmit={addExercise} className="flex flex-col gap-4">
        <select
          value={selectedProgramId}
          onChange={(e) => setSelectedProgramId(e.target.value)}
          className="border p-2 rounded"
          required
        >
          <option value="">Select Workout Program</option>
          {workoutPrograms.map((program) => (
            <option key={program.workoutProgramId} value={program.workoutProgramId}>
              {program.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Exercise Name"
          value={newExercise.name}
          onChange={(e) => setNewExercise({ ...newExercise, name: e.target.value })}
          className="border p-2 rounded"
          required
        />
        <textarea
          placeholder="Description"
          value={newExercise.description}
          onChange={(e) => setNewExercise({ ...newExercise, description: e.target.value })}
          className="border p-2 rounded"
          required
        ></textarea>
        <input
          type="number"
          placeholder="Sets"
          value={newExercise.sets}
          onChange={(e) => setNewExercise({ ...newExercise, sets: e.target.value })}
          className="border p-2 rounded"
          required
        />
        <input
          type="number"
          placeholder="Repetitions"
          value={newExercise.repetitions}
          onChange={(e) => setNewExercise({ ...newExercise, repetitions: e.target.value })}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Time (e.g., '30 seconds')"
          value={newExercise.time}
          onChange={(e) => setNewExercise({ ...newExercise, time: e.target.value })}
          className="border p-2 rounded"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Exercise
        </button>
      </form>
    </section>
  );
};

export default AddExercise;
