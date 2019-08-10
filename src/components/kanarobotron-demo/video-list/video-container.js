import React from "react";

class VideoContainer extends React.Component {
  constructor(props) {
    super(props);
    this.localVideoRef = React.createRef();

    this.gotLocalVideoStream = mediaStream => {
      console.log("this.localVideoRef");
      console.log(this.localVideoRef);
      this.localVideoRef.current.srcObject = mediaStream;
    };
  }

  componentDidMount = async () => {
    const { device } = this.props;
    console.warn("device.id", device);
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
          video {
            width: 20rem;
          }
        `}</style>
      </li>
    );
  }
}

export default VideoContainer;
