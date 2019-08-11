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
        <style jsx>{`
          h3 {
            margin: 0 0 0.3rem 0;
          }
          ul {
            display: flex;
            list-style: none;
            margin: 0;
            padding: 0;
          }
        `}</style>
      </div>
    );
  }
}

export default AudioList;
