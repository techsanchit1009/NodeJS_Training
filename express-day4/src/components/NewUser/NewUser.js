import React, { useState, useEffect } from "react";
import "./NewUser.css";
import axios from 'axios';
import { withRouter } from "react-router-dom";

const NewUser = (props) => {
  let initialUserState = {
    name: '',
    email: ''
  }
  const [userData, setUserData] = useState(initialUserState);
  const submitHandler = (event) => {
    event.preventDefault();
    axios.post(`http://localhost:5000/users.json/${props.sessionId}`, userData)
      .then(resp => {
        if(resp.data){
          props.history.push('/');
        } else {
          // alert('Session has expired');
          props.history.push('/login');
        }
      });
  }
  return (
    <div className="NewUser">
      <h1>Add user</h1>
      <form onSubmit={submitHandler}>
        <div className="FormControl">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            placeholder="Full Name"
            onChange={(event) => setUserData({...userData, name: event.target.value})}
            value={userData.name}
            required
          />
        </div>
        <div className="FormControl">
          <label htmlFor="email">EmailID</label>
          <input
            id="email"
            type="email"
            placeholder="Email ID"
            onChange={(event) => setUserData({...userData, email: event.target.value})}
            value={userData.email}
            required
          />
        </div>
        <button type="submit">Add User</button>
      </form>
    </div>
  );
};

export default withRouter(NewUser);
