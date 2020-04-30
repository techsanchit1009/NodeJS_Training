import React from 'react';
import Home from './components/Home/Home';
import NewUser from './components/NewUser/NewUser'; 
import { NavLink, Switch, Route } from 'react-router-dom'
import './App.css';

function App() {
  
  let routes = (
    <Switch>
    <Route path="/" exact component={Home}></Route>
    <Route path="/add-user" component={NewUser}></Route>
    </Switch>
  )
  
  return (
    <div className="App">
      <nav className="NavBar">
        <div style={{fontSize: '1.3rem', fontWeight: 'bold'}}><NavLink to="/">ExpressApp</NavLink></div>
        <div className="NavLinks">
          <div><NavLink to="/add-user">Add User</NavLink></div>
          <div><a href="http://localhost:5000/about-us">AboutUs</a></div>
        </div>
      </nav>
      {routes}
    </div>
  );
}

export default App;
