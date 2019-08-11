import { connectRouter } from "connected-react-router";
import { combineReducers } from "redux";

import socketIo from "./socketIo";
import rtc from "./rtc";

import tronSocketIo from "./tronSocketIo";
import tronRtc from "./tronRtc";

export default history =>
  combineReducers({
    router: connectRouter(history),
    socketIo,
    rtc,
    tronSocketIo,
    tronRtc
  });
