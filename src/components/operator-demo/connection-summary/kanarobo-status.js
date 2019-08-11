import React from "react";
import BackFourImg from "../../../assets/images/backfour.png";

const KanaroboStatus = () => {
  return (
    <div className="container">
      <div className="profile">
        <h3>マイロボット</h3>
        <img src={BackFourImg} alt="BackFourImg" />
      </div>
      <ul>
        <li>名前：野田バックフォー01</li>
        <li>種類：バックフォー</li>
        <li>メモ：重量12t。先月整備済み</li>
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
};

export default KanaroboStatus;
