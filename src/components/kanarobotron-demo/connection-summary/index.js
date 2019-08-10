import React from "react";

import KanaroboStatus from "./kanarobo-status";
import OperatorStatus from "./operator-status";

const ConnectionSummary = () => (
  <ul className="container">
    <li>
      <KanaroboStatus />
    </li>
    <li className="icons">
      <div>
        <p>
          <i className="fas fa-long-arrow-alt-right"></i>
        </p>
        <p>
          <i className="fas fa-long-arrow-alt-left"></i>
        </p>
      </div>
    </li>
    <li>
      <OperatorStatus />
    </li>
    <style jsx>{`
      ul {
        display: flex;
        list-style: none;
        margin: 0;
        padding: 0;
      }
      ul li {
        width: 100%;
      }
      .icons {
        display: flex;
        align-items: center;
        // justify-content: center;
      }
      i {
        font-size: 5rem;
      }
    `}</style>
  </ul>
);

export default ConnectionSummary;
