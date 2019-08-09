import React from "react";
import { connect } from "react-redux";
import { fetchUserList } from "../../redux/reducers/socketIo";
import {
  assignCalleeId as _assignCalleeId,
  registerPeerEvents as _registerPeerEvents,
  assignDataChannel as _assignDataChannel
} from "../../redux/reducers/rtc";

const offerOptions = {
  offerToReceiveAudio: 1,
  offerToReceiveVideo: 1
};

class UserList extends React.Component {
  constructor(props) {
    super(props);

    this.onCallButtonClicked = calleeId => {
      const {
        assignCalleeId,
        registerPeerEvents,
        assignDataChannel
      } = this.props;

      assignCalleeId(calleeId);
      registerPeerEvents();
      assignDataChannel();
    };

    this.onHogeButtonClicked = () => {
      console.log("hoge button clicked");
      const { sendChannel } = this.props;
      sendChannel.send("HOGE");
    };

    this.playVideoButtonClicked = () => {
      const { videoSrcObject } = this.props;
      this.refs.vidRef.srcObject = videoSrcObject;
    };
  }

  render() {
    const { onReloadButtonClicked, userList, videoSrcObject } = this.props;
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
        <button onClick={this.playVideoButtonClicked}>PLAY VIDEO</button>
        <button onClick={this.onHogeButtonClicked}>send hoge</button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { userList } = state.socketIo;
  const { videoSrcObject, sendChannel } = state.rtc;
  return {
    userList,
    videoSrcObject,
    sendChannel
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onReloadButtonClicked: () => dispatch(fetchUserList()),
    assignCalleeId: id => dispatch(_assignCalleeId(id)),
    registerPeerEvents: () => dispatch(_registerPeerEvents()),
    assignDataChannel: () => dispatch(_assignDataChannel())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserList);
