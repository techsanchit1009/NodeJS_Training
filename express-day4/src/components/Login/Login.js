import React, { useState } from 'react';

const Login = (props) => {
  let initialLoginState = {
    email: '',
    password: ''
  }
  const [loginData, setLoginData] = useState(initialLoginState);

  return (
    <div className="NewUser">
      <h1>Login</h1>
      <form onSubmit={(event) => props.submitHandler(event, loginData)}>
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
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login;