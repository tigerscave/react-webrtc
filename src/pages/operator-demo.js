import React from "react";
import { connect } from "react-redux";
import NavBar from "../components/operator-demo/navbar";
import ConnectionSummary from "../components/operator-demo/connection-summary";

import CameraList from "../components/operator-demo/camera-list";
import AudioList from "../components/operator-demo/audio-list";

import { registerSocketEvents as _registerSocketEvents } from "../redux/reducers/socketIo";

class OperatorDemoPage extends React.Component {
  componentDidMount() {
    const { registerSocketEvents } = this.props;
    registerSocketEvents();
  }

  render() {
    return (
      <div>
        <NavBar />
        <div className="content">
          <ConnectionSummary />
          <CameraList />
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
    registerSocketEvents: () => dispatch(_registerSocketEvents())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(OperatorDemoPage);
