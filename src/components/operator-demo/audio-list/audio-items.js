import React from "react";
import { connect } from "react-redux";
import { audioListRequest } from "../../../redux/reducers/socketIo";
import AudioItem from "./audio-item";

const AudioItems = props => {
  const { onAudioListRequestButtonClicked, audioDevices } = props;
  return (
    <div>
      {audioDevices.length > 0 ? (
        <div>
          {audioDevices.map((audioDevice, i) => (
            <AudioItem audioDevice={audioDevice} />
          ))}
        </div>
      ) : (
        <button onClick={onAudioListRequestButtonClicked}>
          オーディオリクエスト
        </button>
      )}
    </div>
  );
};

const mapStateToProps = state => {
  const { audioDevices } = state.socketIo;
  return {
    audioDevices
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAudioListRequestButtonClicked: () => dispatch(audioListRequest())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AudioItems);
