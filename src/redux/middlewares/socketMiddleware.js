import * as socketIoAction from "../reducers/socketIo";

const socketMiddleware = store => next => action => {
  next(action);
  const { socket } = store.getState().socketIo;

  if (action.type === socketIoAction.REGISTER_SOCKET_EVENTS) {
    socket.on("connect", () => {
      store.dispatch(socketIoAction.onConnectSocket(socket));
    });

    socket.on("userList", users => {
      const otherUsers = users.filter(user => user.id !== socket.id);
      store.dispatch(socketIoAction.fetchUserListSuccess(otherUsers));
    });
  }

  if (action.type === socketIoAction.FETCH_USER_LIST) {
    socket.emit("getUserList");
  }
};

export default socketMiddleware;
