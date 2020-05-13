import React, { useState } from "react";
import classes from "./Login.module.css";
import axios from "axios";
import { withRouter } from "react-router-dom";

const Login = (props) => {
  let initialUserState = {
    email: "",
    password: "",
  };
  const [loginData, setLoginData] = useState(initialUserState);
  const [error, setError] = useState("");

  const submitHandler = (event) => {
    event.preventDefault();
    axios.post("http://localhost:5000/auth/login", loginData).then((resp) => {
      if (resp.data.status) {
        alert("Login Successful");
        sessionStorage.setItem('token', resp.data.token);
        sessionStorage.setItem('expiryDate', new Date(Date.now() + 60 * 60000))
        props.history.push("/");
      } else {
        setError(resp.data.error);
      }
    });
  };

  return (
    <div className={classes.Login}>
      <h1>Login</h1>
      {error && (
        <ul>
          <li className={classes.ErrorMessage}>{error.message}</li>
        </ul>
      )}
      <form onSubmit={submitHandler}>
        <div className={classes.FormControl}>
          <label htmlFor="email">EmailID</label>
          <input
            id="email"
            type="email"
            placeholder="Email ID"
            onChange={(event) =>
              setLoginData({ ...loginData, email: event.target.value })
            }
            value={loginData.email}
          />
        </div>
        <div className={classes.FormControl}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            onChange={(event) =>
              setLoginData({ ...loginData, password: event.target.value })
            }
            value={loginData.password}
          />
        </div>
        <button type="submit">Login</button>
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

export default withRouter(Login);
