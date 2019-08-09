import { applyMiddleware } from "redux";
import { routerMiddleware } from "connected-react-router";
import socketMiddleware from "./socketMiddleware";
import rtcMiddleware from "./rtcMiddleware";

export default history =>
  applyMiddleware(routerMiddleware(history), socketMiddleware, rtcMiddleware);
