import React from "react";
import Ques1 from "./Components/Ques1/Ques1";
import Ques2 from "./Components/Ques2/Ques2";
import Ques3 from './Components/Ques3/Ques3';
import Home from "./Components/Home";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/ques1" component={Ques1} />
          <Route path="/ques2" component={Ques2} />
          <Route path="/ques3" component={Ques3} />
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
