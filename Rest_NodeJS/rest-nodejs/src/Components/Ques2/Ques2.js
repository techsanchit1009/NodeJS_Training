import React, { useEffect, useState } from "react";
import "./Ques2.css";
import axios from "axios";

const Ques2 = () => {
  const [studentData, setStudentData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000")
      .then((response) => setStudentData(response.data));
  }, []);

  const filterChangeHandler = (selectedFilter) => {
    console.log(selectedFilter);
    axios.get(`http://localhost:5000/filter?branch=${selectedFilter}`).then(resp => setStudentData(resp.data));
  }

  return (
    <React.Fragment>
      <h1>Students' List</h1>
      <div className="Ques2">
        <table className="StudentTable">
          <thead>
            <tr>
              <th>Name</th>
              <th>Branch</th>
            </tr>
          </thead>
          <tbody>
            {studentData.map((student, index) => (
              <tr key={index}>
                <td>{student.name}</td>
                <td>{student.branch}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{border: '1px solid black', padding: '1rem'}}>
          <h3>Select filters</h3>
          <select defaultValue={'DEFAULT'} className="Filter" onChange={(event) => filterChangeHandler(event.target.value)}>
            <option value='DEFAULT' disabled>Select Filter</option>
            <option value="MERN">MERN</option>
            <option value="MEAN">MEAN</option>
            <option value="Android">Android</option>
            <option value="FEEN">FEEN</option>
            <option value="Java">Java</option>
          </select>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Ques2;
