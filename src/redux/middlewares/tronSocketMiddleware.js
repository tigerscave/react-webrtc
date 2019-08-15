import * as tronSocketIoAction from "../reducers/tronSocketIo";
import * as tronRtcAction from "../reducers/tronRtc";

const tronSocketMiddleware = store => next => action => {
  next(action);

  const { socket } = store.getState().tronSocketIo;
  const { peerConnection } = store.getState().tronRtc;

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

    socket.on("message", data => {
      console.log("data", data);
      switch (data.label) {
        case "updateConstraints": {
          const { fps, mediaStreamId, resolution } = data.value;

          // TASK: refactoring this from here to media action
          store.dispatch(
            tronRtcAction.updateVideoConstraints({
              fps,
              mediaStreamId,
              resolution
            })
          );
          break;
        }

        case "multiCameraRequest": {
          store.dispatch(tronRtcAction.multiCameraStream());
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
