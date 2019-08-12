import React from "react";
import { connect } from "react-redux";

import CameraItems from "./camera-items";

const CameraList = props => {
  const { signalingState, iceConnectionState } = props;
  const isRobotConnected =
    signalingState === "stable" && iceConnectionState === "connected";
  return (
    <div className="container">
      <h3>カメラ一覧</h3>
      {isRobotConnected ? (
        <CameraItems />
      ) : (
        <div className="content">
          <p>ロボットが接続されていません。</p>
          <p>リモート接続ボタンを押して、ロボットと接続してください。</p>
        </div>
      )}
      <style jsx>{`
        .container {
          margin: 4rem 0 6rem 2rem;
        }
        .content {
          margin-top: 2rem;
        }
        .content p {
          margin: 0;
          font-size: 1rem;
        }
      `}</style>
    </div>
  );
};

const mapStateToProps = state => {
  const { signalingState, iceConnectionState } = state.rtc;
  return {
    signalingState,
    iceConnectionState
  };
};

export default connect(
  mapStateToProps,
  null
)(CameraList);
