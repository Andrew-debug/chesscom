import React, { useEffect, useState } from "react";
import staticData from "../assets/data/tmp.json";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import pgnParser from "pgn-parser";
const GamesList = ({ setcurrentPgn }) => {
  const [gamesData, setgamesData] = useState([]);

  const dataFetch = async () => {
    const data = await (
      await fetch("http://10.57.31.14:8080/get_games")
    ).json();
    setgamesData(data.games.reverse());
    console.log(data.games);
  };

  return (
    <div>
      <button onClick={dataFetch}>getdata</button>
      <button onClick={() => setgamesData(staticData.games)}>
        getstaticdata
      </button>
      {gamesData.slice(0, 20).map((item, index) => {
        const pgn = pgnParser.parse(item.pgn)[0];
        const whiteName = pgn.headers[4].value;
        const blackName = pgn.headers[5].value;
        return (
          <div key={index}>
            {`${whiteName} vs ${blackName}`}
            <button onClick={() => setcurrentPgn(pgn)}>game</button>
          </div>
        );
      })}
    </div>
  );
};

const Button = ({ text, handleClick }) => {
  return <button onClick={handleClick}>{text}</button>;
};

function Board() {
  const [game, setGame] = useState(new Chess());
  const [currentPgn, setcurrentPgn] = useState();
  const [currentMoveNumber, setcurrentMoveNumber] = useState(-1); // TODO counter can't be > moves.length
  const dataFetch = async () => {
    const data = await (
      await fetch(
        "http://10.57.31.14:8080/get_eval?" +
          new URLSearchParams({
            pgn: game.pgn(),
          })
      )
    ).text();
    console.log(data);
  };

  useEffect(() => {
    if (currentPgn) {
      makeAMove(currentPgn.moves[currentMoveNumber]?.move);
    }
  }, [currentMoveNumber]);

  useEffect(() => {
    game.reset();
    setGame({ ...game });
    setcurrentMoveNumber(-1);
  }, [currentPgn]);

  function makeAMove(move) {
    const gameCopy = { ...game };
    const currentPgn = gameCopy.move(move);
    setGame(gameCopy);
    // console.log(game.pgn());

    return currentPgn;
  }
  return (
    <div>
      <button onClick={dataFetch}>getEval</button>
      <GamesList setcurrentPgn={setcurrentPgn} />
      <div>
        <Chessboard
          id="BasicBoard"
          animationDuration={100}
          boardWidth="560"
          position={game.fen()}
        />
      </div>
      <div style={{ display: "flex" }}>
        <Button
          text="prev"
          handleClick={() => {
            game.undo();
            setcurrentMoveNumber((prev) => (prev > -1 ? prev - 1 : prev));
          }}
        />
        <Button
          text="next"
          handleClick={() => setcurrentMoveNumber((prev) => prev + 1)}
        />
      </div>
      {JSON.stringify(currentPgn)}
    </div>
  );
}

export default Board;
