import React, { useEffect, useState } from 'react';
import "./Home.css";
import axios from 'axios';
import { withRouter } from 'react-router-dom';

const Home = (props) => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/users.json/${props.sessionId}`)
      .then(resp => {
        console.log(resp.data);
        if(typeof resp.data === 'object'){
          setUserData(resp.data);
        } else {
          setUserData([]);
          alert('Session has expired. Kindly Login again');
          props.history.push('/login');
        }
      });
  }, [props.history, props.sessionId]);

  const deleteHandler = (userIndex) => {
    axios.delete(`http://localhost:5000/users.json/${props.sessionId}?id=${userIndex}`)
      .then(resp => {
        if(typeof resp.data === 'object'){
          setUserData(resp.data);
        } else {
          alert('Session has expired. Kindly Login again');
          props.history.push('/login');
        }
      });
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

export default withRouter(Home);