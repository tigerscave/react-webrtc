import React from "react";
import { BrowserRouter as Router , Route } from "react-router-dom";
import IndexPage from "./pages"
import OperatorDemoPage from "./pages/operator-demo";

const App = () => {
  return (
    <Router>
      <Route path="/" exact component={IndexPage} />
      <Route path="/operator-demo" exact component={OperatorDemoPage} />
    </Router>
  );
}

export default App;
