import React from "react";
import { connect } from "react-redux";
import { replaceVideoTrack as _replaceVideoTrack } from "../../../redux/reducers/tronRtc";

class VideoContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      frameRate: 1
    };
    this.localVideoRef = React.createRef();

    this.setLocalVideoStream = mediaStream => {
      this.localVideoRef.current.srcObject = mediaStream;
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

      const { replaceVideoTrack } = this.props;
      replaceVideoTrack(mediaStream);
    };
  }

  async componentDidMount() {
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
    this.setLocalVideoStream(mediaStream);
  }

  render() {
    const { device } = this.props;
    const { frameRate } = this.state;
    return (
      <li>
        <div>
          <video ref={this.localVideoRef} autoPlay />
          <p className="label">デバイス名 : {device.label}</p>
          <p className="label deviceId">デバイスID : {device.deviceId}</p>
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
            width: 18rem;
          }
          .label {
            margin: 0.5rem 0 0.2rem 0;
          }
          .deviceId {
            font-size: 0.3rem;
          }
        `}</style>
      </li>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    replaceVideoTrack: mediaStream => dispatch(_replaceVideoTrack(mediaStream))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(VideoContainer);
