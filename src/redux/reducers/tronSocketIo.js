import { createAction } from "redux-actions";
import io from "socket.io-client";

export const ON_CONNECT_SOCKET = "tronSocketIo/ON_CONNECT_SOCKET";
export const onConnectSocket = createAction(ON_CONNECT_SOCKET);

export const REGISTER_SOCKET_EVENTS = "tronSocketIo/REGISTER_SOCKET_EVENTS";
export const registerSocketEvents = createAction(REGISTER_SOCKET_EVENTS);

export const CREATE_USER_NAME = "tronSocketIo/CREATE_USER_NAME";
export const createUserName = createAction(CREATE_USER_NAME);

const INITIAL_STATE = {
  socket: io("https://telp-public-server.herokuapp.com/"),
  socketId: "",
  userList: []
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
