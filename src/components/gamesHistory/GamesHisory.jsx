import React, { useState } from "react";
import styled from "styled-components";
import pgnParser from "pgn-parser";

///////
import staticData from "../../assets/data/tmp.json";
import { serverIP } from "../../assets/data/config";
import { Container } from "../navBar/NavBar";
import ArchivedGame from "./ArchivedGame";
import FetchComponent from "../FetchComponent";
import useFetch from "../../assets/custom-hooks/useFetch";

const GamesContainer = styled.div`
  max-width: 500;
  max-height: 800;
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
  const defaultUser = "GothamChess";
  const defaultUserUrl =
    `http://${serverIP}:8080/get_games?` +
    new URLSearchParams({
      user_name: defaultUser,
    });
  const useGamesFetch = useFetch(defaultUserUrl);
  return (
    <Container>
      <FetchComponent
        useFetchStates={useGamesFetch}
        DataVisualisation={
          <GamesContainer>
            <button onClick={useGamesFetch.resetData}>{"<="}</button>
            {useGamesFetch.data &&
              useGamesFetch.data.games
                .reverse()
                .slice(0, 20)
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
            // value={username}
            defaultValue={defaultUser}
            onChange={(e) => {
              setUsername(e.target.value);
              useGamesFetch.seturl(
                `http://${serverIP}:8080/get_games?` +
                  new URLSearchParams({
                    user_name: e.target.value,
                  })
              );
            }}
          />
          <button onClick={useGamesFetch.fetchDataAction}>Fetch Data</button>
        </InputWrap>
      </FetchComponent>
      {/* <div
        style={{
          maxWidth: 500,
          maxHeight: 800,
          overflowX: "hidden",
          overflow: "auto",
        }}
      >
        <div>
          <button
            onClick={() => {
              setgamesData(staticData.games);
            }}
          >
            get static data
          </button>
          {gamesData.slice(0, 20).map((item, index) => {
            const pgn = pgnParser.parse(item.pgn)[0];
            pgn.rawPgn = item.pgn;
            // console.log(item);
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
        </div>
      </div> */}
    </Container>
  );
}

export default GamesHisory;
