import { useUser } from "../components/UserContext";
import { useState } from "react";
import axios from "axios";

const backendURL = "http://localhost:8080/";

function Register() {
  const { login } = useUser(); // Access global login function
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      console.log("Sending request to:", backendURL + "users/");
      console.log("Payload:", { name, email, password });

      const response = await axios.post(backendURL + "users/", {
        name,
        email,
        password,
      });

      console.log("Response received:", response.data);

      if (response.data) {
        const registrationReponse = response.data
        login(registrationReponse.user); // Store user in context
        sessionStorage.setItem("user", JSON.stringify(response.data)); // Store in session storage
        alert("Registration Successful!");
      }
    } catch (error) {
      console.error("Registration failed:", error);

      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        alert(`Registration error: ${error.response.data.message || "Please try again."}`);
      } else {
        alert("Registration error, server might be down.");
      }
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl text-green-500 font-bold">Register</h2>

      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border-2 border-gray-300 rounded-xl p-2 my-2 w-full"
      />

      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border-2 border-gray-300 rounded-xl p-2 my-2 w-full"
      />

      <input
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border-2 border-gray-300 rounded-xl p-2 my-2 w-full"
      />

      <div className="flex justify-center mt-4">
        <button
          onClick={handleRegister}
          className="bg-green-500 px-4 py-2 rounded-full text-white font-bold shadow-md hover:bg-green-600 transition"
        >
          Register
        </button>
      </div>
    </div>
  );
}

export default Register;