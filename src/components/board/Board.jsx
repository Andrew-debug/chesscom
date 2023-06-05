import React, { useEffect, useState } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
/////////
import GamesHisory from "../gamesHistory/GamesHisory";
import NavBar from "../navBar/NavBar";
import EvalBar from "../evalBar/EvalBar";
import CustomSquareRenderer from "./CustomSquareRender";

function Board() {
  const [game, setGame] = useState(new Chess());
  const [currentPgn, setcurrentPgn] = useState();
  const [currentMoveNumber, setcurrentMoveNumber] = useState(-1); // TODO counter can't be > moves.length
  useEffect(() => {
    game.reset();
    setGame({ ...game });
    setcurrentMoveNumber(-1);
    // setcurrentEval({ score: 0, is_mate: false });
  }, [currentPgn]);

  return (
    <div>
      {/* <button onClick={evalFetch}>getEval</button> */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <GamesHisory setcurrentPgn={setcurrentPgn} />

        <div style={{ margin: "0 20px" }}>
          <div
            style={{
              height: 40,
              border: "1px solid white",
              marginBottom: 10,
              color: "white",
            }}
          >
            <span style={{ display: "flex" }}>
              <span style={{ marginRight: 10 }}>
                {currentPgn ? currentPgn.headers[5].value : "Opponent"}
              </span>
              <span>
                {currentPgn ? `(${currentPgn.headers[14].value})` : ""}
              </span>
            </span>
          </div>
          <div style={{ display: "flex" }}>
            <EvalBar game={game} />
            <div style={{ display: "flex" }}>
              <Chessboard
                id="CustomSquare"
                animationDuration={100}
                boardWidth="700"
                position={game.fen()}
                customSquare={CustomSquareRenderer}
              />
            </div>
          </div>
          <div
            style={{
              height: 40,
              border: "1px solid white",
              marginTop: 10,
              color: "white",
            }}
          >
            <span style={{ display: "flex" }}>
              <span style={{ marginRight: 10 }}>
                {currentPgn ? currentPgn.headers[4].value : "Opponent"}
              </span>
              <span>
                {currentPgn ? `(${currentPgn.headers[13].value})` : ""}
              </span>
            </span>
          </div>
        </div>
        <NavBar
          currentPgn={currentPgn}
          game={game}
          setGame={setGame}
          setcurrentMoveNumber={setcurrentMoveNumber}
          currentMoveNumber={currentMoveNumber}
        />
      </div>
    </div>
  );
}

export default Board;
