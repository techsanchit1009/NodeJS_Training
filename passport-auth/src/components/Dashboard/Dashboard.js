import React from "react";
import classes from "./Dashboard.module.css";
import axios from "axios";
import queryString from "query-string";
import { withRouter, Link } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

const Dashboard = (props) => {
  const [name, setName] = useState();

  useEffect(() => {
    let user = "";
    user = queryString.parse(props.location.search);
    if (!user.length && props.location.state) {
      user = props.location.state;
    }
    if (user) {
      sessionStorage.setItem("name", user.userName);
    }
    setName(user.userName);
  }, [props, name]);

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
