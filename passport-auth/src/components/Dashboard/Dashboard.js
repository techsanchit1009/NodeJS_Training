import React, { useState, useEffect } from "react";
import classes from "./Dashboard.module.css";
import axios from "axios";
import queryString from "query-string";
import { withRouter, Link } from "react-router-dom";


const Dashboard = (props) => {
  const [name, setName] = useState();

  useEffect(() => {
    axios.get('http://localhost:5000', {
      headers: {'authorization': `bearer ${sessionStorage.getItem('token')}`}
    })
    .then(resp => {
      if(resp.data.status){
        setName(resp.data.name);
      } 
    });
  }, []);

  useEffect(() => {
    let token = {};
    token = queryString.parse(props.location.search);
    if (Object.keys(token).length > 1) {
      sessionStorage.setItem("token", token.token);
      setName(token.name);
    }
  }, [props.location.search, name]);

  const logoutHandler = async () => {
    const resp = await axios.get("http://localhost:5000/auth/logout");
    sessionStorage.clear();
    props.history.push("/login");
    alert(resp.data);
  };

  return (
    <div className={classes.Dashboard}>
      <h1>Hello, {name}</h1>
      {name ? (
        <button className={classes.Logout} onClick={() => logoutHandler()}>
          Logout
        </button>
      ) : (
        <Link style={{ marginTop: "1rem", textDecoration: 'underline' }} to="/login">Please Login</Link>
      )}
    </div>
  );
};

export default withRouter(Dashboard);
