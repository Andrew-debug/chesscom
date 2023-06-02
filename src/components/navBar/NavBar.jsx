import React, { useContext } from "react";
import styled from "styled-components";
import _ from "lodash";

//////
import { NavBarContext } from "../board/Board";
import ReviewMsg from "../reviewMsg/ReviewMsg";
import BlackWhiteMove from "./blackWhiteMove/BlackWhiteMove";
import PossibleEngineMoves from "./possibleEngineMoves/PossibleEngineMoves";
import ChartComponent from "../chart/ChartComponent";
import NavButtons from "./NavButtons";

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
  const { currentPgn, gameReviewData } = useContext(NavBarContext);

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
        <NavButtons />
      </div>
    </Container>
  );
}

export default NavBar;
