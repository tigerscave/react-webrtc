import { applyMiddleware } from "redux";
import { routerMiddleware } from "connected-react-router";
import socketMiddleware from "./socketMiddleware";

export default history =>
  applyMiddleware(routerMiddleware(history), socketMiddleware);
