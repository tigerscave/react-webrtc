import React from "react";
import io from "socket.io-client";
import { connect } from "react-redux";
import UserList from "../components/operator-demo/user-list";

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
    const { myName } = this.state;
    const { socketId, socket } = this.props;

    return (
      <div>
        <h1>Operator Demo</h1>
        <p>Your socket id is {socketId}</p>
        <input onChange={e => this.setState({ myName: e.target.value })} />
        <button onClick={this.addName}>Join</button>
        <UserList socket={socket} />
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
