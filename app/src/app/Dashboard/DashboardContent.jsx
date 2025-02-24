import Profile from "./Content/Profile";
import Enrollment from "./Content/Enrollment";
import Home from "./Content/Home";

// To define each content for tab showing
function HomeContent() {
  return (
    <div className="flex flex-col items-center">
      <Home />
    </div>
  );
}

function ProfileContent() {
  return (
    <div className="flex flex-col items-center">
      <Profile />
    </div>
  );
}

function EnrollmentContent() {
  return (
    <div className="flex flex-col items-center">
      <Enrollment />
    </div>
  );
}

function DashboardContent({ activeTab }) {
  const tabContent = {
    home: <HomeContent />,
    profile: <ProfileContent />,
    enrollment: <EnrollmentContent />,
  };

  return (
    <div className="w-3/4 p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 text-center">
        {tabContent[activeTab] || <p className="text-gray-500">Select a tab...</p>}
      </div>
    </div>
  );
}

export default DashboardContent;