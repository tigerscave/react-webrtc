import React from "react";
import { connect } from "react-redux";
import { addVideoTrack as _addVideoTrack } from "../../../redux/reducers/tronRtc";

class VideoContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      frameRate: 1
    };
    this.localVideoRef = React.createRef();

    this.setLocalVideoStream = mediaStream => {
      this.localVideoRef.current.srcObject = mediaStream;

      const { addVideoTrack } = this.props;
      addVideoTrack(mediaStream);
    };

    this.onSelectChanged = e => {
      const frameRate = e.target.value;
      this.setState({ frameRate });
      this.getUserVideoMedia(frameRate);
    };

    this.getUserVideoMedia = async frameRate => {
      const { device } = this.props;
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          deviceId: device.deviceId,
          frameRate: {
            max: frameRate
          }
        }
      });

      this.setLocalVideoStream(mediaStream);
    };
  }

  componentDidMount = async () => {
    this.getUserVideoMedia(1);
  };

  render() {
    const { device } = this.props;
    const { frameRate } = this.state;
    return (
      <li>
        <div>
          <video ref={this.localVideoRef} autoPlay />
          <p>デバイス名 : {device.label}</p>
          <select value={frameRate} onChange={this.onSelectChanged}>
            <option value={1}>1 FPS</option>
            <option value={5}>5 FPS</option>
            <option value={10}>10 FPS</option>
          </select>
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
