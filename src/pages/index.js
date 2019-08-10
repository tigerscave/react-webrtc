import React from "react";
import { Link } from "react-router-dom";

const IndexPage = () => {
  return (
    <div>
      <p>
        <Link to="/operator-demo">Operator demo</Link>
      </p>
      <p>
        <Link to="/kanarobotron-demo">Kanarobotron demo</Link>
      </p>
    </div>
  );
};

export default IndexPage;
