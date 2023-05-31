import React from "react";
import styled from "styled-components";

//prettier-ignore
const obj = [
    ['a1','a1','a1','a1','a1','a1','a1','a1','a1','a1','a1','a1','a1','a1','a1','a1','a1','a1','a1','a1','a1','a1','a1','a1','a1','a1','a1','a1','a1','a1','a1','a1','a1','a1','a1','a1','a1','a1','a1','a1','a1'],
    ['a1','a1','a1','a1','a1','a1','a1','a1','a1','a1','a1','a1','a1','a1','a1','a1','a1','a1','a1','a1','a1','a1','a1','a1','a1','a1','a1','a1','a1','a1','a1','a1','a1','a1','a1','a1','a1','a1','a1','a1','a1'],
    ['a1','a1','a1','a1','a1','a1','a1','a1','a1','a1','a1','a1','a1','a1','a1','a1','a1','a1','a1','a1','a1','a1','a1','a1','a1','a1','a1','a1','a1','a1','a1','a1','a1','a1','a1','a1','a1','a1','a1','a1','a1'],
]
const EngineMovesWrap = styled.div`
  color: var(--white-primary);
  padding: 5px;
`;
const MovesVariansWrap = styled.div`
  --moveSanFigurineFontSize: 2rem;
  --moveSanFigurinePinch: 0.3rem;
  border-top: 0.1rem solid red;
  font-size: 16px;
  min-height: 30px;
  overflow: hidden;
  padding: 0.2rem 0;
  position: relative;
  text-indent: 0;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
  /* overflow: visible;
  text-overflow: clip;
  white-space: normal; */
`;
const ShowMoreButton = styled.button`
  align-items: center;
  background-color: transparent;
  border: none;
  display: inline-flex;
  height: 2.6rem;
  justify-content: center;
  margin: 0;
  padding: 0;
  position: absolute;
  right: 0;
  top: 0;
  width: 2.6rem;
  span {
    border-radius: 50%;
    color: red;
    font-size: 1.2rem;
    padding: 0.2rem;
    pointer-events: none;
  }
`;
const MoreButtonInner = styled.span`
  border-radius: 50%;
  color: red;
  font-size: 1.2rem;
  padding: 0.2rem;
  pointer-events: none;
  ::before {
    content: "\003F";
  }
`;
function PossibleEngineMoves() {
  return (
    <EngineMovesWrap>
      {obj.map((row, rowIndex) => (
        <div key={rowIndex}>
          <MovesVariansWrap>
            {row.map((item, index) => (
              <span key={index}>{item}</span>
            ))}
          </MovesVariansWrap>
          <ShowMoreButton>
            <MoreButtonInner></MoreButtonInner>
          </ShowMoreButton>
        </div>
      ))}
    </EngineMovesWrap>
  );
}

export default PossibleEngineMoves;
