import { createBrowserHistory } from "history";
import { createStore as _createStore, compose } from "redux";
import reducers from "./reducers";
import middlewares from "./middlewares";

export const history = createBrowserHistory();

const createStore = () =>
  _createStore(
    reducers(history),
    compose(
      middlewares(history),
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  );

export default createStore;
