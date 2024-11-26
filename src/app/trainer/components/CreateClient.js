import { useState, useEffect } from "react";
import axios from "axios";

const CreateClient = ({ token, onClientCreated }) => {
  const [newClient, setNewClient] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [personalTrainerId, setPersonalTrainerId] = useState(null);
  const [message, setMessage] = useState("");

  // Udtræk personalTrainerId fra JWT-tokenet
  useEffect(() => {
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1])); // Decode token payload
      console.log("Decoded token payload:", payload);
      setPersonalTrainerId(payload.UserId); // Gem personalTrainerId
    }
  }, [token]);

  const createClient = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/Users`,
        {
          firstName: newClient.firstName,
          lastName: newClient.lastName,
          email: newClient.email,
          password: newClient.password,
          accountType: "Client",
          personalTrainerId, // Brug personalTrainerId fra tokenet
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Tilføj token til anmodning
          },
        }
      );

      setMessage("Client created successfully!");
      setNewClient({ firstName: "", lastName: "", email: "", password: "" }); // Ryd formularen

      console.log("Client created:", response.data); // Debug
      onClientCreated(); //opdaterer list clients
    } catch (err) {
      console.error("Error creating client:", err);
      setMessage("Failed to create client. Please try again.");
    }
  };

  return (
    <section>
      <h2 className="text-xl font-bold mb-4">Create New Client</h2>
      <form onSubmit={createClient} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="First Name"
          value={newClient.firstName}
          onChange={(e) => setNewClient({ ...newClient, firstName: e.target.value })}
          className="border p-2 rounded w-[220px]"
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          value={newClient.lastName}
          onChange={(e) => setNewClient({ ...newClient, lastName: e.target.value })}
          className="border p-2 rounded w-[220px]"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={newClient.email}
          onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
          className="border p-2 rounded w-[220px]"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={newClient.password}
          onChange={(e) => setNewClient({ ...newClient, password: e.target.value })}
          className="border p-2 rounded w-[220px]"
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-[220px]">
          Create Client
        </button>
      </form>
      {message && <p className="mt-4 text-green-500">{message}</p>}
    </section>
  );
};

export default CreateClient;
