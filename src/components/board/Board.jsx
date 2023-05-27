import React, { createContext, useEffect, useState } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
/////////
import EvalBar from "../EvalBar/EvalBar";
import GamesHisory from "../gamesHistory/GamesHisory";
import NavBar from "../navBar/NavBar";

// context
export const ButtonContext = createContext();
export const PgnContext = createContext();
//

function Board() {
  const [game, setGame] = useState(new Chess());
  const [currentPgn, setcurrentPgn] = useState();
  const [currentMoveNumber, setcurrentMoveNumber] = useState(-1); // TODO counter can't be > moves.length
  const evalFetch = async () => {
    const data = await (
      await fetch(
        "http://10.57.31.10:8080/get_eval?" +
          new URLSearchParams({
            pgn: game.pgn(),
          })
      )
    ).text();
    console.log(data);
  };

  // useEffect(() => {
  //   if (currentPgn) {
  //     makeAMove(currentPgn.moves[currentMoveNumber]?.move);
  //   }
  // }, [currentMoveNumber]);

  useEffect(() => {
    game.reset();
    setGame({ ...game });
    setcurrentMoveNumber(-1);
  }, [currentPgn]);

  // function makeAMove(move) {
  //   const gameCopy = { ...game };
  //   const currentPgn = gameCopy.move(move);
  //   setGame(gameCopy);
  //   // console.log(game.pgn());
  //   return currentPgn;
  // }
  return (
    <div>
      <button onClick={evalFetch}>getEval</button>
      <div style={{ display: "flex", alignItems: "center" }}>
        <PgnContext.Provider value={{ setcurrentPgn }}>
          <GamesHisory />
        </PgnContext.Provider>
        <div>
          <div style={{ display: "flex" }}>
            <EvalBar />
            <div style={{ display: "flex" }}>
              <Chessboard
                id="BasicBoard"
                animationDuration={100}
                boardWidth="560"
                position={game.fen()}
                onSquareRightClick={(square) => console.log(square)}
                customSquareStyles={{ squareColor: "red" }}
              />
            </div>
          </div>
        </div>
        <ButtonContext.Provider
          value={{
            game,
            setGame,
            setcurrentMoveNumber,
            currentPgn,
            currentMoveNumber,
          }}
        >
          <NavBar />
        </ButtonContext.Provider>
      </div>
      {JSON.stringify(currentPgn)}
    </div>
  );
}

export default Board;
