import React from "react";
import BackFourImg from "../../../assets/images/backfour.png";

const OperatorStatus = () => (
  <div>
    <h3>マイロボット</h3>
    <div>
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
      img {
        width: 10rem;
      }
    `}</style>
  </div>
);

export default OperatorStatus;
