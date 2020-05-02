import React, { useEffect, useState } from "react";
import Home from "./components/Home/Home";
import NewUser from "./components/NewUser/NewUser";
import Login from "./components/Login/Login";
import { NavLink, Switch, Route, Redirect, withRouter } from "react-router-dom";
import axios from 'axios'
import "./App.css";

function App(props) {
  const [sessionData, setSessionData] = useState(null);
  useEffect(() => {
    console.log('app.js');
    let sessionId = sessionStorage.getItem("sessionId");
    let expiryDate = sessionStorage.getItem('expiryDate');
    if(!sessionId){
      setSessionData(null);
    } else {
      if(expiryDate < Date.now()) {
        sessionStorage.clear();
        setSessionData(null);
      } else {
        setSessionData({sessionId: sessionId,  expiryDate: expiryDate})
      }
    }
  }, []);

  const submitHandler = (event, loginData) => {
    event.preventDefault();
    console.log(loginData);
    axios.post('http://localhost:5000/login', loginData)
      .then(resp => {
        console.log(resp.data);
        setSessionData({sessionId: resp.data.id, expiryDate: resp.data.expiryDate});
        sessionStorage.setItem('sessionId', resp.data.id);
        sessionStorage.setItem('expiryDate', resp.data.expiryDate);
        props.history.push('/');
      });
  }

  let routes = (
    <Switch>
      <Route path="/" exact render={() => <Home sessionId={sessionData.sessionId} />}></Route>
      <Route path="/add-user" render={() => <NewUser sessionId={sessionData.sessionId} />}></Route>
      <Redirect to="/" />
    </Switch>
  );

  if (!sessionData) {
    routes = (
      <Switch>
        <Route path="/login" render={() => <Login submitHandler={submitHandler}/>}></Route>
        <Redirect to="/login" />
      </Switch>
    );
  }

  return (
    <div className="App">
      <nav className="NavBar">
        <div style={{ fontSize: "1.3rem", fontWeight: "bold" }}>
          <NavLink to="/">ExpressApp</NavLink>
        </div>
        <div className="NavLinks">
          <div>
            <NavLink to="/add-user">Add User</NavLink>
          </div>
          <div>
            <a href="http://localhost:5000/about-us">AboutUs</a>
          </div>
          {!sessionData && (
            <div>
              <NavLink to="/login">Login</NavLink>
            </div>
          )}
        </div>
      </nav>
      {routes}
    </div>
  );
}

export default withRouter(App);
