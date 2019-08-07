import React from "react";
import io from 'socket.io-client';
let socket = null

class OperatorDemoPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      socketId: "",
      myName: ""
    }

    this.addName = () => {
      const { myName } = this.state;
      socket.emit("addName", myName);
    }
  }

  componentDidMount() {
    socket = io('https://telp-public-server.herokuapp.com/');

    socket.on('connect', () => {
      this.setState({
        socketId: socket.id
      })
    })
  }

  render() {
    const { socketId, myName } = this.state
    return (
      <div>
        <h1>Operator Demo</h1>
        <p>Your socket id is {socketId}</p>
        <input
          onChange={(e) => this.setState({ myName: e.target.value })}
          onEnter={this.addName}
        />
        <button onClick={this.addName}>Join</button>
      </div>
    );
  };
}

export default OperatorDemoPage;
