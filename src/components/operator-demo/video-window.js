import React from "react";
import NewWindow from "react-new-window";

class VideoWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFps: 1
    };

    this.videoRef = React.createRef();

    this.onVideoButtonClicked = () => {
      const { videoSrcObject } = this.props;
      this.videoRef.current.srcObject = videoSrcObject;
    };

    this.onFpsChanged = e => {
      this.setState({
        selectedFps: e.target.value
      });
    };
  }

  render() {
    const { selectedFps } = this.state;
    return (
      <NewWindow>
        <div>
          <video ref={this.videoRef} autoPlay />
          <button onClick={this.onVideoButtonClicked}>video</button>
          <div>
            <p>FPS</p>
            <select value={selectedFps} onChange={this.onFpsChanged}>
              <option value={1}>1</option>
              <option value={5}>5</option>
              <option value={10}>10</option>
            </select>
          </div>
          <style jsx>{`
            video {
              width: 20rem;
            }
            select {
              width: 8rem;
            }
          `}</style>
        </div>
      </NewWindow>
    );
  }
}

export default VideoWindow;
