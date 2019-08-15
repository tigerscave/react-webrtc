import React from "react";
import { connect } from "react-redux";
import BackFourImg from "../../../assets/images/backfour.png";
import {
  fetchUserList as _fetchUserList,
  reloadConnection as _reloadConnection
} from "../../../redux/reducers/socketIo";
import {
  assignCalleeId as _assignCalleeId,
  registerPeerEvents as _registerPeerEvents,
  assignDataChannel as _assignDataChannel
} from "../../../redux/reducers/rtc";

class KanaroboStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedUserId: ""
    };

    this.onSelectChanged = e => {
      this.setState({
        selectedUserId: e.target.value
      });
    };

    this.onCallButtonClicked = () => {
      const { selectedUserId } = this.state;

      const {
        assignCalleeId,
        registerPeerEvents,
        assignDataChannel
      } = this.props;

      assignCalleeId(selectedUserId);
      registerPeerEvents();
      assignDataChannel();
    };
  }

  componentDidMount() {
    const { fetchUserList } = this.props;
    fetchUserList();
  }

  render() {
    const {
      userList,
      fetchUserList,
      signalingState,
      iceConnectionState,
      reloadConnection
    } = this.props;
    const { selectedUserId } = this.state;
    const isRobotConnected =
      signalingState === "stable" && iceConnectionState === "connected";
    return (
      <div className="container">
        <div className="profile">
          <h3>マイロボット</h3>
          <img src={BackFourImg} alt="BackFourImg" />
        </div>
        <ul>
          <li>
            {isRobotConnected ? (
              <div>
                <i className="fas fa-circle"></i>
                接続済み
              </div>
            ) : (
              <div>
                <i className="fas fa-circle"></i>
                未接続
              </div>
            )}
          </li>
          <li>
            名前：
            <select value={selectedUserId} onChange={this.onSelectChanged}>
              <option value="">ロボットを選択してください</option>
              {userList.map((user, i) => (
                <option value={user.id} key={i}>
                  {user.name}
                </option>
              ))}
            </select>
            <button onClick={fetchUserList}>RELOAD</button>
          </li>
          <li>種類：バックフォー</li>
          <li>メモ：重量12t。先月整備済み</li>
          {isRobotConnected ? (
            <button onClick={reloadConnection}>リロード</button>
          ) : (
            <button onClick={this.onCallButtonClicked}>リモート接続</button>
          )}
        </ul>
        <style jsx>{`
          .container {
            display: flex;
            align-items: center;
          }
          .profile h3 {
            margin: 0 0 0.5rem 0;
          }
          img {
            width: 12rem;
            height: 12rem;
            border: 1px solid black;
          }
          ul {
            list-style: none;
            margin: 0;
            padding: 0 0 0 2rem;
            font-size: 1.2rem;
          }
        `}</style>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { userList } = state.socketIo;
  const { signalingState, iceConnectionState } = state.rtc;
  return {
    userList,
    signalingState,
    iceConnectionState
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUserList: () => dispatch(_fetchUserList()),
    assignCalleeId: id => dispatch(_assignCalleeId(id)),
    registerPeerEvents: () => dispatch(_registerPeerEvents()),
    assignDataChannel: () => dispatch(_assignDataChannel()),
    reloadConnection: () => dispatch(_reloadConnection())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(KanaroboStatus);
