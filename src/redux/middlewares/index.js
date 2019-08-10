import { applyMiddleware } from "redux";
import { routerMiddleware } from "connected-react-router";
import socketMiddleware from "./socketMiddleware";
import rtcMiddleware from "./rtcMiddleware";
import tronSocketMiddleware from "./tronSocketMiddleware";

export default history =>
  applyMiddleware(
    routerMiddleware(history),
    socketMiddleware,
    rtcMiddleware,
    tronSocketMiddleware
  );
