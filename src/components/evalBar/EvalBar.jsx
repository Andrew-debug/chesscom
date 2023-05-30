import React from "react";
import styled from "styled-components";

const Bar = styled.div`
  position: relative;
  width: 40px;
  background-color: var(--black-primary);
  margin: 0 10px;
  overflow: hidden;
`;
const BlackBar = styled.div`
  background-color: var(--white-primary);
  bottom: 0;
  height: 100%;
  left: 0;
  position: absolute;
  transition: transform 1s ease-in;
  width: 100%;
  z-index: 1;
  transform: ${({ evalScore }) =>
    `translate3d(0px, ${100 - (evalScore / 100 + 5) * 10}%, 0px)`};
`;

function EvalBar({ currentEval }) {
  const { score, is_mate: isMate } = currentEval;
  let evalScore = score;
  if (score > 400) evalScore = 400;
  if (score < -400) evalScore = -400;
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
        <div
          style={{
            color: score > 0 ? "black" : "white",
            position: "absolute",
            top: score > 0 ? 530 : 0,
            left: 12,
          }}
        >
          {(score / 100).toFixed(1)}
        </div>
      </div>
      <BlackBar evalScore={evalScore} />
    </Bar>
  );
}

export default EvalBar;
