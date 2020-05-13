import React, { useState } from "react";
import classes from "./Signup.module.css";
import axios from 'axios';
import { withRouter } from "react-router-dom";

const Signup = (props) => {
  let initialUserState = {
    name: '',
    age: '',
    email: '',
    password: ''
  }
  const [signupData, setSignupData] = useState(initialUserState);
  const [errors, setErrors] = useState([]);

  const submitHandler = (event) => {
    event.preventDefault();
    axios.post('http://localhost:5000/auth/signup', signupData)
      .then(resp => {
        console.log(resp);
        if(resp.data.status){
          alert('Signup Successful');
          sessionStorage.setItem('token', resp.data.token);
          sessionStorage.setItem('expiryDate', new Date(Date.now() + 60 * 60000))
          props.history.push("/");
        } else {
          setErrors(resp.data.errors);
        }
      });
  }
  return (
    <div className={classes.Signup}>
      <h1>SignUp Now</h1>
      {errors && (
      <div>
        <ul>
          {errors.map((error, i) => (
            <li key={i} className={classes.ErrorMessage}>{error.message}</li>
          ))}
        </ul>
      </div>)}
      <form onSubmit={submitHandler}>
        <div className={classes.FormControl}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            placeholder="Full Name"
            onChange={(event) => setSignupData({...signupData, name: event.target.value})}
            value={signupData.name}
          />
        </div>
        <div className={classes.FormControl}>
          <label htmlFor="age">Age</label>
          <input
            id="age"
            type="text"
            placeholder="Age"
            onChange={(event) => setSignupData({...signupData, age: event.target.value})}
            value={signupData.age}
          />
        </div>
        <div className={classes.FormControl}>
          <label htmlFor="email">EmailID</label>
          <input
            id="email"
            type="text"
            placeholder="Email ID"
            onChange={(event) => setSignupData({...signupData, email: event.target.value})}
            value={signupData.email}
          />
        </div>
        <div className={classes.FormControl}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            onChange={(event) => setSignupData({...signupData, password: event.target.value})}
            value={signupData.password}
          />
        </div>
        <button type="submit">Signup</button>
      </form>
      <p>Continue with Google</p>
      <a href="http://localhost:5000/auth/google"
        className={classes.GoogleLogin}
      >
        Google+
      </a>
    </div>
  );
};

export default withRouter(Signup);
