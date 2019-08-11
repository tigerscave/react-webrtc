import React from "react";

class AudioContainer extends React.Component {
  render() {
    const { device } = this.props;
    return (
      <li>
        <i className="fas fa-microphone"></i>
        <p>デバイス名 : {device.label}</p>
        <style jsx>{`
          li {
            width: 100%;
          }
          li i {
            width: 7rem;
            height: 7rem;
            border: 1px solid black;
            background: white;
            margin-top: 0.5rem;
            font-size: 5rem;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          video {
            width: 20rem;
          }
        `}</style>
      </li>
    );
  }
}

export default AudioContainer;
