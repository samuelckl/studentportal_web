import { useState, useEffect } from "react";
import { useUser } from "../../components/UserContext";
import axios from "axios";

const backendURL = "http://localhost:8080/";

function Home() {
  const { user } = useUser();
  const [studyGroups, setStudyGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) return;

    const studyGroupURL = backendURL+"enrollments/user-groups/"+user.id

    const fetchStudyGroups = async () => {
      try {
        const response = await axios.get(studyGroupURL);
        setStudyGroups(response.data.enrollment_groups || []);
      } catch (err) {
        console.error("Error fetching study groups:", err);
        setError("Failed to load study groups. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudyGroups();
  }, [user]);

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl text-center">
      <h2 className="text-2xl font-bold mb-4">My Study Groups</h2>

      {isLoading && <p className="text-gray-500">Loading study groups...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!isLoading && !error && studyGroups.length === 0 && (
        <div className="text-gray-600 text-center p-4">
          <p className="font-semibold text-lg">You are not enrolled in any study groups.</p>
          <p className="mt-2">Be more proactive! Join a study group to collaborate with peers and create a better learning environment.</p>
        </div>
      )}

      <ul className="text-left space-y-4">
        {studyGroups.map((group, index) => (
          <li key={index} className="border border-gray-300 rounded-lg p-4">
            <h3 className="text-lg font-semibold">{group.subject_name}</h3>
            <p className="text-sm text-gray-500">
              Day: <strong>{group.availability_day}</strong>
            </p>

            {group.other_users.length > 0 ? (
              <div className="mt-2">
                <p className="font-semibold">Other Users:</p>
                <ul className="list-disc list-inside text-sm text-gray-600">
                  {group.other_users.map((user, idx) => (
                    <li key={idx}>{user}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="text-sm text-gray-500">No other users in this group.</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;