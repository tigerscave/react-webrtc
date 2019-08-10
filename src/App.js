import React from "react";
import { Router, Route } from "react-router-dom";
import IndexPage from "./pages";
import OperatorDemoPage from "./pages/operator-demo";
import { history } from "./redux";
import KanarobotronDemoPage from "./pages/kanarobotron-demo";
import KanarobotronRegistName from "./pages/kanarobotron-regist-name";

const App = () => {
  return (
    <Router history={history}>
      <Route path="/" exact component={IndexPage} />
      <Route path="/operator-demo" exact component={OperatorDemoPage} />
      <Route path="/kanarobotron-demo" exact component={KanarobotronDemoPage} />
      <Route
        path="/kanarobotron-regist-name"
        exact
        component={KanarobotronRegistName}
      />
      <style jsx global>{`
        body {
          font-family: sans-serif;
        }
      `}</style>
    </Router>
  );
};

export default App;
