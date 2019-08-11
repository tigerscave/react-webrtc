import React from "react";

import adaFaceImg from "../../../assets/images/adaniya-face.png";

const OperatorStatus = () => {
  return (
    <div className="container">
      <div className="profile">
        <h3>オペレーター</h3>
        <img src={adaFaceImg} alt="adaFaceImg" />
      </div>
      <ul>
        <li>オペレーター名：安谷屋　樹</li>
        <li>社員番号：123-456-789</li>
      </ul>
      <style jsx>{`
        .container {
          display: flex;
          align-items: center;
        }
        .profile h3 {
          margin: 0 0 0.5rem 0;
        }
        .profile img {
          width: 10rem;
          height: 10rem;
          border: 1px solid black;
          padding: 1rem;
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

export default OperatorStatus;
