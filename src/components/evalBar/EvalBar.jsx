import React from "react";
import styled from "styled-components";

const Bar = styled.div`
  position: relative;
  width: 20px;
  background-color: var(--black-primary);
  margin: 0 10px;
  overflow: hidden;
`;
const WhiteBar = styled.div`
  background-color: var(--white-primary);
  bottom: 0;
  height: 100%;
  left: 0;
  position: absolute;
  transition: transform 1s ease-in;
  width: 100%;
  z-index: 1;
  transform: translate3d(0px, 79.0125%, 0px);
`;

function EvalBar({ currentEval }) {
  return (
    <Bar>
      <div>{currentEval}</div>
      <WhiteBar />
    </Bar>
  );
}

export default EvalBar;
