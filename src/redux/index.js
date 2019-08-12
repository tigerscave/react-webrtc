import { createBrowserHistory } from "history";
import { createStore as _createStore, compose } from "redux";
import reducers from "./reducers";
import middlewares from "./middlewares";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";

export const history = createBrowserHistory();

const devTools =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
    : null;

const createStore = () =>
  _createStore(reducers(history), composeWithDevTools(middlewares(history)));

export default createStore;
