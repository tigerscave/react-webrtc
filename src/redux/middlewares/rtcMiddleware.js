import * as rtcAction from "../reducers/rtc";

const offerOptions = {
  offerToReceiveAudio: 1,
  offerToReceiveVideo: 1
};

const rtcMiddleware = store => next => async action => {
  next(action);

  const { peerConnection, calleeId } = store.getState().rtc;
  const { socket } = store.getState().socketIo;

  if (action.type === rtcAction.REGISTER_PEER_EVENTS) {
    peerConnection.addEventListener("iceconnectionstatechange", () =>
      store.dispatch(rtcAction.iceConnectionStateChange())
    );

    peerConnection.addEventListener("negotiationneeded", () =>
      store.dispatch(rtcAction.negotiationNeeded())
    );

    peerConnection.addEventListener("signalingstatechange", () =>
      store.dispatch(rtcAction.signalingStateChange())
    );

    peerConnection.addEventListener("connectionstatechange", () => {
      store.dispatch(rtcAction.connectionStateChange());
    });

    peerConnection.addEventListener("icecandidate", e =>
      store.dispatch(rtcAction.handleOnIceCandidate(e))
    );

    peerConnection.addEventListener("track", e =>
      store.dispatch(rtcAction.handleOnTrack(e))
    );
  }

  if (action.type === rtcAction.NEGOTIATION_NEEDED) {
    const desc = await peerConnection.createOffer(offerOptions);
    if (desc) {
      await peerConnection.setLocalDescription(desc);
      socket.emit("offer", {
        description: desc,
        userId: calleeId
      });
    }
  }

  if (action.type === rtcAction.HANDLE_ON_ICE_CANDIDATE) {
    const { candidate } = action.payload;
    if (candidate) {
      socket.emit("new-ice-candidate", {
        calleeId,
        candidate
      });
    }
  }
};

export default rtcMiddleware;
