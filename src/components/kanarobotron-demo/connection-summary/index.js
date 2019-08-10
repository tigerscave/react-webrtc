import React from "react";

import KanaroboStatus from "./kanarobo-status";
import OperatorStatus from "./operator-status";

const ConnectionSummary = () => (
  <div>
    <KanaroboStatus />
    <div>
      <p>
        <i className="fas fa-long-arrow-alt-right"></i>
      </p>
      <p>
        <i className="fas fa-long-arrow-alt-left"></i>
      </p>
    </div>
    <OperatorStatus />
  </div>
);

export default ConnectionSummary;
