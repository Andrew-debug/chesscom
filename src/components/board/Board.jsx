import React, { useEffect, useState, useSyncExternalStore } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
/////////
import GamesHisory from "../gamesHistory/GamesHisory";
import NavBar from "../navBar/NavBar";
import EvalBar from "../evalBar/EvalBar";
import CustomSquareRenderer from "./CustomSquareRender";
import { Pgn } from "../../../node_modules/cm-pgn/src/Pgn.js"
import { stockfishResultsUpdated } from "../../stockfishEvents";


function Board({ stockfishInterface }) {
  const stockfish_results = useSyncExternalStore((callback) => {
    addEventListener(stockfishResultsUpdated.type, callback);
    return () => {
      removeEventListener(stockfishResultsUpdated.type, callback);
    };
  }, () => JSON.stringify(stockfishInterface.getResults())); // TODO: remake on separate signals
  useEffect(() => {
    console.log(stockfish_results);
  }, [stockfish_results])
  const { bestMove, positionEval } = JSON.parse(stockfish_results)
  const [game, setGame] = useState(new Chess());
  const [currentPgn, setcurrentPgn] = useState();
  const [currentMoveNumber, setcurrentMoveNumber] = useState(-1); // TODO counter can't be > moves.length
  useEffect(() => {
    game.reset();
    setGame({ ...game });
    setcurrentMoveNumber(-1);
    // setcurrentEval({ score: 0, is_mate: false });
  }, [currentPgn]);

  useEffect(() => {
    const pgn = new Pgn(game.pgn())
    const uci_moves = pgn.history.moves.map(val => val.uci)
    stockfishInterface.setPosition(uci_moves.join(' '))
    console.log('SET POSITION AAAAAAAAAAAA')
  }, [currentMoveNumber])

  return (
    <div>
      <h1 style={{ color: 'white' }}>
        {game.fen()}
      </h1>
      <h1 style={{ color: 'white' }}>
        {bestMove}
      </h1>
      <h1 style={{ color: 'white' }}>
        {positionEval}
      </h1>
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
