import React from "react";
import styled from "styled-components";

const ArchivedGameContainer = styled.div`
  /* width: 100%; */
  /* height: 70px; */
  background-color: var(--black-primary);
  /* margin-top: 10px; */
  color: var(--white-primary);
`;

const GameWrap = styled.div`
  margin: 10px;
  cursor: pointer;
  border: 1px solid var(--gray);
`;

const GemeResultSquare = styled.div`
  border-radius: 2px;
  display: block;
  flex-shrink: 0;
  width: 10px;
  height: 10px;
  margin-right: 5px;
  /* border: ${({ white }) => white && "1px solid #bebdb9"}; */
  background-color: ${({ white }) =>
    white ? "var(--white-primary)" : "var(--gray)"};
  /* border: 0.2rem solid #96bc4b; */
`;

const PlayerName = styled.span`
  font-size: 16px;
`;
function ArchivedGame({ whiteName, blackName, pgn, setcurrentPgn, url }) {
  return (
    <ArchivedGameContainer>
      <GameWrap style={{ padding: 10 }} onClick={() => setcurrentPgn(pgn)}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <GemeResultSquare white={true} />
          <PlayerName>{whiteName}</PlayerName>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <GemeResultSquare white={false} />
          <PlayerName>{blackName}</PlayerName>
        </div>
        <div>win\lose</div>
        <a style={{ color: "var(--white-primary)" }} href={url} target="_blank">
          {url}
        </a>
      </GameWrap>
    </ArchivedGameContainer>
  );
}

export default ArchivedGame;
