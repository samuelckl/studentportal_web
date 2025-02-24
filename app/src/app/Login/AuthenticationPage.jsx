import { useState } from "react";
import Login from "./Login";
import Register from "./Register";

function AuthenticationPage() {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="pb-8">
          <h1 className="text-2xl text-gray-800 font-bold">The student management portal to meet new studyBuddies</h1>
        </div>
      <div className="bg-white shadow-lg rounded-lg p-6 w-96">
        {/* Tabs */}
        <div className="flex justify-between border-b-2 border-gray-500 mb-4">
          <button
            className={`w-1/2 py-2 text-lg font-semibold ${
              activeTab === "login" ? "border-b-4 border-blue-500 text-blue-500" : "text-gray-500"
            }`}
            onClick={() => setActiveTab("login")}
          >
            Login
          </button>
          <button
            className={`w-1/2 py-2 text-lg font-semibold ${
              activeTab === "register" ? "border-b-4 border-green-500 text-green-500" : "text-gray-500"
            }`}
            onClick={() => setActiveTab("register")}
          >
            Register
          </button>
        </div>

        {/* Dynamic login/ register display */}
        <div>
          {activeTab === "login" ? <Login /> : <Register />}
        </div>
      </div>
    </div>
  );
}

export default AuthenticationPage;