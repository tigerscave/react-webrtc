import { createAction } from "redux-actions";
import io from "socket.io-client";

export const ON_CONNECT_SOCKET = "socket/ON_CONNECT";
export const onConnectSocket = createAction(ON_CONNECT_SOCKET);

export const ON_CONNECT_SOCKET_SUCCESS = "socket/ON_CONNECT_SUCCESS";
export const onConnectSocketSuccess = createAction(ON_CONNECT_SOCKET_SUCCESS);

export const REGISTER_SOCKET_EVENTS = "socket/REGISTER_SOCKET_EVENTS";
export const registerSocketEvents = createAction(REGISTER_SOCKET_EVENTS);

export const FETCH_USER_LIST = "socket/FETCH_USER_LIST";
export const fetchUserList = createAction(FETCH_USER_LIST);

export const FETCH_USER_LIST_SUCCESS = "socket/FETCH_USER_LIST_SUCCESS";
export const fetchUserListSuccess = createAction(FETCH_USER_LIST_SUCCESS);

export const REPLACE_VIDEO_TRACK = "socket/REPLACE_VIDEO_TRACK";
export const replaceVideoTrack = createAction(REPLACE_VIDEO_TRACK);

export const UPDATE_REMOTE_VIDEO_CONSTRAINTS =
  "socket/UPDATE_REMOTE_VIDEO_CONSTRAINTS";
export const updateRemoteVideoConstraints = createAction(
  UPDATE_REMOTE_VIDEO_CONSTRAINTS
);

export const MULTI_CAMERA_REQUEST = "socket/MULTI_CAMERA_REQUEST";
export const multiCameraRequest = createAction(MULTI_CAMERA_REQUEST);

export const AUDIO_LIST_REQUEST = "socket/AUDIO_LIST_REQUEST";
export const audioListRequest = createAction(AUDIO_LIST_REQUEST);

export const RECEIVE_AUDIO_DEVICES = "socket/RECEIVE_AUDIO_DEVICES";
export const receiveAudioDevices = createAction(RECEIVE_AUDIO_DEVICES);

export const AUDIO_REQUEST = "socket/AUDIO_REQUEST";
export const audioRequest = createAction(AUDIO_REQUEST);

export const RELOAD_CONNECTION = "socket/RELOAD_CONNECTION";
export const reloadConnection = createAction(RELOAD_CONNECTION);

const INITIAL_STATE = {
  socket: io("https://telp-public-server.herokuapp.com/"),
  socketId: "",
  userList: [],
  audioDevices: []
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ON_CONNECT_SOCKET: {
      const socket = action.payload;
      return {
        ...state,
        socketId: socket.id
      };
    }

    case FETCH_USER_LIST_SUCCESS: {
      return {
        ...state,
        userList: action.payload
      };
    }

    case RECEIVE_AUDIO_DEVICES: {
      return {
        ...state,
        audioDevices: action.payload
      };
    }

    default: {
      return state;
    }
  }
};

export default reducer;
