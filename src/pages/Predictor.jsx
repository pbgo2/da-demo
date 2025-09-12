import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";
import { predictPerformance } from "../api/predictor";

import { getStudents } from "../api/students";
import { getEnrollments } from "../api/enrollments";

const COLORS = ["#2ecc71", "#e74c3c"];

function Predictor() {
  const [grades, setGrades] = useState("");
  const [progress, setProgress] = useState("");
  const [chartData, setChartData] = useState(null);

  const [students, setStudents] = useState([]);
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const studentsData = await getStudents();
      const enrollmentsData = await getEnrollments();
      setStudents(studentsData);
      setEnrollments(enrollmentsData);
    }
    fetchData();
  }, []);

  const handlePredict = async () => {
    if (!grades || !progress) return;
    const data = await predictPerformance(grades, progress);
    console.log(data)
    setChartData(data);
  };

  return (
    <div className="container-predictor">
      <h2>AI Predictor</h2>

      <select
          onChange={(e) => {
            const studentId = e.target.value;
            const temp = enrollments.filter((enr) => enr.studentId._id === studentId);
            if (temp.length > 0) {
              const gradesArray = temp.map((t) => t.grade);
              const progressArray = temp.map((t) => t.progress);
              setGrades(gradesArray.join(","));
              setProgress(progressArray.join(","));
            } else {
              setGrades("");
              setProgress("");
            }
          }}
        >
        <option value="">Select Student</option>
        {students.map((s) => (
          <option key={s._id} value={s._id}>
            {s.name}
          </option>
        ))}
      </select>

      <p>
        <strong>Grades:<br /></strong>
        {grades}
        <br />
        <strong>Progress:<br /></strong>
        {progress}
      </p>

      <button onClick={handlePredict} style={{ marginBottom: "1rem" }}>
        Predict
      </button>

      {chartData && (
        <PieChart width={400} height={300}>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      )}
    </div>
  );
}

export default Predictor;
