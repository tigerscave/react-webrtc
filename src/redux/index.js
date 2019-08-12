import { createBrowserHistory } from "history";
import { createStore as _createStore } from "redux";
import reducers from "./reducers";
import middlewares from "./middlewares";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";

export const history = createBrowserHistory();

const createStore = () =>
  _createStore(reducers(history), composeWithDevTools(middlewares(history)));

export default createStore;
