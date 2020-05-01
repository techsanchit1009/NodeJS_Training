import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  let initialLoginState = {
    email: '',
    password: ''
  }
  const [loginData, setLoginData] = useState(initialLoginState);

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(loginData);
    axios.post('http://localhost:5000/login', loginData)
      .then(resp => {
        console.log(resp.data);
        setLoginData(initialLoginState);
      });
  }

  return (
    <div className="NewUser">
      <h1>Login</h1>
      <form onSubmit={submitHandler}>
        <div className="FormControl">
          <label htmlFor="email">EmailID</label>
          <input
            id="email"
            type="email"
            placeholder="Email ID"
            onChange={(event) => setLoginData({...loginData, email: event.target.value})}
            value={loginData.email}
            required
          />
        </div>
        <div className="FormControl">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            onChange={(event) => setLoginData({...loginData, password: event.target.value})}
            value={loginData.password}
            required
          />
        </div>
        <button type="submit">Add User</button>
      </form>
    </div>
  )
}

export default Login;