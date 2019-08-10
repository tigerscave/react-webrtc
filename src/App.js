import React from "react";
import { Router, Route } from "react-router-dom";
import IndexPage from "./pages";
import OperatorDemoPage from "./pages/operator-demo";
import { history } from "./redux";
import KanarobotronDemoPage from "./pages/kanarobotron-demo";

const App = () => {
  return (
    <Router history={history}>
      <Route path="/" exact component={IndexPage} />
      <Route path="/operator-demo" exact component={OperatorDemoPage} />
      <Route path="/kanarobotron-demo" exact component={KanarobotronDemoPage} />
    </Router>
  );
};

export default App;
