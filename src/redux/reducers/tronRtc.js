import { createAction } from "redux-actions";

export const REGISTER_PEER_EVENTS = "tronRtc/REGISTER_PEER_EVENTS";
export const registerPeerEvents = createAction(REGISTER_PEER_EVENTS);

export const ICE_CONNECTION_STATE_CHANGE =
  "tronRtc/ICE_CONNECTION_STATE_CHANGE";
export const iceConnectionStateChange = createAction(
  ICE_CONNECTION_STATE_CHANGE
);

export const SIGNALING_STATE_CHANGE = "tronRtc/SIGNALING_STATE_CHANGE";
export const signalingStateChange = createAction(SIGNALING_STATE_CHANGE);

export const CONNECTION_STATE_CHANGE = "tronRtc/CONNECTION_STATE_CHANGE";
export const connectionStateChange = createAction(CONNECTION_STATE_CHANGE);

export const RECEIVE_DESCRIPTION = "tronRtc/RECEIVE_DESCRIPTION";
export const receiveDescription = createAction(RECEIVE_DESCRIPTION);

export const RECEIVE_MESSAGE_DATA_CHANNEL =
  "tronRtc/RECEIVE_MESSAGE_DATA_CHANNEL";
export const receiveMessageDataChannel = createAction(
  RECEIVE_MESSAGE_DATA_CHANNEL
);

export const ADD_VIDEO_TRACK = "tronRtc/ADD_VIDEO_TRACK";
export const addVideoTrack = createAction(ADD_VIDEO_TRACK);

export const HANDLE_NEW_ICE_CANDIDATE = "tronRtc/HANDLE_NEW_ICE_CANDIDATE";
export const handleNewIceCandidate = createAction(HANDLE_NEW_ICE_CANDIDATE);

export const REPLACE_VIDEO_TRACK = "tronRtc/REPLACE_VIDEO_TRACK";
export const replaceVideoTrack = createAction(REPLACE_VIDEO_TRACK);

export const UPDATE_VIDEO_CONSTRAINTS = "tronRtc/UPDATE_VIDEO_CONSTRAINTS";
export const updateVideoConstraints = createAction(UPDATE_VIDEO_CONSTRAINTS);

export const MULTI_CAMERA_STREAM = "tronRtc/MULTI_CAMERA_STREAM";
export const multiCameraStream = createAction(MULTI_CAMERA_STREAM);

export const NEGOTIATION_NEEDED = "tronRtc/NEGOTIATION_NEEDED";
export const negotiationNeeded = createAction(NEGOTIATION_NEEDED);

const INITIAL_STATE = {
  callerId: "",
  peerConnection: new RTCPeerConnection(),
  iceConnectionState: "",
  connectionState: "",
  signalingState: "",
  iceGatheringState: "",
  receivedData: null
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RECEIVE_DESCRIPTION: {
      const { fromUserId } = action.payload;
      return {
        ...state,
        callerId: fromUserId
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
      }
      return {
        ...state,
        iceConnectionState: peerConnection.iceConnectionState,
        connectionState: peerConnection.connectionState,
        signalingState: peerConnection.signalingState,
        iceGatheringState: peerConnection.iceGatheringState
      };
    }

    case RECEIVE_MESSAGE_DATA_CHANNEL: {
      console.log(action.payload);
      return {
        ...state
      };
    }

    default: {
      return state;
    }
  }
};

export default reducer;
