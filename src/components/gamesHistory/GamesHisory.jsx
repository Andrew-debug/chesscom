"use client";
import React, { useState } from "react";
import styled from "styled-components";
import pgnParser from "pgn-parser";

///////
import packageJson from "../../../package.json";
import ArchivedGame from "./ArchivedGame";
import FetchComponent from "../FetchComponent";
import useFetch from "../../assets/custom-hooks/useFetch";
import { Container } from "../navBar/NavBar";

const GamesContainer = styled.div`
  max-width: 500px;
  max-height: 800px;
  overflow-x: hidden;
  overflow: "auto";
`;

const InputWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

function GamesHisory({ setcurrentPgn }) {
  const [username, setUsername] = useState("GothamChess");

  const useGamesFetch = useFetch(
    `https://api.chess.com/pub/player/${username}/games/2023/06`
  );
  return (
    <Container>
      <FetchComponent
        useFetchStates={useGamesFetch}
        DataVisualisation={
          <GamesContainer>
            <button onClick={useGamesFetch.resetData}>{"<="}</button>
            {useGamesFetch.data &&
              [...useGamesFetch.data.games.slice(-20)]
                .reverse()
                // .slice(0, 20)
                .map((item, index) => {
                  const pgn = pgnParser.parse(item.pgn)[0];
                  pgn.rawPgn = item.pgn;
                  return (
                    <ArchivedGame
                      key={index}
                      item={item}
                      pgn={pgn}
                      setcurrentPgn={setcurrentPgn}
                      username={username}
                    />
                  );
                })}
          </GamesContainer>
        }
      >
        <InputWrap>
          <div style={{ color: "var(--white-primary)" }}>
            Use Chess.com username
          </div>
          <input
            defaultValue={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <button onClick={useGamesFetch.fetchDataAction}>Fetch Data</button>
        </InputWrap>
      </FetchComponent>
    </Container>
  );
}

export default GamesHisory;
