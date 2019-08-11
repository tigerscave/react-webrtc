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
      console.log("devices", devices);
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
      <div className="container">
        <h3>カメラ一覧</h3>
        <ul>
          {videoDevices.map((device, i) => (
            <VideoContainer device={device} key={i} />
          ))}
        </ul>
        <style jsx>{`
          .container {
            margin: 4rem 0;
          }
          h3 {
            margin: 0 0 0.5rem 0;
          }
          ul {
            display: flex;
            list-style: none;
            margin: 0;
            padding: 0;
          }
        `}</style>
      </div>
    );
  }
}

export default VideoList;
