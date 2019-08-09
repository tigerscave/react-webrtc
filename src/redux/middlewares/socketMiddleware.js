import * as socketIoAction from "../reducers/socketIo";

const socketMiddleware = store => next => action => {
  next(action);
  const { socket } = store.getState().socketIo;
  const { peerConnection } = store.getState().rtc;

  if (action.type === socketIoAction.REGISTER_SOCKET_EVENTS) {
    socket.on("connect", () => {
      store.dispatch(socketIoAction.onConnectSocket(socket));
    });

    socket.on("userList", users => {
      const otherUsers = users.filter(user => user.id !== socket.id);
      store.dispatch(socketIoAction.fetchUserListSuccess(otherUsers));
    });

    socket.on("answerToWarpGo", description => {
      console.log("---socket.on answerToWarpGo---");
      peerConnection
        .setRemoteDescription(description)
        .then(() => {
          console.log("set remote description success");
        })
        .catch(e => {
          console.warn("ERROR: setRemoteDescription");
        });
    });
  }

  if (action.type === socketIoAction.FETCH_USER_LIST) {
    socket.emit("getUserList");
  }
};

export default socketMiddleware;
