import React from "react";
import { connect } from "react-redux";
import { audioListRequest } from "../../../redux/reducers/socketIo";

const AudioItems = props => {
  const { onAudioListRequestButtonClicked } = props;
  return (
    <div>
      <button onClick={onAudioListRequestButtonClicked}>
        オーディオリクエスト
      </button>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    onAudioListRequestButtonClicked: () => dispatch(audioListRequest())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(AudioItems);
