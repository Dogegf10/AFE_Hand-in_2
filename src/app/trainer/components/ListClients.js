import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const ListClients = ({ token, refresh, onClientDeleted  }) => {
  const [clients, setClients] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (token) {
      fetchClients();
    }
  }, [token, refresh]); // Genindlæs, når refresh ændrer sig

  // Hent klienter
  const fetchClients = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/Users/Clients`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send token med
          },
        }
      );
      setClients(response.data);
    } catch (err) {
      console.error("Error fetching clients:", err);
      setError("Failed to fetch clients. Please try again.");
    }
  };

  // Slet klient
  const deleteClient = async (id) => {
    if (confirm("Are you sure you want to delete this client?")){
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/Users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Send token med
        },
      });
      // Fjern klient fra lokal state efter sletning
      setClients((prevClients) => prevClients.filter((client) => client.userId !== id));
      console.log("Deleting user with ID:", id);
      toast.success('Client deleted successfully');

      if (onClientDeleted) {
        onClientDeleted(); // Trigger opdatering af andre komponenter
      }

    } catch (err) {
      console.error("Error deleting client:", err);
      setError("Failed to delete client. Please try again.");
    }
   }
  };

  return (
    <section className="mt-8 max-w-md">
      <h2 className="text-xl font-bold mb-4">Your Clients</h2>
      {error && <p className="text-red-500">{error}</p>}
      <ul className="list-disc pl-5">
        {clients.length > 0 ? (
          clients.map((client) => (
            <li key={client.userId} className="mb-2 flex items-center justify-between">
              <div>
                <span className="font-bold">
                  {client.firstName} {client.lastName}
                </span>{" "}
                - {client.email}
              </div>
              <button
                onClick={() => deleteClient(client.userId)}
                className="ml-4 text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </li>
          ))
        ) : (
          <p className="text-gray-500">No clients found.</p>
        )}
      </ul>
    </section>
  );
};

export default ListClients;
