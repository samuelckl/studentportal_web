import { useState } from "react";
import { useUser } from "../../components/UserContext";
import axios from "axios";

const backendURL = "http://localhost:8080/";

function Profile() {
  const { user, login } = useUser();
  const [name, setName] = useState(user?.name || "");
  const [isEditing, setIsEditing] = useState(false); // Set editing mode as disabled

  const handleUpdate = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(backendURL + "users/update", {
        user_id: user.id,
        name,
      });

      if (response.data) {
        alert("Profile updated successfully!");
        login({ ...user, name });
        setIsEditing(false); // Disable editing mode
      }
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-96 text-center">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>

      <form onSubmit={handleUpdate} className="text-left space-y-4">
        <div>
          <label className="block font-semibold">Email:</label>
          <p className="border border-gray-300 text-gray-500 rounded-xl p-2">{user.email}</p>
        </div>

        {/* Enable Editing mode */}
        <div>
          <label className="block font-semibold">Name:</label>
          {isEditing ? (
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border-2 border-blue-500 rounded-xl p-2 w-full"
            />
          ) : (
            <p className="border border-gray-300 rounded-xl p-2">{user.name}</p>
          )}
        </div>

        {/* Edit/ Update Button */}
        <div className="flex justify-center gap-4 mt-4">
          {isEditing ? (
            <button
              type="submit"
              className="bg-green-500 px-4 py-2 rounded-lg text-white font-bold shadow-md hover:bg-green-600 transition"
            >
              Update
            </button>
          ) : (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setIsEditing(true)}
              }
              className="bg-blue-500 px-4 py-2 rounded-lg text-white font-bold shadow-md hover:bg-blue-600 transition"
            >
              Edit
            </button>
          )}
        </div>
      </form>
      <p className="text-xs text-gray-500 p-3">Will integrate email and password upadte later.</p>
    </div>
  );
}

export default Profile;