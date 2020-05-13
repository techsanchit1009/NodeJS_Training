import React from 'react';
import Signup from './components/Auth/Signup/Signup';
import Login from './components/Auth/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import { NavLink, Switch, Route } from 'react-router-dom'
import './App.css';

function App(props) {
  
  let routes = (
    <Switch>
    <Route path="/" exact render={Dashboard}></Route>
    <Route path="/login" component={Login}></Route>
    <Route path="/signup" component={Signup}></Route>
    </Switch>
  )

  return (
    <div className="App">
      <nav className="NavBar">
        <div style={{fontSize: '1.3rem', fontWeight: 'bold'}}><NavLink to="/">Passport App</NavLink></div>
        <div className="NavLinks">
          <div><NavLink to="/login">Login</NavLink></div>
          <div><NavLink to="/signup">Signup</NavLink></div>
        </div>
      </nav>
      {routes}
    </div>
  );
}

export default App;
