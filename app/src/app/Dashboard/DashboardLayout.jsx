import { useState } from "react";
import SideBar from "./SideBar";
import DashboardContent from "./DashboardContent";

function DashboardLayout() {
  const [activeTab, setActiveTab] = useState("home"); //Default showing home content for study groups enrolled

  return (
    <div className="flex min-h-screen bg-gray-100">
      <SideBar activeTab={activeTab} setActiveTab={setActiveTab} />
      <DashboardContent activeTab={activeTab} />
    </div>
  );
}

export default DashboardLayout;