import React from "react";
import AudioContainer from "./audio-container";

class AudioList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      audioDevices: []
    };

    this.loadAudioDevices = async () => {
      await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false
      });
      const devices = await navigator.mediaDevices.enumerateDevices();
      const audioDevices = devices.filter(
        device => device.kind === "audioinput"
      );
      this.setState({ audioDevices });
    };
  }

  componentDidMount() {
    this.loadAudioDevices();
  }

  render() {
    const { audioDevices } = this.state;
    return (
      <div>
        <h3>オーディオ一覧</h3>
        <ul>
          {audioDevices.map((device, i) => (
            <AudioContainer device={device} key={i} />
          ))}
        </ul>
      </div>
    );
  }
}

export default AudioList;
