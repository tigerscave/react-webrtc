import React from "react";
import { connect } from "react-redux";

class CameraItems extends React.Component {
  constructor(props) {
    super(props);

    this.remoteVideoRef = React.createRef();
  }
  componentDidMount() {
    const { videoSrcObject } = this.props;
    this.remoteVideoRef.current.srcObject = videoSrcObject;
  }

  render() {
    return (
      <div>
        <p>ロボットが接続されました。</p>
        <video ref={this.remoteVideoRef} autoPlay />
        <style jsx>{`
          video {
            width: 20rem;
          }
        `}</style>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { videoSrcObject } = state.rtc;
  return {
    videoSrcObject
  };
};

export default connect(
  mapStateToProps,
  null
)(CameraItems);
