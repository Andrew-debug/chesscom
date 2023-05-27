import React, { createContext, forwardRef, useEffect, useState } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
/////////
import EvalBar from "../EvalBar/EvalBar";
import GamesHisory from "../gamesHistory/GamesHisory";
import NavBar from "../navBar/NavBar";
import { serverIP } from "../../assets/data/config";

// context
export const ButtonContext = createContext();
export const PgnContext = createContext();
//
const CustomSquareRenderer = forwardRef((props, ref) => {
  const { children, style } = props;
  const [clicked, setclicked] = useState(false);
  const [mouseDown, setmouseDown] = useState(false);
  const st = clicked
    ? {
        ...style,
        position: "relative",
        backgroundColor: "rgba(203, 5, 2, 0.5)",
      }
    : { ...style, position: "relative" };

  return (
    <div
      ref={ref}
      style={st}
      onContextMenu={() => {
        if (mouseDown) {
          setclicked(!clicked);
          setmouseDown(false);
        }
      }}
      onMouseDown={() => setmouseDown(true)}
      onMouseLeave={() => setmouseDown(false)}
    >
      {children}
    </div>
  );
});
function Board() {
  const [game, setGame] = useState(new Chess());
  const [currentPgn, setcurrentPgn] = useState();
  const [currentMoveNumber, setcurrentMoveNumber] = useState(-1); // TODO counter can't be > moves.length
  const [currentEval, setcurrentEval] = useState(50); // cant request data with -1 move
  const evalFetch = async () => {
    const data = await (
      await fetch(
        `http://${serverIP}:8080/get_eval?` +
          new URLSearchParams({
            pgn: game.pgn(),
          })
      )
    ).text();
    // setcurrentEval(data)
    console.log(data);
  };
  // useEffect(() => {
  //   evalFetch();
  // }, [currentMoveNumber]);

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
            <EvalBar currentEval={currentEval} />
            <div style={{ display: "flex" }}>
              <Chessboard
                // id="BasicBoard"
                id="CustomSquare"
                animationDuration={100}
                boardWidth="560"
                position={game.fen()}
                customSquare={CustomSquareRenderer}
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
