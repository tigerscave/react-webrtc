import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import createStore, { history } from "./redux";
import { ConnectedRouter } from "connected-react-router";
import App from "./App";

const store = createStore();

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);
