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
      store.dispatch(tronRtcAction.receiveDescription(data));
    });

    socket.on("new-ice-candidate", candidate => {
      store.dispatch(tronRtcAction.handleNewIceCandidate(candidate));
    });

    socket.on("message", data => {
      switch (data.label) {
        case "updateFps": {
          const { fps, mediaStreamId } = data.value;

          // TASK: refactoring this from here to media action
          store.dispatch(tronRtcAction.updateVideoFps({ fps, mediaStreamId }));
          break;
        }

        default:
          return null;
      }
    });
  }

  if (action.type === tronSocketIoAction.CREATE_USER_NAME) {
    const roidName = localStorage.getItem("roidName");
    socket.emit("addName", roidName);
  }
};

export default tronSocketMiddleware;
