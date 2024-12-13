import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';

function App() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get("https://server-stu-submited.onrender.com");
        setStudents(response.data); // Assuming the response data is an array of students
      } catch (err) {
        setError(err.message || "Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  // Function to handle student deletion
  const handleDelete = async (id) => {
    const deletePromise = async () => {
      await axios.delete(`https://server-stu-submited.onrender.com/${id}`); // Delete the student
      const response = await axios.get("https://server-stu-submited.onrender.com"); // Fetch updated student list
      setStudents(response.data);
    };

    toast.promise(
      deletePromise(),
      {
        pending: "Deleting student...",
        success: "Student deleted successfully! 👌",
        error: "Error deleting student 😢",
      },
      {
        position: toast.POSITION.TOP_RIGHT,
      }
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  
  

  return (
    <div className="container-fluid px-5 font-v">
      <div className="d-flex justify-content-between mt-5">
        <h1 className="">Student Submissions</h1>
        <div>
          <select name="" id="" className="form-select shadow-none bg-dark text-light">
            <option value="12:30pm-1:45pm">12:30pm-1:45pm</option>
            <option value="2:00pm-3:15pm">2:00pm-3:15pm</option>
            <option value="3:30pm-5:00pm">3:30pm-5:00pm</option>
            <option value="5:00pm-6:00pm">5:00pm-6:00pm</option>
            <option value="6:00pm-7:15pm">6:00pm-7:15pm</option>
            <option value="7:15pm-8:30pm">7:15pm-8:30pm</option>
            <option value="11:00pm-1:30pm(Sat-Sun)">11:00pm-1:30pm(Sat-Sun)</option>
            <option value="2:00pm-5:00pm(Sat-Sun)">2:00pm-5:00pm(Sat-Sun)</option>
          </select>
        </div>
      </div>
      <table className="table table-striped">
        <thead>
          <tr className="table-success">
            <th>Name</th>
            <th>Tel</th>
            <th>Course</th>
            <th>Time</th>
            <th>Project Name</th>
            <th>GitHub link</th>
            <th>Deploy link</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        {students.length > 0 ? (
          <tbody className="">
            {students.map((e, i) => (
              <tr key={i} className="align-middle ">
                <td>{e.name}</td>
                <td>{e.tel}</td>
                <td>{e.course}</td>
                <td>{e.time}</td>
                <td className="text-truncate">{e.project_name}</td>
                <td className="text-truncate">
                  <a href={e.gitlink} target="_blank" rel="noopener noreferrer">
                    {e.gitlink}
                  </a>
                </td>
                <td className="text-truncate">
                  <a href={e.linkDeploy} target="_blank" rel="noopener noreferrer">
                    {e.linkDeploy}
                  </a>
                </td>
                <td className="text-truncate">{e.date}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(e._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        ) : (
          <p>No students have submitted data yet.</p>
        )}
      </table>

      <ToastContainer />
    </div>
  );
}

export default App;
