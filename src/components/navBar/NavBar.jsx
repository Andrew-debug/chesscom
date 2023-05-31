import React, { useContext } from "react";
import PrimaryButton from "../buttons/PrimaryButton";
import styled from "styled-components";
import { NavBarContext } from "../board/Board";
import _ from "lodash";
import ReviewMsg from "../reviewMsg/ReviewMsg";
import BlackWhiteMove from "./blackWhiteMove/BlackWhiteMove";
import PossibleEngineMoves from "./possibleEngineMoves/PossibleEngineMoves";
import Loader from "../loader/Loader";
import ChartComponent from "../chart/ChartComponent";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
  height: 800px;
  background-color: var(--black-primary);
  max-width: 500px;
  max-height: 800px;
`;
const HorizontalMoveList = styled.div`
  display: flex;
  flex-wrap: wrap;
  min-width: 230px;
  max-height: 500px;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 10px 15px;
  font-size: 14px;
`;
function NavBar() {
  const { game, setGame, setcurrentMoveNumber, currentPgn, currentMoveNumber } =
    useContext(NavBarContext);
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
  return (
    <Container>
      <Loader size="0.5" />
      <ChartComponent />
      <PossibleEngineMoves />
      <HorizontalMoveList>
        {allMoves.map(([wm, bm], index) => {
          return (
            <div key={index} style={{ display: "flex" }}>
              <BlackWhiteMove wm={wm} bm={bm} index={index} />
            </div>
          );
        })}
      </HorizontalMoveList>
      <ReviewMsg />
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
            const gameCopy = { ...game };
            gameCopy.move(currentPgn.moves[currentMoveNumber + 1]?.move);
            setGame(gameCopy);
            setcurrentMoveNumber((prev) => prev + 1);
          }}
        />
      </div>
    </Container>
  );
}

export default NavBar;
