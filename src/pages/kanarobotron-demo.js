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

import { registerPeerEvents as _registerPeerEvents } from "../redux/reducers/tronRtc";

class KanarobotronDemoPage extends React.Component {
  componentDidMount() {
    const {
      registerSocketEvents,
      createUserName,
      registerPeerEvents
    } = this.props;
    registerSocketEvents();
    createUserName();
    registerPeerEvents();
  }

  render() {
    return (
      <div>
        <NavBar />
        <div className="content">
          <ConnectionSummary />
          <VideoList />
          <AudioList />
        </div>
        <style jsx>{`
          .content {
            margin: 0 5rem;
          }
        `}</style>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    registerSocketEvents: () => dispatch(_registerSocketEvents()),
    createUserName: () => dispatch(_createUserName()),
    registerPeerEvents: () => dispatch(_registerPeerEvents())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(KanarobotronDemoPage);
