import React, { useEffect, useState } from 'react';
import "./Home.css";
import axios from 'axios';

const Home = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/users.json')
      .then(resp => setUserData(resp.data))
  }, []);

  const deleteHandler = (userIndex) => {
    axios.delete(`http://localhost:5000/users.json?id=${userIndex}`)
      .then(resp => setUserData(resp.data));
  };

  let userTable = (
    <table className="UserTable">
    <thead>
      <tr>
        <th>Name</th>
        <th>Email ID</th>
        <th>Created on</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {userData.map((user, index) => (
        <tr key={index}>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{user.created_on}</td>
          <td><button onClick={() => deleteHandler(index)}>Delete</button></td>
        </tr>
      ))}
    </tbody>
  </table>
  );

  return (
    <div className="Home">
      <h2>Users:</h2>
      <div className="TableWrapper">
      {userData.length ? userTable : <p>No User Found. Add New User</p>}
      </div>
    </div>
  )
}

export default Home;