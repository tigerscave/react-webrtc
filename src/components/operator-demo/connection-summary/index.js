import React from "react";
import OperatorStatus from "./operator-status";
import KanaroboStatus from "./kanarobo-status";

const ConnectionSummary = () => {
  return (
    <ul className="container">
      <li>
        <OperatorStatus />
      </li>
      <li className="iconBox"><i className="fas fa-unlink"></i></li>
      <li>
        <KanaroboStatus />
      </li>
      <style jsx>{`
        .container {
          margin: 2rem 0;
          display: flex;
          list-style: none;
          padding: 0;
        }
        li {
          width: 100%;
        }
        .iconBox {
          width: 60%;
          display: flex;
      //    justify-content: center;
          align-items: center;
        }
        .iconBox i {
          font-size: 8rem;
          margin-left: 4rem;
        }
      `}</style>
    </ul>
  );
};

export default ConnectionSummary;
