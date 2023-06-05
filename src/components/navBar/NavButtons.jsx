import React, { useState } from "react";
import { IconButton } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import Tooltip from "@mui/material/Tooltip";

function NavButtons({
  game,
  setGame,
  setcurrentMoveNumber,
  currentPgn,
  currentMoveNumber,
}) {
  const [btnHover, setBtnHover] = useState(0);

  return (
    <>
      <Tooltip
        title={
          currentPgn ? (currentMoveNumber === -1 ? null : "Last Move") : null
        }
        placement="top"
      >
        <span>
          <IconButton
            sx={{
              color:
                btnHover === 1
                  ? "var(--button-hovered)"
                  : "var(--button-active)",
              "&:disabled": {
                color: "var(--button-disabled)",
              },
            }}
            onClick={() => {
              const gameCopy = { ...game };
              gameCopy.reset();
              setGame(gameCopy);
              setcurrentMoveNumber(-1);
            }}
            disabled={
              currentPgn ? (currentMoveNumber === -1 ? true : false) : true
            }
            onMouseEnter={() => setBtnHover(1)}
            onMouseLeave={() => setBtnHover(0)}
          >
            <KeyboardDoubleArrowLeftIcon />
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip
        title={
          currentPgn
            ? currentMoveNumber === -1
              ? null
              : "Previous Move"
            : null
        }
        placement="top"
      >
        <span>
          <IconButton
            sx={{
              color:
                btnHover === 2
                  ? "var(--button-hovered)"
                  : "var(--button-active)",
              "&:disabled": {
                color: "var(--button-disabled)",
              },
            }}
            onClick={() => {
              game.undo();
              setcurrentMoveNumber((prev) => (prev > -1 ? prev - 1 : prev));
            }}
            disabled={
              currentPgn ? (currentMoveNumber === -1 ? true : false) : true
            }
            onMouseEnter={() => setBtnHover(2)}
            onMouseLeave={() => setBtnHover(0)}
          >
            <NavigateBeforeIcon />
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip
        title={
          currentPgn
            ? currentMoveNumber === currentPgn?.moves.length - 1
              ? null
              : "Last Move"
            : null
        }
        placement="top"
      >
        <span>
          <IconButton
            sx={{
              color:
                btnHover === 3
                  ? "var(--button-hovered)"
                  : "var(--button-active)",
              "&:disabled": {
                color: "var(--button-disabled)",
              },
            }}
            onClick={() => {
              const gameCopy = { ...game };
              gameCopy.move(currentPgn.moves[currentMoveNumber + 1]?.move);
              setGame(gameCopy);
              setcurrentMoveNumber((prev) => prev + 1);
            }}
            disabled={
              currentPgn
                ? currentMoveNumber === currentPgn?.moves.length - 1
                  ? true
                  : false
                : true
            }
            onMouseEnter={() => setBtnHover(3)}
            onMouseLeave={() => setBtnHover(0)}
          >
            <NavigateNextIcon />
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip
        title={
          currentPgn
            ? currentMoveNumber === currentPgn?.moves.length - 1
              ? null
              : "Last Move"
            : null
        }
        placement="top"
      >
        <span>
          <IconButton
            sx={{
              color:
                btnHover === 4
                  ? "var(--button-hovered)"
                  : "var(--button-active)",
              "&:disabled": {
                color: "var(--button-disabled)",
              },
            }}
            onClick={() => {
              const gameCopy = { ...game };
              gameCopy.reset();
              currentPgn.moves.forEach((item) => gameCopy.move(item.move));
              setGame(gameCopy);
              setcurrentMoveNumber(currentPgn.moves.length - 1);
            }}
            disabled={
              currentPgn
                ? currentMoveNumber === currentPgn?.moves.length - 1
                  ? true
                  : false
                : true
            }
            onMouseEnter={() => setBtnHover(4)}
            onMouseLeave={() => setBtnHover(0)}
          >
            <KeyboardDoubleArrowRightIcon />
          </IconButton>
        </span>
      </Tooltip>
    </>
  );
}

export default NavButtons;
