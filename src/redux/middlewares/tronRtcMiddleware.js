import * as tronRtcAction from "../reducers/tronRtc";
import {
  rewriteSdpForV9Codec,
  convertResolutionToWidth
} from "./helpers/rtcMiddlewareHelper";

const offerOptions = {
  offerToReceiveAudio: 1,
  offerToReceiveVideo: 1
};

const tronRtcMiddleware = store => next => async action => {
  next(action);

  const { socket } = store.getState().tronSocketIo;
  const { peerConnection, callerId } = store.getState().tronRtc;

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

    peerConnection.addEventListener("negotiationneeded", () => {
      store.dispatch(tronRtcAction.negotiationNeeded());
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
    const rewritedSdp = rewriteSdpForV9Codec(desc.sdp);
    socket.emit("answer", {
      description: {
        type: desc.type,
        sdp: rewritedSdp
      },
      userId: fromUserId
    });
  }

  // TASK: refactoring this from here to media middleware
  if (action.type === tronRtcAction.ADD_VIDEO_TRACK) {
    const mediaStream = action.payload;

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
  if (action.type === tronRtcAction.UPDATE_VIDEO_CONSTRAINTS) {
    const { fps, mediaStreamId, resolution } = action.payload;

    // find deviceId from mediaStream.id
    const localStreams = peerConnection.getLocalStreams();
    const targetMediaStream = localStreams.find(s => s.id === mediaStreamId);
    const targetDeviceLabel = targetMediaStream.getVideoTracks()[0].label;

    const devices = await navigator.mediaDevices.enumerateDevices();
    const targetDevice = devices.find(d => d.label === targetDeviceLabel);

    console.warn(resolution);
    const maxWidth = convertResolutionToWidth(resolution);

    const mediaStream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        deviceId: targetDevice.deviceId,
        frameRate: {
          max: fps
        },
        width: {
          max: maxWidth
        }
      }
    });

    store.dispatch(tronRtcAction.replaceVideoTrack(mediaStream));
  }

  // TASK: refactoring this from here to media middleware
  if (action.type === tronRtcAction.MULTI_CAMERA_STREAM) {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const videoDevices = devices.filter(device => device.kind === "videoinput");

    videoDevices.forEach(async videoDevice => {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          deviceId: videoDevice.deviceId,
          frameRate: {
            max: 1
          },
          width: {
            max: 1280
          }
        }
      });

      store.dispatch(tronRtcAction.addVideoTrack(mediaStream));
    });
  }

  if (action.type === tronRtcAction.AUDIO_LIST_REQUEST) {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const audioDevices = devices.filter(device => device.kind === "audioinput");

    socket.emit("message", {
      calleeId: callerId,
      message: {
        label: "audioDevices",
        value: audioDevices
      }
    });
  }

  if (action.type === tronRtcAction.AUDIO_STREAM) {
    const audioDeviceId = action.payload;
    const audioStream = await navigator.mediaDevices.getUserMedia({
      audio: {
        deviceId: audioDeviceId
      },
      video: false
    });

    store.dispatch(tronRtcAction.addVideoTrack(audioStream));
  }

  if (action.type === tronRtcAction.NEGOTIATION_NEEDED) {
    const desc = await peerConnection.createOffer(offerOptions);
    if (desc) {
      const rewritedSdp = rewriteSdpForV9Codec(desc.sdp);
      await peerConnection.setLocalDescription(desc);
      socket.emit("offer", {
        description: {
          type: desc.type,
          sdp: rewritedSdp
        },
        userId: callerId
      });
    }
  }
};

export default tronRtcMiddleware;
