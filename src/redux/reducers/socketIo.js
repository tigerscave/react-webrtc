import { createAction } from "redux-actions";
import io from "socket.io-client";

export const ON_CONNECT_SOCKET = "socket/ON_CONNECT";
export const onConnectSocket = createAction(ON_CONNECT_SOCKET);

export const ON_CONNECT_SOCKET_SUCCESS = "socket/ON_CONNECT_SUCCESS";
export const onConnectSocketSuccess = createAction(ON_CONNECT_SOCKET_SUCCESS);

export const REGISTER_SOCKET_EVENTS = "socket/REGISTER_SOCKET_EVENTS";
export const registerSocketEvents = createAction(REGISTER_SOCKET_EVENTS);

const INITIAL_STATE = {
  socket: io("https://telp-public-server.herokuapp.com/"),
  socketId: ""
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ON_CONNECT_SOCKET: {
      const socket = action.payload;
      return {
        ...state,
        socketId: socket.id
      };
    }

    default: {
      return state;
    }
  }
};

export default reducer;
