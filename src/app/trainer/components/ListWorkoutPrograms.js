import { useState, useEffect } from "react";
import axios from "axios";

const ListWorkoutPrograms = ({ token }) => {
  const [workoutPrograms, setWorkoutPrograms] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState(null); // Gem det valgte program
  const [error, setError] = useState("");

  useEffect(() => {
    if (token) {
      fetchWorkoutPrograms();
    }
  }, [token]);

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
      setError("Failed to fetch workout programs. Please try again.");
    }
  };

  // Hent detaljer for et specifikt træningsprogram
  const fetchProgramDetails = async (programId) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/WorkoutPrograms/${programId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSelectedProgram(response.data); // Gem programdetaljer
    } catch (err) {
      console.error("Error fetching program details:", err);
    }
  };

  // Slet træningsprogram
  const deleteProgram = async (programId) => {
    if (confirm("Are you sure you want to delete this workout program?")) {
      try {
        await axios.delete(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/WorkoutPrograms/${programId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        alert("Workout program deleted successfully!");
        fetchWorkoutPrograms(); // Opdater listen efter sletning
        setSelectedProgram(null); // Fjern valgt program, hvis det er åbent
      } catch (err) {
        console.error("Error deleting workout program:", err);
        alert("Failed to delete workout program. Please try again.");
      }
    }
  };

  // Luk popup
  const closePopup = () => {
    setSelectedProgram(null);
  };

  return (
    <section className="mt-8">
      <h2 className="text-xl font-bold mb-4">Your Workout Programs</h2>
      {error && <p className="text-red-500">{error}</p>}
      {workoutPrograms.length > 0 ? (
        <ul className="list-disc pl-5">
          {workoutPrograms.map((program) => (
            <li key={program.workoutProgramId} className="mb-4">
              <div className="bg-gray-100 p-4 rounded shadow hover:bg-gray-200 transition w-[400px]">
                <div className="flex justify-between items-center">
                  <div>
                    <h3
                      className="text-lg font-bold cursor-pointer"
                      onClick={() =>
                        fetchProgramDetails(program.workoutProgramId)
                      }
                    >
                      {program.name}
                    </h3>
                    <p className="text-sm text-gray-600">{program.description}</p>
                  </div>
                  <button
                    onClick={() => deleteProgram(program.workoutProgramId)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No workout programs found.</p>
      )}

      {/* Popup med detaljeret visning */}
      {selectedProgram && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur">
          <div className="bg-white p-6 rounded shadow-lg w-3/4 max-w-2xl">
            <h3 className="text-lg font-bold mb-4">{selectedProgram.name}</h3>
            <p className="text-sm text-gray-600 mb-4">{selectedProgram.description}</p>
            <h4 className="font-bold mb-2">Exercises:</h4>
            <table className="w-full table-auto border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left">Exercise</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
                  <th className="border border-gray-300 px-4 py-2 text-center">Sets</th>
                  <th className="border border-gray-300 px-4 py-2 text-center">Reps/Time</th>
                </tr>
              </thead>
              <tbody>
                {selectedProgram.exercises.map((exercise, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 px-4 py-2">{exercise.name}</td>
                    <td className="border border-gray-300 px-4 py-2">{exercise.description}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      {exercise.sets || "N/A"}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      {exercise.repetitions || exercise.time || "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              onClick={closePopup}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default ListWorkoutPrograms;
