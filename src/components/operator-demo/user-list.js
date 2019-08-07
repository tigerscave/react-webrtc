import React from "react";

const offerOptions = {
  offerToReceiveAudio: 1,
  offerToReceiveVideo: 1
};

class UserList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userList: [],
      localPeerConnection: new RTCPeerConnection()
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

    this.createOfferSuccess = async (caleeId, desc) => {
      const { localPeerConnection } = this.state;
      const r = await localPeerConnection.setLocalDescription(desc);

      const { socket } = this.props;
      socket.emit("offer", {
        desc,
        userId: caleeId
      });
    };

    this.handleNegotiationNeededEvent = async calleeId => {
      console.warn("negotiationneeded fired");
      const { localPeerConnection } = this.state;
      const desc = await localPeerConnection.createOffer(offerOptions);
      if (desc) {
        console.warn("desc");
        console.warn(desc);
        console.warn(desc.sdp);
        this.createOfferSuccess(calleeId, desc);
      }
    };

    this.registerPeerConnectionEvents = calleeId => {
      const { localPeerConnection } = this.state;

      console.log("connectionState:", localPeerConnection.connectionState);

      localPeerConnection.addEventListener(
        "iceconnectionstatechange",
        this.handleIceConnectionStateChange
      );

      localPeerConnection.addEventListener("negotiationneeded", () =>
        this.handleNegotiationNeededEvent(calleeId)
      );
    };

    this.onReloadButtonClicked = () => {
      const { socket } = this.props;
      socket.emit("getUserList");
    };

    this.onCallButtonClicked = calleeId => {
      console.log(calleeId);
      this.registerPeerConnectionEvents(calleeId);
    };
  }

  componentDidMount() {
    const { socket } = this.props;
    socket.on("userList", users => {
      console.log(users);
      const otherUsers = users.filter(user => user.id !== socket.id);
      this.setState({
        userList: otherUsers
      });
    });
  }

  render() {
    const { userList } = this.state;
    return (
      <div>
        <h3>User List</h3>
        <button onClick={this.onReloadButtonClicked}>Reload</button>
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
      </div>
    );
  }
}

export default UserList;
