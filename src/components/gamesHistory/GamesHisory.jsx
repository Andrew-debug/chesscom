import React, { useContext, useState } from "react";
import styled from "styled-components";
import pgnParser from "pgn-parser";

///////
import { PgnContext } from "../board/Board";
import staticData from "../../assets/data/tmp.json";
import { serverIP } from "../../assets/data/config";
import { Container } from "../navBar/NavBar";
import FetchDataComponent from "../FetchDataComponent";
import ArchivedGame from "./ArchivedGame";

const InputWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const fetchJSONData = (url) => async () => {
  const response = await fetch(url);
  const jsonData = await response.json();
  return jsonData;
};

function GamesHisory() {
  const [gamesData, setgamesData] = useState([]);
  const [showData, setShowData] = useState(false);
  const [userName, setuserName] = useState("GothamChess");
  const { setcurrentPgn } = useContext(PgnContext);
  const dataFetch = async () => {
    const data = await (
      await fetch(
        `http://${serverIP}:8080/get_games?` +
          new URLSearchParams({
            user_name: userName,
          })
      )
    ).json();
    setgamesData(data.games.reverse());
  };

  return (
    <Container>
      {!showData && (
        <InputWrap>
          <div style={{ color: "var(--white-primary)" }}>
            Use Chess.com username
          </div>
          <input
            value={userName}
            onChange={(e) => setuserName(e.target.value)}
          />
          <button onClick={() => setShowData(true)}>Show games</button>
        </InputWrap>
      )}
      <div
        style={{
          maxWidth: 500,
          maxHeight: 800,
          overflowX: "hidden",
          overflow: "auto",
        }}
      >
        <div>
          <div>
            {showData && (
              <FetchDataComponent
                action={fetchJSONData(
                  `http://${serverIP}:8080/get_games?` +
                    new URLSearchParams({
                      user_name: userName,
                    })
                )}
                loaderSize="0.5"
              >
                {(data) => {
                  return data.games
                    .reverse()
                    .slice(0, 20)
                    .map((item, index) => {
                      const pgn = pgnParser.parse(item.pgn)[0];
                      pgn.rawPgn = item.pgn;
                      const whiteName = pgn.headers[4].value;
                      const blackName = pgn.headers[5].value;
                      return (
                        <ArchivedGame
                          key={index}
                          whiteName={whiteName}
                          blackName={blackName}
                          pgn={pgn}
                          setcurrentPgn={setcurrentPgn}
                          url={item.url}
                        />
                      );
                    });
                }}
              </FetchDataComponent>
            )}
          </div>

          <button onClick={dataFetch}>getdata</button>
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
            const whiteName = pgn.headers[4].value;
            const blackName = pgn.headers[5].value;
            return (
              <ArchivedGame
                key={index}
                whiteName={whiteName}
                blackName={blackName}
                pgn={pgn}
                setcurrentPgn={setcurrentPgn}
                url={item.url}
              />
            );
          })}
        </div>
      </div>
    </Container>
  );
}

export default GamesHisory;
