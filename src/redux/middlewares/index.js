import { applyMiddleware } from "redux";
import { routerMiddleware } from "connected-react-router";

export default history => applyMiddleware(routerMiddleware(history));
