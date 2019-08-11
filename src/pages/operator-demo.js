import React from "react";
import { connect } from "react-redux";
import UserList from "../components/operator-demo/user-list";
import NavBar from "../components/operator-demo/navbar";
import ConnectionSummary from "../components/operator-demo/connection-summary";

import CameraList from "../components/operator-demo/camera-list";
import AudioList from "../components/operator-demo/audio-list";

import { registerSocketEvents as _registerSocketEvents } from "../redux/reducers/socketIo";

class OperatorDemoPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      myName: ""
    };

    this.addName = () => {
      const { myName } = this.state;
      const { socket } = this.props;
      socket.emit("addName", myName);
    };
  }

  componentDidMount() {
    const { registerSocketEvents } = this.props;
    registerSocketEvents();
  }

  render() {
    const { socket } = this.props;

    return (
      <div>
        <NavBar />
        <div className="content">
          <ConnectionSummary />
          <CameraList />
          <AudioList />
        </div>
        <hr />
        <UserList socket={socket} />
        <style jsx>{`
        .content {
          margin: 0 5rem;
        }
      `}</style>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { socketIo } = state;
  return {
    socket: socketIo.socket,
    socketId: socketIo.socketId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    registerSocketEvents: () => dispatch(_registerSocketEvents())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OperatorDemoPage);
