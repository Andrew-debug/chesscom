import React, { useContext } from "react";
import PrimaryButton from "../buttons/PrimaryButton";
import styled from "styled-components";
import { ButtonContext } from "../board/Board";
import _ from "lodash";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 500px;
  height: 800px;
  background-color: var(--black-primary);
  max-width: 500px;
  max-height: 800px;
`;
function NavBar() {
  const { game, setGame, setcurrentMoveNumber, currentPgn, currentMoveNumber } =
    useContext(ButtonContext);
  const whiteMoves = [];
  const blackMoves = [];
  if (currentPgn) {
    currentPgn.moves.map((item, index) => {
      if (index % 2 === 0) {
        whiteMoves.push(item);
      } else {
        blackMoves.push(item);
      }
    });
  }

  const allMoves = _.zip(whiteMoves, blackMoves);
  // if (currentPgn) {
  //   let tmp = true;
  //   const movesList = [];
  //   for (let index = 0; index < currentPgn.moves.length / 2; index++) {
  //     movesList.push({
  //       move_number: index,
  //     });
  //   }
  //   currentPgn.moves.forEach((item) => {
  //     if (tmp) {
  //       movesList[item["move_number"] - 1]["white"] = item["move"];
  //     } else {
  //       movesList[item["move_number"] - 1]["black"] = item["move"];
  //     }
  //     tmp = !tmp;
  //   });
  //   console.log(movesList);
  // }
  return (
    <Container>
      <div
        style={{
          minWidth: 400,
          maxHeight: 600,
          overflowX: "hidden",
          overflow: "auto",
          color: "var(--white-primary)",
          border: "1px solid white",
          margin: 10,
        }}
      >
        {allMoves.map(([wm, bm], index) => {
          return (
            <div
              key={index}
              style={{
                backgroundColor:
                  Math.trunc(currentMoveNumber / 2) === index && "green",
              }}
            >
              <div style={{ display: "flex" }}>
                <div>{wm.move_number}.</div>
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    const gameCopy = { ...game };
                    gameCopy.reset();
                    currentPgn.moves
                      .slice(0, index * 2 + 1)
                      .forEach((item) => gameCopy.move(item.move));
                    setGame(gameCopy);
                  }}
                >
                  {wm.move}
                </div>
                {"_:_"}
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    const gameCopy = { ...game };
                    gameCopy.reset();
                    currentPgn.moves
                      .slice(0, index * 2 + 2) // they come in pairs, black is 2nd (odd)
                      .forEach((item) => gameCopy.move(item.move));
                    setGame(gameCopy);
                  }}
                >
                  {bm.move}
                </div>
              </div>
              {/* {wm.move_number}. {wm.move} : {bm.move} */}
            </div>
          );
        })}
      </div>
      <div>
        <PrimaryButton
          text={"prev"}
          handleClick={() => {
            game.undo();
            setcurrentMoveNumber((prev) => (prev > -1 ? prev - 1 : prev));
          }}
        />
        <PrimaryButton
          text="next"
          handleClick={() => {
            setcurrentMoveNumber((prev) => prev + 1);
            const gameCopy = { ...game };
            gameCopy.move(currentPgn.moves[currentMoveNumber]?.move);
            setGame(gameCopy);
          }}
        />
      </div>
    </Container>
  );
}

export default NavBar;
