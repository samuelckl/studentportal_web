import { useState, useEffect } from "react";
import { useUser } from "../../components/UserContext";
import axios from "axios";

const backendURL = "http://localhost:8080/";

function Enrollment() {
  const { user } = useUser();
  const [subjects, setSubjects] = useState([]); // Stores all subjects
  const [enrolledSubjects, setEnrolledSubjects] = useState([]); // Stores user's enrolled subjects
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        const [subjectsResponse, enrollmentsResponse] = await Promise.all([
          axios.get(`${backendURL}subjects/`),
          axios.get(`${backendURL}enrollments/${user.id}`)
        ]);

        setSubjects(subjectsResponse.data);
        setEnrolledSubjects(enrollmentsResponse.data.map(enrollment => ({
          subject_id: enrollment.subject_id,
          availability_id: enrollment.availability_id
        })));
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load subjects. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const isUserEnrolled = (subjectId, availabilityId) =>
    enrolledSubjects.some(enrollment =>
      enrollment.subject_id === subjectId && enrollment.availability_id === availabilityId
    );

    const handleEnrollment = async (subjectId, availabilityId) => {
      try {
        const payload = {
          user_id: user.id,
          subject_id: subjectId,
          availability_id: availabilityId
        };
    
        if (isUserEnrolled(subjectId, availabilityId)) { // Show Unenroll button if user enrolled
          await axios.delete(`${backendURL}enrollments/`, { data: payload });
          
          setEnrolledSubjects(prev => prev.filter(enrollment =>
            !(enrollment.subject_id === subjectId && enrollment.availability_id === availabilityId)
          ));
          alert("Unenrolled successfully!");
        } else {
          await axios.post(`${backendURL}enrollments/`, payload);
          setEnrolledSubjects(prev => [...prev, { subject_id: subjectId, availability_id: availabilityId }]);
          alert("Enrolled successfully!");
        }
      } catch (err) {
        console.error("Enrollment error:", err);
    
        const errorMessage = err.response?.data?.message || "An error occurred. Please try again.";
        alert(errorMessage);
      }
    };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl text-center">
      <h2 className="text-2xl font-bold mb-4">Enrollment</h2>

      {isLoading && <p className="text-gray-500">Loading subjects...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!isLoading && subjects.length === 0 && (
        <p className="text-gray-500">No subjects available for enrollment.</p>
      )}

      <ul className="text-left space-y-4">
        {subjects.map(subject => (
          <li key={subject.subject_id} className="border border-gray-300 rounded-lg p-4">
            <h3 className="text-lg font-semibold">{subject.name}</h3>
            <p className="text-sm text-gray-500">{subject.description}</p>

            {subject.availabilities.length > 0 ? (
              <div className="mt-2">
                <p className="font-semibold">Available On:</p>
                <ul className="space-y-2">
                  {subject.availabilities.map(availability => {
                    const enrolled = isUserEnrolled(subject.subject_id, availability.availability_id);
                    return (
                      <li key={availability.availability_id} className="flex justify-between items-center border border-gray-300 p-2 rounded-lg">
                        <span>{availability.day}</span>
                        <button
                          onClick={() => handleEnrollment(subject.subject_id, availability.availability_id)}
                          className={`px-4 py-2 rounded-lg text-white font-bold shadow-md cursor-pointer transition ${
                            enrolled ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
                          }`}
                        >
                          {enrolled ? "Unenroll" : "Enroll"}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ) : (
              <p className="text-sm text-gray-500">No availability for this subject.</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Enrollment;