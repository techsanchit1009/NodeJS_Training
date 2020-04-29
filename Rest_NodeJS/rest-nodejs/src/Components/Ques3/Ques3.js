import React, { useState } from 'react';
import "./Ques3.css";
import axios from 'axios';

const Ques3 = () => {
  const [pageResponse, setPageResponse] = useState('');

  const links = ['Home', 'About', 'ContactUs'];

  const pageChangeHandler = (pageIndex) => {
    axios.get(`http://localhost:4000/${links[pageIndex].toLowerCase()}`)
      .then(resp => setPageResponse(resp.data));
  }

  return (
    <div>
      <div className="TopBar">
        {links.map((link, index) => (
          <button key={index} onClick={() => pageChangeHandler(index)}>{link}</button>
        ))}
      </div>
      <div>
        <h1>{pageResponse}</h1>
      </div>
    </div>
  );
}

export default Ques3;