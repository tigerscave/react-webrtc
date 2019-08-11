import React from "react";
import NewWindow from "react-new-window";
import { connect } from "react-redux";

import { updateRemoteVideoFps as _updateRemoteVideoFps } from "../../redux/reducers/socketIo";

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
      const fps = e.target.value;
      this.setState({
        selectedFps: fps
      });

      const { videoSrcObject } = this.props;

      console.log(videoSrcObject);
      console.log(videoSrcObject.getVideoTracks());

      const { updateRemoteVideoFps } = this.props;
      updateRemoteVideoFps({
        fps,
        mediaStreamId: videoSrcObject.id
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
              <option value={1}>1 FPS</option>
              <option value={5}>5 FPS</option>
              <option value={10}>10 FPS</option>
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

const mapDispatchToProps = dispatch => {
  return {
    updateRemoteVideoFps: fps => dispatch(_updateRemoteVideoFps(fps))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(VideoWindow);
