import * as socketIoAction from "../reducers/socketIo";

const socketMiddleware = store => next => action => {
  next(action);

  if (action.type === socketIoAction.REGISTER_SOCKET_EVENTS) {
    const { socket } = store.getState().socketIo;

    socket.on("connect", () => {
      store.dispatch(socketIoAction.onConnectSocket(socket));
    });
  }
};

export default socketMiddleware;
