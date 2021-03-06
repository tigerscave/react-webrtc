import React from "react";
import { connect } from "react-redux";

import { multiCameraRequest as _multiCameraRequest } from "../../../redux/reducers/socketIo";

import VideoStream from "./video-stream";

const CameraItems = props => {
  const { multiCameraRequest, mediaStreams } = props;
  return (
    <div>
      <p>ロボットが接続されました。</p>
      <button onClick={multiCameraRequest}>カメラリクエスト</button>
      <div className="streams">
        {mediaStreams.map((stream, i) => (
          <VideoStream stream={stream} key={i} />
        ))}
      </div>
      <style jsx>{`
        .streams {
          display: flex;
        }
      `}</style>
    </div>
  );
};

const mapStateToProps = state => {
  const { videoSrcObject, mediaStreams } = state.rtc;
  return {
    videoSrcObject,
    mediaStreams
  };
};

const mapDispatchToProps = dispatch => {
  return {
    multiCameraRequest: () => dispatch(_multiCameraRequest())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CameraItems);
