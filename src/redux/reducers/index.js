import { connectRouter } from "connected-react-router";
import { combineReducers } from "redux";

import socketIo from "./socketIo";
import rtc from "./rtc";

export default history =>
  combineReducers({
    router: connectRouter(history),
    socketIo,
    rtc
  });
