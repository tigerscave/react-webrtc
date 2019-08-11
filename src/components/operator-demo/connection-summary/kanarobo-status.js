import React from "react";
import BackFourImg from "../../../assets/images/backfour.png";

const KanaroboStatus = () => {
  return (
    <div>
      <h3>マイロボット</h3>
      <img src={BackFourImg} alt="BackFourImg" />
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
        img {
          width: 10rem;
        }
      `}</style>
    </div>
  );
};

export default KanaroboStatus;
