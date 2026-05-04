import { useState } from "react";
import "./App.css";

function App() {
  const students = [
    { name: "Rahul", roll: "101", branch: "CSE", cgpa: 8.5 },
    { name: "Amit", roll: "102", branch: "IT", cgpa: 7.8 },
    { name: "Sneha", roll: "103", branch: "ECE", cgpa: 9.1 },
    { name: "Priya", roll: "104", branch: "CSE", cgpa: 8.9 },
    { name: "Rohit", roll: "105", branch: "ME", cgpa: 7.5 },
  ];

  const [search, setSearch] = useState("");

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="container">
      <h2>Student List</h2>

      <input
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="card-container">
        {filteredStudents.length > 0 ? (
          filteredStudents.map((s, index) => (
            <div className="card" key={index}>
              <h3>{s.name}</h3>
              <p>
                <strong>Roll:</strong> {s.roll}
              </p>
              <p>
                <strong>Branch:</strong> {s.branch}
              </p>
              <p>
                <strong>CGPA:</strong> {s.cgpa}
              </p>
            </div>
          ))
        ) : (
          <p>No students found</p>
        )}
      </div>
    </div>
  );
}

export default App;
