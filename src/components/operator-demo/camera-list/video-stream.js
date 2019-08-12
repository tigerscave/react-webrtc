import React from "react";
import { mainBlue } from "../../../consts/colors";
import VideoWindow from "./video-window";

class VideoStream extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalShown: false
    };
    this.remoteVideo = React.createRef();

    this.openNewWindow = () => {
      this.setState({
        isModalShown: true
      });
    };
  }

  componentDidMount() {
    const { stream } = this.props;
    this.remoteVideo.current.srcObject = stream;
  }

  render() {
    const { stream } = this.props;
    const { isModalShown } = this.state;
    return (
      <div>
        <video ref={this.remoteVideo} autoPlay />
        <button onClick={this.openNewWindow}>別ウィンドウで開く</button>
        {isModalShown && <VideoWindow stream={stream} />}
        <style jsx>{`
          video {
            width: 20rem;
            border: 3px solid ${mainBlue};
            margin-right: 1rem;
          }
          button {
            display: block;
          }
        `}</style>
      </div>
    );
  }
}

export default VideoStream;
