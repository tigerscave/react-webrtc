import React from "react";
import BackFourImg from "../../../assets/images/backfour.png";

const KanaroboStatus = () => (
  <div>
    <h3>マイロボット</h3>
    <div>
      <img src={BackFourImg} alt="BackFourImg" />
    </div>
    <div>
      <ul>
        <li>名前：野田バックフォー01</li>
        <li>種類：バックフォー</li>
        <li>メモ：重量12t。先月整備済み</li>
      </ul>
    </div>
    <style jsx>{`
      img {
        width: 10rem;
      }
    `}</style>
  </div>
);

export default KanaroboStatus;
