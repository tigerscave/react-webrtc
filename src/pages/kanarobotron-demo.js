import React from "react";

import NavBar from "../components/kanarobotron-demo/navbar";
import ConnectionSummary from "../components/kanarobotron-demo/connection-summary";
import VideoList from "../components/kanarobotron-demo/video-list";
import AudioList from "../components/kanarobotron-demo/audio-list";

class KanarobotronDemoPage extends React.Component {
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

export default KanarobotronDemoPage;
