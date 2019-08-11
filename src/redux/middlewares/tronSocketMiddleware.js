import * as tronSocketIoAction from "../reducers/tronSocketIo";
import * as tronRtcAction from "../reducers/tronRtc";

const tronSocketMiddleware = store => next => action => {
  next(action);

  const { socket } = store.getState().tronSocketIo;

  if (action.type === tronSocketIoAction.REGISTER_SOCKET_EVENTS) {
    socket.on("connect", () => {
      store.dispatch(tronSocketIoAction.onConnectSocket(socket));
    });

    socket.on("offerFromWarpGo", data => {
      console.warn("offerFromWarpGo");
      console.log(data);
      store.dispatch(tronRtcAction.receiveDescription(data));
    });

    socket.on("new-ice-candidate", candidate => {
      store.dispatch(tronRtcAction.handleNewIceCandidate(candidate));
    });
  }

  if (action.type === tronSocketIoAction.CREATE_USER_NAME) {
    const roidName = localStorage.getItem("roidName");
    console.log("roidName : ", roidName);
    socket.emit("addName", roidName);
  }
};

export default tronSocketMiddleware;
