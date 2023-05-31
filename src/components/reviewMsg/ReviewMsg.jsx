import React, { useContext } from "react";
import { NavBarContext } from "../board/Board";

function ReviewMsg() {
  const { gameReviewData, currentMoveNumber } = useContext(NavBarContext);
  if (currentMoveNumber < 0 || gameReviewData === undefined) {
    return <div></div>;
  }
  const bestMove = <div>this is the best move </div>;
  const blunder = <div>you've made a blunder</div>;
  const currentReviewMove = gameReviewData.all_moves[currentMoveNumber];
  return (
    <div style={{ color: "white", maxWidth: 500 }}>
      <div>
        Your move is: {currentReviewMove.move}, score: {currentReviewMove.score}
      </div>
      <div>
        Best computer move is: {currentReviewMove.pv_move}, score:
        {/* {currentReviewMove.pv_move_score} */}
      </div>
    </div>
  );
}

export default ReviewMsg;
