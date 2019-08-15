import React from "react";
import { connect } from "react-redux";
import { audioRequest } from "../../../redux/reducers/socketIo";

const AudioItem = props => {
  const { audioDevice, onConnectButtonClicked } = props;
  console.log(audioDevice);
  return (
    <div>
      <span>{audioDevice.label}</span>
      <button onClick={() => onConnectButtonClicked(audioDevice.deviceId)}>
        接続
      </button>
      <style jsx>{`
        span {
          width: 20rem;
          margin-right: 2rem;
        }
      `}</style>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    onConnectButtonClicked: deviceId => dispatch(audioRequest(deviceId))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(AudioItem);
