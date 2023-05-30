import React, { useContext, useState } from "react";
import styled from "styled-components";
import pgnParser from "pgn-parser";

///////
import { PgnContext } from "../board/Board";
import staticData from "../../assets/data/tmp.json";
import { serverIP } from "../../assets/data/config";

const ArchivedGame = styled.div`
  width: 300px;
  height: 100px;
  background-color: var(--black-primary);
  margin-top: 10px;
  color: var(--white-primary);
`;

function GamesHisory() {
  const [gamesData, setgamesData] = useState([]);
  const [userName, setuserName] = useState("lineageshippuden");
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
    <div
      style={{
        maxWidth: 500,
        maxHeight: 800,
        display: "flex",
        overflowX: "hidden",
        overflow: "auto",
      }}
    >
      <div>
        <input value={userName} onChange={(e) => setuserName(e.target.value)} />
        <button onClick={dataFetch}>getdata</button>
        <button onClick={() => setgamesData(staticData.games)}>
          getstaticdata
        </button>
        {gamesData.slice(0, 20).map((item, index) => {
          const pgn = pgnParser.parse(item.pgn)[0];
          pgn.rawPgn = item.pgn;
          const whiteName = pgn.headers[4].value;
          const blackName = pgn.headers[5].value;
          return (
            <ArchivedGame key={index}>
              <div>{whiteName}</div>
              <div>{blackName}</div>
              <button onClick={() => setcurrentPgn(pgn)}>game</button>
            </ArchivedGame>
          );
        })}
      </div>
    </div>
  );
}

export default GamesHisory;
