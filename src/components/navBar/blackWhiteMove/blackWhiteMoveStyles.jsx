import styled from "styled-components";

const isOdd = (num) => {
  return num % 2 === 0;
};

const whichMove = (currentMoveNumber, index, returnedValue) => {
  if (currentMoveNumber === -1) return;
  if (Math.trunc(currentMoveNumber / 2) === index) return returnedValue;
};
export const WhiteStyles = styled.div`
  position: relative;
  padding: 1px;
  margin-right: 4px;
  font-weight: 600;
  color: var(--white-primary-dim);
  cursor: pointer;
  z-index: 1;
  ::before {
    background-color: ${({ currentMoveNumber, index }) =>
      isOdd(currentMoveNumber) &&
      whichMove(currentMoveNumber, index, "rgba(152,150,36, 0.5)")};
    border-bottom-style: solid;
    border-color: rgba(255, 255, 0, 0.4);
    border-radius: 2px;
    border-width: 0;
    border-bottom-width: ${({ currentMoveNumber, index }) =>
      isOdd(currentMoveNumber) && whichMove(currentMoveNumber, index, "3px")};
    content: "";
    height: 100%;
    left: 0;
    margin-left: -2px;
    position: absolute;
    top: 0;
    width: calc(100% + 4px);
    z-index: -1;
  }
`;
export const BlackStyles = styled.div`
  position: relative;
  padding: 1px;
  margin-right: 4px;
  font-weight: 600;
  color: var(--white-primary-dim);
  cursor: pointer;
  z-index: 1;
  ::before {
    background-color: ${({ currentMoveNumber, index }) =>
      !isOdd(currentMoveNumber) &&
      whichMove(currentMoveNumber, index, "rgba(152,150,36, 0.5)")};
    border-bottom-style: solid;
    border-color: rgba(255, 255, 0, 0.4);
    border-radius: 2px;
    border-width: 0;
    border-bottom-width: ${({ currentMoveNumber, index }) =>
      !isOdd(currentMoveNumber) && whichMove(currentMoveNumber, index, "3px")};
    content: "";
    height: 100%;
    left: 0;
    margin-left: -2px;
    position: absolute;
    top: 0;
    width: calc(100% + 4px);
    z-index: -1;
  }
`;
