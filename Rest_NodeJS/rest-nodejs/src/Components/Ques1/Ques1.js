import React, { useState, useEffect } from 'react';
import './Ques1.css';
import axios from 'axios';

const Ques1 = () => {
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/users.json').then(resp => setSearchResult(resp.data));
  }, []);

  const searchHandler = (input) => {
    let searchInput = input.trim('');
    axios.get(`http://localhost:4000/users.json?userName=${searchInput}`).then(resp => setSearchResult(resp.data));
  }

  return(
    <div className="SearchArea">
      <h1>Search for any User</h1>
      <input type="text" placeholder="Enter username" onChange={(event) => searchHandler(event.target.value)}/>
        <div className="SearchResult">
        {searchResult.map(user => (
          <div className="Result" key={user.userName}>
            <div>UserName: {user.userName}</div>
            <div>Password: {user.password}</div>
            <div>FirstName: {user.firstName}</div>
            <div>LastName: {user.lastName}</div>  
          </div>
        ))}
      </div>
    </div>
  )
};

export default Ques1;