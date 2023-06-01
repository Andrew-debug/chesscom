import React, { useContext } from "react";
import PrimaryButton from "../buttons/PrimaryButton";
import styled from "styled-components";
import { NavBarContext } from "../board/Board";
import _ from "lodash";
import ReviewMsg from "../reviewMsg/ReviewMsg";
import BlackWhiteMove from "./blackWhiteMove/BlackWhiteMove";
import PossibleEngineMoves from "./possibleEngineMoves/PossibleEngineMoves";
import ChartComponent from "../chart/ChartComponent";
import { IconButton } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 100vh;
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
  const {
    game,
    setGame,
    setcurrentMoveNumber,
    currentPgn,
    currentMoveNumber,
    gameReviewData,
  } = useContext(NavBarContext);
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
      <div style={{ margin: 10 }}>
        <ChartComponent gameReviewData={gameReviewData} />
      </div>
      {/* <PossibleEngineMoves /> */}
      <HorizontalMoveList>
        {allMoves.map(([wm, bm], index) => {
          return (
            <div key={index} style={{ display: "flex" }}>
              <BlackWhiteMove
                gameReviewData={gameReviewData}
                wm={wm}
                bm={bm}
                index={index}
              />
            </div>
          );
        })}
      </HorizontalMoveList>
      <ReviewMsg />
      <div style={{ position: "absolute", bottom: 0 }}>
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
        <IconButton
          sx={{ color: "var(--white-primary)" }}
          aria-label="First Move"
        >
          <KeyboardDoubleArrowLeftIcon />
        </IconButton>
        <IconButton
          sx={{ color: "var(--white-primary)" }}
          aria-label="Previous Move"
        >
          <NavigateBeforeIcon />
        </IconButton>
        <IconButton
          sx={{ color: "var(--white-primary)" }}
          aria-label="Next Move"
        >
          <NavigateNextIcon />
        </IconButton>
        <IconButton
          sx={{ color: "var(--white-primary)" }}
          aria-label="Last Move"
        >
          <KeyboardDoubleArrowRightIcon />
        </IconButton>
      </div>
    </Container>
  );
}

export default NavBar;
