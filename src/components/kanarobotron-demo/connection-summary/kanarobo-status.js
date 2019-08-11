import React from "react";
import BackFourImg from "../../../assets/images/backfour.png";

const KanaroboStatus = () => {
  const roidName = localStorage.getItem("roidName");
  return (
    <div className="container">
      <div className="imageBox">
        <h3>マイロボット</h3>
        <img src={BackFourImg} alt="BackFourImg" />
      </div>
      <ul>
        <li>名前：{roidName}</li>
        <li>種類：バックフォー</li>
        <li>メモ：重量12t。先月整備済み</li>
      </ul>
      <style jsx>{`
        .container {
          display: flex;
          align-items: center;
        }
        .imageBox img {
          width: 10rem;
          height: 10rem;
          border: 1px solid black;
          background: white;
          margin-top: 0.5rem;
        }
        .imageBox h3 {
          margin: 0;
        }
        ul {
          margin: 0 0 0 2rem;
          padding: 0;
          list-style: none;
        }
      `}</style>
    </div>
  );
};

export default KanaroboStatus;
