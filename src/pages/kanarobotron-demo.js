import React from "react";
import { connect } from "react-redux";

import NavBar from "../components/kanarobotron-demo/navbar";
import ConnectionSummary from "../components/kanarobotron-demo/connection-summary";
import VideoList from "../components/kanarobotron-demo/video-list";
import AudioList from "../components/kanarobotron-demo/audio-list";

import {
  registerSocketEvents as _registerSocketEvents,
  createUserName as _createUserName
} from "../redux/reducers/tronSocketIo";

class KanarobotronDemoPage extends React.Component {
  componentDidMount() {
    const { registerSocketEvents, createUserName } = this.props;
    registerSocketEvents();
    createUserName();
  }

  render() {
    return (
      <div>
        <NavBar />
        <ConnectionSummary />
        <VideoList />
        <AudioList />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    registerSocketEvents: () => dispatch(_registerSocketEvents()),
    createUserName: () => dispatch(_createUserName())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(KanarobotronDemoPage);
