import React from "react";
import { connect } from "react-redux";
import AudioItems from "./audio-items";
import AudioStream from "./audio-stream";

const AudioList = props => {
  const { connectionState, audioStream } = props;
  return (
    <div className="container">
      <h3>オーディオ一覧</h3>
      {connectionState === "connected" ? (
        <AudioItems />
      ) : (
        <div className="content">
          <p>ロボットが接続されていません。</p>
          <p>リモート接続ボタンを押して、ロボットと接続してください。</p>
        </div>
      )}
      {audioStream && <AudioStream audioStream={audioStream} />}
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
  const { connectionState, audioStream } = state.rtc;
  return {
    connectionState,
    audioStream
  };
};

export default connect(
  mapStateToProps,
  null
)(AudioList);
