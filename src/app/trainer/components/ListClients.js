import { useState, useEffect } from "react";
import axios from "axios";

const ListClients = ({ token, refresh }) => {
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

  return (
    <section className="mt-8">
      <h2 className="text-xl font-bold mb-4">Your Clients</h2>
      {error && <p className="text-red-500">{error}</p>}
      <ul className="list-disc pl-5">
        {clients.length > 0 ? (
          clients.map((client) => (
            <li key={client.id} className="mb-2">
              <span className="font-bold">{client.firstName} {client.lastName}</span> - {client.email}
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
