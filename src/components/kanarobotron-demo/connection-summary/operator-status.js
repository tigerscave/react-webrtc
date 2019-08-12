import React from "react";

const OperatorStatus = () => (
  <div className="container">
    <div className="profile">
      <h3>マイロボット</h3>
      <i className="fas fa-user-circle"></i>
    </div>
    <div>
      <ul>
        <li>
          <i className="fas fa-circle"></i>
          <p>接続待ち</p>
        </li>
        <li>オペレーター名：ー</li>
        <li>社員番号：ー</li>
      </ul>
    </div>
    <style jsx>{`
      .container {
        display: flex;
        align-items: center;
      }
      ul {
        margin: 0 0 0 2rem;
        padding: 0;
        list-style: none;
      }
      ul li:first-child {
        display: flex;
        align-items: center;
      }
      ul li:first-child i {
        margin-right: 0.5rem;
        color: #ff8a00;
      }
      ul li:first-child p {
        margin: 0;
      }
      .profile i {
        width: 10rem;
        height: 10rem;
        border: 1px solid black;
        background: white;
        margin-top: 0.5rem;
        font-size: 7rem;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .profile h3 {
        margin: 0;
      }
    `}</style>
  </div>
);

export default OperatorStatus;
