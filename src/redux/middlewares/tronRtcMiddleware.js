import * as tronRtcAction from "../reducers/tronRtc";

const tronRtcMiddleware = store => next => async action => {
  next(action);

  const { socket } = store.getState().tronSocketIo;
  const { peerConnection } = store.getState().tronRtc;

  if (action.type === tronRtcAction.REGISTER_PEER_EVENTS) {
    peerConnection.addEventListener("iceconnectionstatechange", () => {
      store.dispatch(tronRtcAction.iceConnectionStateChange());
    });

    peerConnection.addEventListener("signalingstatechange", () => {
      store.dispatch(tronRtcAction.signalingStateChange());
    });

    peerConnection.addEventListener("connectionstatechange", () => {
      store.dispatch(tronRtcAction.connectionStateChange());
    });

    peerConnection.addEventListener("datachannel", e => {
      const { channel } = e;
      channel.addEventListener("message", event => {
        store.dispatch(tronRtcAction.receiveMessageDataChannel(event));
      });
    });
  }

  if (action.type === tronRtcAction.RECEIVE_DESCRIPTION) {
    const { description, fromUserId } = action.payload;
    await peerConnection.setRemoteDescription(description);
    const desc = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(desc);
    socket.emit("answer", {
      description: desc,
      userId: fromUserId
    });
  }

  // TASK: refactoring this from here to media middleware
  if (action.type === tronRtcAction.ADD_VIDEO_TRACK) {
    const mediaStream = action.payload;
    console.log(mediaStream);
    console.log(mediaStream.getTracks());

    mediaStream.getTracks().forEach(track => {
      peerConnection.addTrack(track, mediaStream);
    });
  }

  if (action.type === tronRtcAction.HANDLE_NEW_ICE_CANDIDATE) {
    const candidate = action.payload;
    peerConnection.addIceCandidate(candidate);
  }

  // TASK: refactoring this from here to media middleware
  if (action.type === tronRtcAction.REPLACE_VIDEO_TRACK) {
    const mediaStream = action.payload;

    const videoTrack = mediaStream.getVideoTracks()[0];
    const sender = peerConnection.getSenders().find(s => {
      if (s.track) {
        return s.track.label === videoTrack.label;
      } else {
        return false;
      }
    });
    if (sender) sender.replaceTrack(videoTrack);
  }

  // TASK: refactoring this from here to media middleware
  if (action.type === tronRtcAction.UPDATE_VIDEO_FPS) {
    const { fps, mediaStreamId } = action.payload;

    // find deviceId from mediaStream.id
    const localStreams = peerConnection.getLocalStreams();
    const targetMediaStream = localStreams.find(s => s.id === mediaStreamId);
    const targetDeviceLabel = targetMediaStream.getVideoTracks()[0].label;

    const devices = await navigator.mediaDevices.enumerateDevices();
    const targetDevice = devices.find(d => d.label === targetDeviceLabel);

    const mediaStream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        deviceId: targetDevice.deviceId,
        frameRate: {
          max: fps
        }
      }
    });

    store.dispatch(tronRtcAction.replaceVideoTrack(mediaStream));
  }
};

export default tronRtcMiddleware;
