import { createAction } from "redux-actions";

export const ASSIGN_CALLEE_ID = "rtc/ASSIGN_CALLEE_ID";
export const assignCalleeId = createAction(ASSIGN_CALLEE_ID);

export const REGISTER_PEER_EVENTS = "rtc/REGISTER_PEER_EVENTS";
export const registerPeerEvents = createAction(REGISTER_PEER_EVENTS);

export const ICE_CONNECTION_STATE_CHANGE = "rtc/ICE_CONNECTION_STATE_CHANGE";
export const iceConnectionStateChange = createAction(
  ICE_CONNECTION_STATE_CHANGE
);

export const SIGNALING_STATE_CHANGE = "rtc/SIGNALING_STATE_CHANGE";
export const signalingStateChange = createAction(SIGNALING_STATE_CHANGE);

export const CONNECTION_STATE_CHANGE = "rtc/CONNECTION_STATE_CHANGE";
export const connectionStateChange = createAction(CONNECTION_STATE_CHANGE);

export const NEGOTIATION_NEEDED = "rtc/NEGOTIATION_NEEDED";
export const negotiationNeeded = createAction(NEGOTIATION_NEEDED);

export const HANDLE_ON_ICE_CANDIDATE = "rtc/HANDLE_ON_ICE_CANDIDATE";
export const handleOnIceCandidate = createAction(HANDLE_ON_ICE_CANDIDATE);

export const ASSIGN_DATA_CHANNEL = "rtc/ASSIGN_DATA_CHANNEL";
export const assignDataChannel = createAction(ASSIGN_DATA_CHANNEL);

export const HANDLE_ON_TRACK = "rtc/HANDLE_ON_TRACK";
export const handleOnTrack = createAction(HANDLE_ON_TRACK);

export const RECEIVE_DESCRIPTION = "rtc/RECEIVE_DESCRIPTION";
export const receiveDescription = createAction(RECEIVE_DESCRIPTION);

export const HANDLE_AUDIO_TRACK = "rtc/HANDLE_AUDIO_TRACK";
export const handleAudioTrack = createAction(HANDLE_AUDIO_TRACK);

const INITIAL_STATE = {
  calleeId: "",
  peerConnection: new RTCPeerConnection(),
  iceConnectionState: "",
  connectionState: "",
  signalingState: "",
  iceGatheringState: "",
  sendChannel: null,
  videoSrcObject: null,
  mediaStreams: [],
  audioStream: null
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ASSIGN_CALLEE_ID: {
      const { peerConnection } = state;
      return {
        ...state,
        calleeId: action.payload,
        iceConnectionState: peerConnection.iceConnectionState,
        connectionState: peerConnection.connectionState,
        signalingState: peerConnection.signalingState,
        iceGatheringState: peerConnection.iceGatheringState
      };
    }

    case ICE_CONNECTION_STATE_CHANGE: {
      const { peerConnection } = state;

      return {
        ...state,
        iceConnectionState: peerConnection.iceConnectionState,
        connectionState: peerConnection.connectionState,
        signalingState: peerConnection.signalingState,
        iceGatheringState: peerConnection.iceGatheringState
      };
    }

    case ASSIGN_DATA_CHANNEL: {
      const { peerConnection } = state;
      return {
        ...state,
        sendChannel: peerConnection.createDataChannel("dataChannel", null)
      };
    }

    case SIGNALING_STATE_CHANGE: {
      const { peerConnection } = state;
      return {
        ...state,
        iceConnectionState: peerConnection.iceConnectionState,
        connectionState: peerConnection.connectionState,
        signalingState: peerConnection.signalingState,
        iceGatheringState: peerConnection.iceGatheringState
      };
    }

    case CONNECTION_STATE_CHANGE: {
      const { peerConnection } = state;
      if (peerConnection.connectionState === "connected") {
        console.log(peerConnection.getTransceivers());
        console.log(peerConnection.getRemoteStreams());
      }
      return {
        ...state,
        iceConnectionState: peerConnection.iceConnectionState,
        connectionState: peerConnection.connectionState,
        signalingState: peerConnection.signalingState,
        iceGatheringState: peerConnection.iceGatheringState,
        mediaStreams: peerConnection.getRemoteStreams()
      };
    }

    case HANDLE_ON_ICE_CANDIDATE: {
      const { peerConnection } = state;
      return {
        ...state,
        iceConnectionState: peerConnection.iceConnectionState,
        connectionState: peerConnection.connectionState,
        signalingState: peerConnection.signalingState,
        iceGatheringState: peerConnection.iceGatheringState
      };
    }

    case HANDLE_ON_TRACK: {
      const event = action.payload;
      return {
        ...state,
        videoSrcObject: event.streams[0]
      };
    }

    case HANDLE_AUDIO_TRACK: {
      const event = action.payload;
      return {
        ...state,
        audioStream: event.streams[0]
      };
    }

    default: {
      return state;
    }
  }
};

export default reducer;
