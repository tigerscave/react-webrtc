import React from "react";
import { connect } from "react-redux";
import { fetchUserList } from "../../redux/reducers/socketIo";

const offerOptions = {
  offerToReceiveAudio: 1,
  offerToReceiveVideo: 1
};

class UserList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      localPeerConnection: new RTCPeerConnection(),
      calleeId: "",
      sendChannel: null
    };

    this.handleIceConnectionStateChange = e => {
      const { localPeerConnection } = this.state;
      console.warn("iceconnectionstatechange fired");
      console.log(
        "iceConnectionState:",
        localPeerConnection.iceConnectionState
      );
      console.log("connectionState:", localPeerConnection.connectionState);
    };

    this.handleNegotiationNeededEvent = async () => {
      console.warn("negotiationneeded fired");
      const { localPeerConnection, calleeId } = this.state;
      console.log(calleeId);
      const desc = await localPeerConnection.createOffer(offerOptions);
      if (desc) {
        this.createOfferSuccess(calleeId, desc);
      }
    };

    this.handleSignalingStateChange = () => {
      console.warn("signalingstatechange fired");
      const { localPeerConnection } = this.state;
      console.log("signalingState:", localPeerConnection.signalingState);
      console.log("connectionState:", localPeerConnection.connectionState);
    };

    this.handleOnIceCandidate = async e => {
      const { candidate } = e;
      const { calleeId } = this.state;
      const { socket } = this.props;

      if (candidate) {
        socket.emit("new-ice-candidate", {
          calleeId,
          candidate
        });
      }
    };

    this.registerPeerConnectionEvents = () => {
      const { localPeerConnection, calleeId } = this.state;

      console.log("connectionState:", localPeerConnection.connectionState);

      localPeerConnection.addEventListener(
        "iceconnectionstatechange",
        this.handleIceConnectionStateChange
      );

      localPeerConnection.addEventListener(
        "negotiationneeded",
        this.handleNegotiationNeededEvent
      );

      localPeerConnection.addEventListener(
        "signalingstatechange",
        this.handleSignalingStateChange
      );

      localPeerConnection.addEventListener(
        "icecandidate",
        this.handleOnIceCandidate
      );

      localPeerConnection.addEventListener(
        "track",
        this.handleOnTrackConnection
      );
    };

    // this.onReloadButtonClicked = () => {
    //   const { socket } = this.props;
    //   socket.emit("getUserList");
    // };

    this.createOfferSuccess = async (calleeId, desc) => {
      const { localPeerConnection } = this.state;
      await localPeerConnection.setLocalDescription(desc);
      const { socket } = this.props;
      socket.emit("offer", {
        description: desc,
        userId: calleeId
      });
    };

    this.onCallButtonClicked = async calleeId => {
      this.setState({ calleeId });
      this.registerPeerConnectionEvents();

      const { localPeerConnection } = this.state;

      const desc = await localPeerConnection.createOffer(offerOptions);

      if (desc) {
        this.setState({
          sendChannel: localPeerConnection.createDataChannel(
            "dataChannel",
            null
          )
        });
      }
    };

    this.handleOnTrackConnection = e => {
      this.refs.vidRef.srcObject = e.streams[0];
    };

    this.onHogeButtonClicked = () => {
      console.log("hoge button clicked");
      const { sendChannel } = this.state;
      sendChannel.send("HOGE");
    };
  }

  componentDidMount() {
    const { socket } = this.props;

    const { localPeerConnection } = this.state;

    socket.on("answerToWarpGo", description => {
      console.log("---socket.on answerToWarpGo---");
      localPeerConnection
        .setRemoteDescription(description)
        .then(() => {
          console.warn("---setRemoteDescription---");
          console.log(localPeerConnection);
          console.log(localPeerConnection.getSenders());
          console.log("signalingState", localPeerConnection.signalingState);
          console.log(
            "iceConnectionState",
            localPeerConnection.iceConnectionState
          );
          console.log(
            "iceGatheringState",
            localPeerConnection.iceGatheringState
          );
          console.log("connectionState", localPeerConnection.connectionState);
        })
        .catch(e => {
          console.warn("ERROR: setRemoteDescription");
          console.log(e);
        });
    });
  }

  render() {
    const { onReloadButtonClicked, userList } = this.props;
    return (
      <div>
        <h3>User List</h3>
        <button onClick={onReloadButtonClicked}>Reload</button>
        <ul>
          {userList.map((user, i) => (
            <li key={i}>
              <span>{user.name}</span>
              <button onClick={() => this.onCallButtonClicked(user.id)}>
                CALL
              </button>
            </li>
          ))}
        </ul>
        <video ref="vidRef" autoPlay />
        <button onClick={this.onHogeButtonClicked}>send hoge</button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { userList } = state.socketIo;
  return {
    userList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onReloadButtonClicked: () => dispatch(fetchUserList())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserList);
