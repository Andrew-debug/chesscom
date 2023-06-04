import React, { createContext, useEffect, useState } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
/////////
import GamesHisory from "../gamesHistory/GamesHisory";
import NavBar from "../navBar/NavBar";
import { serverIP } from "../../assets/data/config";
import EvalBar from "../evalBar/EvalBar";
import CustomSquareRenderer from "./CustomSquareRender";
import staticGameReview from "../../assets/data/game-rev.json";
// context
export const NavBarContext = createContext();
export const PgnContext = createContext();
//

function Board() {
  const [game, setGame] = useState(new Chess());
  const [currentPgn, setcurrentPgn] = useState();
  const [currentMoveNumber, setcurrentMoveNumber] = useState(-1); // TODO counter can't be > moves.length
  const [currentEval, setcurrentEval] = useState({ score: 0, is_mate: false }); // cant request data with -1 move
  const [gameReviewData, setgameReviewData] = useState();
  const evalFetch = async () => {
    const data = await (
      await fetch(
        `http://${serverIP}:8080/get_eval?` +
          new URLSearchParams({
            pgn: game.pgn(),
          })
      )
    ).json();
    setcurrentEval(data);
  };

  useEffect(() => {
    game.reset();
    setGame({ ...game });
    setcurrentMoveNumber(-1);
    setgameReviewData(); // reset
    setcurrentEval({ score: 0, is_mate: false });
  }, [currentPgn]);

  const getGameReview = async () => {
    const data = await (
      await fetch(
        `http://${serverIP}:8080/get_game_review?` +
          new URLSearchParams({
            pgn: currentPgn.rawPgn,
          })
      )
    ).json();
    setgameReviewData(data);
    console.log(data);
  };
  return (
    <div>
      <button onClick={() => getGameReview()}>get full game review</button>
      <button onClick={() => setgameReviewData(staticGameReview)}>
        static game review
      </button>
      <button onClick={evalFetch}>getEval</button>
      <div style={{ display: "flex", alignItems: "center" }}>
        <PgnContext.Provider value={{ setcurrentPgn }}>
          <GamesHisory />
        </PgnContext.Provider>
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
            <EvalBar currentEval={currentEval} />
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
        <NavBarContext.Provider
          value={{
            game,
            setGame,
            setcurrentMoveNumber,
            currentPgn,
            currentMoveNumber,
            gameReviewData,
            setgameReviewData,
          }}
        >
          <NavBar />
        </NavBarContext.Provider>
      </div>
    </div>
  );
}

export default Board;
