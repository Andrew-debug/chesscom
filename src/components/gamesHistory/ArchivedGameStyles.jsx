import styled from "styled-components";

export const ArchivedGameContainer = styled.div`
  background-color: var(--black-primary);
  color: var(--white-primary);
`;

export const GameWrap = styled.div`
  margin: 10px;
  cursor: pointer;
  border: 1px solid var(--gray);
`;
export const WhiteSquare = styled.div`
  border-radius: 2px;
  display: block;
  flex-shrink: 0;
  width: 10px;
  height: 10px;
  margin-right: 5px;
  border: 1px solid #bebdb9;
  background-color: var(--white-primary);
  border: ${({ whiteResult }) => whiteResult === "win" && "2px solid #96bc4b"};
`;
export const BlackSquare = styled.div`
  border-radius: 2px;
  display: block;
  flex-shrink: 0;
  width: 10px;
  height: 10px;
  margin-right: 5px;
  background-color: var(--gray);
  border: ${({ blackResult }) => blackResult === "win" && "2px solid #96bc4b"};
`;
export const WinComponent = styled.div`
  position: relative;
  background-color: var(--green);
  width: 16px;
  height: 16px;
  border-radius: 3px;
  span {
    position: absolute;
    top: -14px;
    left: 1.3px;
    color: black;
    font-size: 20px;
    font-weight: 600;
    transform: translateY(5px);
  }
`;
export const LoseComponent = styled.div`
  position: relative;
  background-color: var(--red);
  width: 16px;
  height: 16px;
  border-radius: 3px;
  span {
    position: absolute;
    top: -14px;
    left: 4px;
    color: black;
    font-size: 20px;
    font-weight: 600;
    transform: translateY(5px);
  }
`;
export const DrawComponent = styled.div`
  position: relative;
  background-color: var(--silver);
  width: 16px;
  height: 16px;
  border-radius: 3px;
  span {
    position: absolute;
    top: -14px;
    left: 1.3px;
    color: black;
    font-size: 20px;
    font-weight: 600;
    transform: translateY(5px);
  }
`;
