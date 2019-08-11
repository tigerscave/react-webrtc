import React from "react";
import { connect } from "react-redux";
import { addVideoTrack as _addVideoTrack } from "../../../redux/reducers/tronRtc";

class VideoContainer extends React.Component {
  constructor(props) {
    super(props);
    this.localVideoRef = React.createRef();

    this.gotLocalVideoStream = mediaStream => {
      this.localVideoRef.current.srcObject = mediaStream;

      const { addVideoTrack } = this.props;
      addVideoTrack(mediaStream);
    };
  }

  componentDidMount = async () => {
    const { device } = this.props;
    const mediaStream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        deviceId: device.deviceId,
        frameRate: {
          max: 1
        }
      }
    });
    this.gotLocalVideoStream(mediaStream);
  };

  render() {
    const { device } = this.props;
    return (
      <li>
        <div>
          <video ref={this.localVideoRef} autoPlay />
          <p>デバイス名 : {device.label}</p>
        </div>
        <style jsx>{`
          li {
            width: 100%;
          }
          video {
            width: 20rem;
          }
        `}</style>
      </li>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addVideoTrack: mediaStream => dispatch(_addVideoTrack(mediaStream))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(VideoContainer);
