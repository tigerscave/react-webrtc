import React from "react";
import OperatorStatus from "./operator-status";
import KanaroboStatus from "./kanarobo-status";

const ConnectionSummary = () => {
  return (
    <div>
      <OperatorStatus />
      <i class="fas fa-unlink"></i>
      <KanaroboStatus />
    </div>
  );
};

export default ConnectionSummary;
