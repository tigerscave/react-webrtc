import React from "react";
import BackFourImg from "../../../assets/images/backfour.png";

const KanaroboStatus = () => {
  const roidName = localStorage.getItem("roidName");
  return (
    <div className="container">
      <div>
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
        img {
          width: 10rem;
        }
      `}</style>
    </div>
  );
};

export default KanaroboStatus;
