import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={{margin: '1rem'}}>
      <h2><Link to="/ques1" style={{textDecoration: 'none'}}>Ques1: /ques1</Link></h2>
      <h2><Link to="/ques2" style={{textDecoration: 'none'}}>Ques2: /ques2</Link></h2>
      <h2><Link to="/ques3" style={{textDecoration: 'none'}}>Ques3: /ques3</Link></h2>
    </div>
  );
};

export default Home;