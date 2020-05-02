import React, { useState } from 'react';

const Login = (props) => {
  const [loginData, setLoginData] = useState('');

  return (
    <div className="NewUser">
      <h1>Login</h1>
      <p>Enter Github username</p>
      <form onSubmit={(event) => props.loginHandler(event, loginData)}>
        <div className="FormControl">
          <label htmlFor="github">Github Username</label>
          <input
            id="github"
            type="text"
            placeholder="Username"
            onChange={(event) => setLoginData(event.target.value)}
            value={loginData}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login;