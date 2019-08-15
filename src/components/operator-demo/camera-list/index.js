import React from "react";
import { connect } from "react-redux";

import CameraItems from "./camera-items";

const CameraList = props => {
  const { connectionState } = props;
  return (
    <div className="container">
      <h3>カメラ一覧</h3>
      {connectionState === "connected" ? (
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
  const { connectionState } = state.rtc;
  return {
    connectionState
  };
};

export default connect(
  mapStateToProps,
  null
)(CameraList);
