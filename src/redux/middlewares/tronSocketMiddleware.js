import * as tronSocketIoAction from "../reducers/tronSocketIo";

const tronSocketMiddleware = store => next => action => {
  next(action);

  const { socket } = store.getState().tronSocketIo;

  if (action.type === tronSocketIoAction.REGISTER_SOCKET_EVENTS) {
    socket.on("connect", () => {
      store.dispatch(tronSocketIoAction.onConnectSocket(socket));
    });
  }

  if (action.type === tronSocketIoAction.CREATE_USER_NAME) {
    const roidName = localStorage.getItem("roidName");
    console.log("roidName : ", roidName);
    socket.emit("addName", roidName);
  }
};

export default tronSocketMiddleware;
