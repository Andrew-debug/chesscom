import { BlackStyles, WhiteStyles } from "./blackWhiteMoveStyles";

function BlackWhiteMove({
  wm,
  bm,
  index,
  gameReviewData,
  currentPgn,
  game,
  setGame,
  setcurrentMoveNumber,
  currentMoveNumber,
  setPiecesTurn,
}) {
  let white_color;
  let black_color;
  if (gameReviewData) {
    const white_moves_review = gameReviewData.all_moves.filter(
      (_, index) => index % 2 === 0
    );
    const black_moves_review = gameReviewData.all_moves.filter(
      (_, index) => index % 2 !== 0
    );
    const white_scorr_diff =
      white_moves_review[index]?.score -
      (black_moves_review[index - 1]
        ? black_moves_review[index - 1].score
        : 33);

    const black_scorr_diff = black_moves_review[index]
      ? black_moves_review[index].score - white_moves_review[index]?.score
      : 0;

    function evalDiffToColor(evalDiff) {
      if (evalDiff < 10 && evalDiff > -10) {
        return "white";
      } else {
        if (evalDiff > 0) {
          if (evalDiff > 40) {
            return "blue";
          } else {
            return "green";
          }
        } else {
          if (evalDiff > -40) {
            return "pink";
          } else {
            return "red";
          }
        }
      }
    }
    white_color = evalDiffToColor(white_scorr_diff);
    black_color = evalDiffToColor(-black_scorr_diff);
  } else {
    white_color = "white";
    black_color = "white";
  }
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
        style={{ color: white_color }}
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
          // pass turn
          setPiecesTurn("black");
        }}
      >
        {wm?.move}
      </WhiteStyles>
      <BlackStyles
        style={{ color: black_color }}
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
          setPiecesTurn("white");
        }}
      >
        {bm?.move}
      </BlackStyles>
    </>
  );
}

export default BlackWhiteMove;
