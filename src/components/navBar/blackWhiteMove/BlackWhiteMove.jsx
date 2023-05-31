import React, { useContext } from "react";
import { NavBarContext } from "../../board/Board";
import { BlackStyles, WhiteStyles } from "./blackWhiteMoveStyles";

function BlackWhiteMove({ wm, bm, index }) {
  const { game, setGame, currentMoveNumber, setcurrentMoveNumber, currentPgn } =
    useContext(NavBarContext);
  return (
    <>
      <div
        style={{
          color: "rgba(255,255,255, 0.5)",
          marginRight: 5,
          padding: 1,
        }}
      >
        {wm.move_number}.
      </div>
      <WhiteStyles
        currentMoveNumber={currentMoveNumber}
        index={index}
        onClick={() => {
          const gameCopy = { ...game };
          gameCopy.reset();
          currentPgn.moves
            .slice(0, index * 2 + 1)
            .forEach((item) => gameCopy.move(item.move));
          setGame(gameCopy);
          setcurrentMoveNumber(index * 2);
        }}
      >
        {wm?.move}
      </WhiteStyles>
      <BlackStyles
        currentMoveNumber={currentMoveNumber}
        index={index}
        onClick={() => {
          const gameCopy = { ...game };
          gameCopy.reset();
          currentPgn.moves
            .slice(0, index * 2 + 2) // they come in pairs, black is 2nd (odd)
            .forEach((item) => gameCopy.move(item.move));
          setGame(gameCopy);
          setcurrentMoveNumber(index * 2 + 1);
        }}
      >
        {bm?.move}
      </BlackStyles>
    </>
  );
}

export default BlackWhiteMove;
