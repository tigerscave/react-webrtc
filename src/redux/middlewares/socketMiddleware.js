import * as socketIoAction from "../reducers/socketIo";
import * as rtcAction from "../reducers/rtc";

const socketMiddleware = store => next => action => {
  next(action);
  const { socket } = store.getState().socketIo;
  const { peerConnection, calleeId } = store.getState().rtc;

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

    //TASK : change all communication to message
    socket.on("offerFromWarpGo", data => {
      store.dispatch(rtcAction.receiveDescription(data));
    });

    socket.on("message", data => {
      console.log("data", data);

      switch (data.label) {
        case "audioDevices": {
          console.log(data.value);

          // TASK: refactoring this action to operatorDevice
          store.dispatch(socketIoAction.receiveAudioDevices(data.value));
          break;
        }

        default:
          return null;
      }
    });
  }

  if (action.type === socketIoAction.FETCH_USER_LIST) {
    socket.emit("getUserList");
  }

  if (action.type === socketIoAction.UPDATE_REMOTE_VIDEO_CONSTRAINTS) {
    const { fps, mediaStreamId, resolution } = action.payload;
    socket.emit("message", {
      calleeId,
      message: {
        label: "updateConstraints",
        value: {
          fps,
          mediaStreamId,
          resolution
        }
      }
    });
  }

  if (action.type === socketIoAction.MULTI_CAMERA_REQUEST) {
    socket.emit("message", {
      calleeId,
      message: {
        label: "multiCameraRequest"
      }
    });
  }

  if (action.type === socketIoAction.AUDIO_LIST_REQUEST) {
    socket.emit("message", {
      calleeId,
      message: {
        label: "audioListRequest"
      }
    });
  }
};

export default socketMiddleware;
