import { useUser } from "../components/UserContext";
import { useState } from "react";
import axios from "axios";

const backendURL = "http://localhost:8080/";

function Login() {
  const { login } = useUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post(backendURL + "users/login", {
        email,
        password,
      });

      if (response.data) {
        const userData = response.data.user
        login(userData); // Store user using useUser globally
        sessionStorage.setItem("user", JSON.stringify(userData)); // Store in session storage
        alert("Login Successful");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login error, please check email and password.");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl text-blue-500 font-bold">Login</h2>

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
          onClick={handleLogin}
          className="bg-blue-500 px-4 py-2 rounded-full text-white font-bold shadow-md hover:bg-green-600 transition"
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;