import React from "react";

class KanarobotronRegistName extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      roidName: "",
      inputName: ""
    };

    this.onSaveButtonClicked = () => {
      const { inputName } = this.state;
      localStorage.setItem("roidName", inputName);
      this.setState({ roidName: inputName });
    };

    this.onInputChanged = e => {
      this.setState({ inputName: e.target.value });
    };
  }

  componentDidMount() {
    const roidName = localStorage.getItem("roidName");
    if (roidName) {
      this.setState({ roidName, inputName: roidName });
    }
  }

  render() {
    const { roidName, inputName } = this.state;
    return (
      <div>
        <h1>Kanarobo Tron Regist Name</h1>
        <p>Roid name : {roidName}</p>
        <input value={inputName} onChange={this.onInputChanged} />
        <button onClick={this.onSaveButtonClicked}>SAVE</button>
      </div>
    );
  }
}

export default KanarobotronRegistName;
