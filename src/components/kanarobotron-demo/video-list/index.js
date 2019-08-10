import React from "react";
import VideoContainer from "./video-container";

class VideoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videoDevices: []
    };

    this.loadVideoDevices = async () => {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter(
        device => device.kind === "videoinput"
      );
      this.setState({ videoDevices });
    };
  }
  componentDidMount() {
    this.loadVideoDevices();
  }

  render() {
    const { videoDevices } = this.state;
    return (
      <div>
        <h3>カメラ一覧</h3>
        <ul>
          {videoDevices.map((device, i) => (
            <VideoContainer device={device} key={i} />
          ))}
        </ul>
      </div>
    );
  }
}

export default VideoList;
