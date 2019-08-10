import React from "react";

import NavBar from "../components/kanarobotron-demo/navbar";
import ConnectionSummary from "../components/kanarobotron-demo/connection-summary";

class KanarobotronDemoPage extends React.Component {
  render() {
    return (
      <div>
        <NavBar />
        <ConnectionSummary />
        {/*        <VideoList />
        <AudioList />*/}
        <h1>KanaroboTron</h1>
      </div>
    );
  }
}

export default KanarobotronDemoPage;
