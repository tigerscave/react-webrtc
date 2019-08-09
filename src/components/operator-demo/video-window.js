import React from "react";
import NewWindow from "react-new-window";

class VideoWindow extends React.Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();

    this.onVideoButtonClicked = () => {
      const { videoSrcObject } = this.props;
      this.videoRef.current.srcObject = videoSrcObject;
    };
  }

  render() {
    return (
      <NewWindow>
        <div>
          <video ref={this.videoRef} autoPlay />
          <button onClick={this.onVideoButtonClicked}>video</button>
          <div>
            <p>FPS</p>
            <select>
              <option>1</option>
              <option>5</option>
              <option>10</option>
            </select>
          </div>
          <style jsx>{`
            video {
              width: 20rem;
            }
          `}</style>
        </div>
      </NewWindow>
    );
  }
}

export default VideoWindow;
