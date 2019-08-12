import React from "react";

class VideoStream extends React.Component {
  constructor(props) {
    super(props);
    this.remoteVideo = React.createRef();
  }

  componentDidMount() {
    const { stream } = this.props;
    this.remoteVideo.current.srcObject = stream;
  }

  render() {
    return (
      <div>
        <video ref={this.remoteVideo} autoPlay />
        <style jsx>{`
          video {
            width: 20rem;
          }
        `}</style>
      </div>
    );
  }
}

export default VideoStream;
