import React from "react";

class AudioStream extends React.Component {
  constructor(props) {
    super(props);
    this.audioRef = React.createRef();
  }

  componentDidMount() {
    const { audioStream } = this.props;
    this.audioRef.current.srcObject = audioStream;
  }

  render() {
    return (
      <div>
        <audio ref={this.audioRef} autoPlay controls />
      </div>
    );
  }
}

export default AudioStream;
