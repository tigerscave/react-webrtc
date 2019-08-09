import React from "react";
import { Router, Route } from "react-router-dom";
import IndexPage from "./pages";
import OperatorDemoPage from "./pages/operator-demo";
import VideoWindowPage from "./pages/video-window";
import { history } from "./redux";

const App = () => {
  return (
    <Router history={history}>
      <Route path="/" exact component={IndexPage} />
      <Route path="/operator-demo" exact component={OperatorDemoPage} />
      <Route path="/video-window" component={VideoWindowPage} />
    </Router>
  );
};

export default App;
