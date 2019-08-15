import React from "react";
import NewWindow from "react-new-window";
import { connect } from "react-redux";
import { updateRemoteVideoConstraints as _updateRemoteVideoConstraints } from "../../../redux/reducers/socketIo";

class VideoWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFps: 1,
      resolution: "VGA"
    };

    this.videoRef = React.createRef();

    this.onVideoButtonClicked = () => {
      const { stream } = this.props;
      this.videoRef.current.srcObject = stream;
    };

    this.onFpsChanged = e => {
      const fps = e.target.value;
      this.setState({
        selectedFps: fps
      });

      const { stream } = this.props;

      const { updateRemoteVideoConstraints } = this.props;
      const { resolution } = this.state;
      updateRemoteVideoConstraints({
        fps,
        mediaStreamId: stream.id,
        resolution
      });
    };

    this.onResolutionChanged = e => {
      const resolution = e.target.value;
      this.setState({
        resolution
      });

      const { updateRemoteVideoConstraints, stream } = this.props;
      const { selectedFps } = this.state;
      updateRemoteVideoConstraints({
        fps: selectedFps,
        mediaStreamId: stream.id,
        resolution
      });
    };
  }

  render() {
    const { selectedFps, resolution } = this.state;
    return (
      <NewWindow>
        <div>
          <video ref={this.videoRef} autoPlay />
          <div>
            <button onClick={this.onVideoButtonClicked}>video</button>
          </div>
          <div className="settings">
            <div>
              <p>FPS</p>
              <select value={selectedFps} onChange={this.onFpsChanged}>
                <option value={1}>1 FPS</option>
                <option value={5}>5 FPS</option>
                <option value={10}>10 FPS</option>
              </select>
            </div>
            <div>
              <p>Quality</p>
              <select value={resolution} onChange={this.onResolutionChanged}>
                <option value="QVGA">Low</option>
                <option value="VGA">Middle</option>
                <option value="HD">High</option>
              </select>
            </div>
          </div>
          <style jsx>{`
            video {
              width: 95%;
              margin: 1rem;
            }
            select {
              width: 8rem;
            }
            .settings {
              display: flex;
            }
          `}</style>
        </div>
      </NewWindow>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateRemoteVideoConstraints: data =>
      dispatch(_updateRemoteVideoConstraints(data))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(VideoWindow);
