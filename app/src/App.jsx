import { useState } from "react";
import "./App.css";
import Header from "./app/components/Header";
import Footer from "./app/components/Footer";
import AuthenticationPage from "./app/Login/AuthenticationPage";
import DashboardLayout from "./app/Dashboard/DashboardLayout";
import { useUser } from "./app/components/UserContext";

function App() {
  const { user } = useUser();

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      {user ? (
        <div className="flex-grow flex flex-col">
          <DashboardLayout />
        </div>
      ) : (
        <div className="flex-grow flex items-center justify-center">
          <AuthenticationPage />
        </div>
      )}
      <Footer />
    </div>
  );
}

export default App
