import { connectRouter } from "connected-react-router";
import { combineReducers } from "redux";

import socketIo from "./socketIo";

export default history =>
  combineReducers({
    router: connectRouter(history),
    socketIo
  });
