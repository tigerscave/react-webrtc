import React from "react";

import KanaroboStatus from "./kanarobo-status";
import OperatorStatus from "./operator-status";

const ConnectionSummary = () => (
  <div>
    <KanaroboStatus />
    <div>
      <p>
        <i class="fas fa-long-arrow-alt-right"></i>
      </p>
      <p>
        <i class="fas fa-long-arrow-alt-left"></i>
      </p>
    </div>
    <OperatorStatus />
  </div>
);

export default ConnectionSummary;
