import React from "react";

import adaFaceImg from "../../../assets/images/adaniya-face.png";

const OperatorStatus = () => {
  return (
    <div>
      <h3>オペレーター</h3>
      <img src={adaFaceImg} alt="adaFaceImg" />
      <ul>
        <li>オペレーター名：安谷屋　樹</li>
        <li>社員番号：123-456-789</li>
      </ul>
    </div>
  );
};

export default OperatorStatus;
