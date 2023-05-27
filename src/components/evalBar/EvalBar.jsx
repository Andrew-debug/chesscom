import React from "react";
import styled from "styled-components";

const Bar = styled.div`
  position: relative;
  width: 40px;
  background-color: var(--white-primary);
  margin: 0 10px;
  overflow: hidden;
`;
const BlackBar = styled.div`
  background-color: var(--black-primary);
  bottom: 0;
  height: 100%;
  left: 0;
  position: absolute;
  transition: transform 1s ease-in;
  width: 100%;
  z-index: 1;
  transform: translate3d(0px, 0%, 0px);
`;

function EvalBar({ currentEval }) {
  const { score, is_mate: isMate } = currentEval;

  return (
    <Bar>
      <div
        style={{
          position: "absolute",
          zIndex: 2,
          fontSize: 14,
          color: "white",
        }}
      >
        {(score / 100).toFixed(1)}
      </div>
      <BlackBar />
    </Bar>
  );
}

export default EvalBar;
