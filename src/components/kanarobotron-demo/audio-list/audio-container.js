import React from "react";

class AudioContainer extends React.Component {
  render() {
    const { device } = this.props;
    return (
      <li>
        <i className="fas fa-microphone"></i>
        <p>デバイス名 : {device.label}</p>
      </li>
    );
  }
}

export default AudioContainer;
