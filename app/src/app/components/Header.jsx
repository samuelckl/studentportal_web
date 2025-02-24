import { FaBookReader } from "react-icons/fa";
import { useUser } from "./UserContext";

function Header() {
  const { user, logout } = useUser();

  // Format currentTime time
  const currentTime =  new Date().toLocaleString();

  return (
    <div className="bg-gray-500 text-white p-3 flex justify-between items-center">
      <div className="flex items-center">
        <FaBookReader className="text-4xl m-3" />
        <div>
          <h1 className="text-2xl font-bold">Student Portal</h1>
          <h2 className="text-sm">Connects students...</h2>
        </div>
      </div>

      {/* Set welcome message displaying time now and also a logout button for user to logout*/}
      {user && (
        <div className="flex items-center gap-4">
          <div className="text-sm">
            <p className="font-semibold">Welcome, {user.name}!</p>
            <p className="text-xs opacity-80">Time now: {currentTime}</p>
          </div>
          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default Header;