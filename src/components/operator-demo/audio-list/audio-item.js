import React from "react";

const AudioItem = props => {
  const { audioDevice } = props;
  return (
    <div>
      <span>{audioDevice.label}</span>
      <button>接続</button>
      <style jsx>{`
        span {
          width: 20rem;
          margin-right: 2rem;
        }
      `}</style>
    </div>
  );
};

export default AudioItem;
