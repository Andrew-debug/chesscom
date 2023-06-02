import React, { forwardRef, useState } from "react";
import styled from "styled-components";
import { ReactComponent as Blitz } from "../../assets/icons/blitz.svg";
import { ReactComponent as Bullet } from "../../assets/icons/bullet.svg";
import { ReactComponent as Custom } from "../../assets/icons/custom.svg";
import { ReactComponent as Daily } from "../../assets/icons/daily.svg";
import { ReactComponent as Rapid } from "../../assets/icons/rapid.svg";
import Tooltip from "@mui/material/Tooltip";

const ArchivedGameContainer = styled.div`
  background-color: var(--black-primary);
  color: var(--white-primary);
`;

const GameWrap = styled.div`
  margin: 10px;
  cursor: pointer;
  border: 1px solid var(--gray);
`;

const WhiteSquare = styled.div`
  border-radius: 2px;
  display: block;
  flex-shrink: 0;
  width: 10px;
  height: 10px;
  margin-right: 5px;
  border: 1px solid #bebdb9;
  background-color: ${({ white }) => white && "var(--white-primary)"};
  border: ${({ whiteResult }) => whiteResult === "win" && "2px solid #96bc4b"};
`;
const BlackSquare = styled.div`
  border-radius: 2px;
  display: block;
  flex-shrink: 0;
  width: 10px;
  height: 10px;
  margin-right: 5px;
  background-color: ${({ black }) => black && "var(--gray)"};
  border: ${({ blackResult }) => blackResult === "win" && "2px solid #96bc4b"};
`;

const BlitzComponent = forwardRef(() => {
  return <Blitz style={{ width: 40, height: 30 }} />;
});
const RapidComponent = forwardRef(() => {
  return <Rapid style={{ width: 30, height: 30, marginRight: 10 }} />;
});
const DailyComponent = forwardRef(() => {
  return <Daily style={{ width: 30, height: 30, marginRight: 10 }} />;
});
const BulletComponent = forwardRef(() => {
  return <Bullet style={{ width: 20, height: 20, marginRight: 10 }} />;
});
const CustomComponent = forwardRef(() => {
  return <Custom style={{ width: 30, height: 30, marginRight: 10 }} />;
});

const GameResultSquare = ({ whiteResult, blackResult, item }) => {
  // const lowerCurrentUsername = userName.toLowerCase();
  const lowerCurrentUsername = "kaarelen";
  const lowerWhiteUserName = item.white.username.toLowerCase();
  const lowerBlackUserName = item.black.username.toLowerCase();

  if (whiteResult !== "win" && blackResult !== "win") return "draw";
  if (lowerCurrentUsername === lowerWhiteUserName) {
    if (whiteResult === "win") {
      return "win";
    } else if (blackResult === "win") {
      return "lose";
    }
  } else if (lowerCurrentUsername === lowerBlackUserName) {
    if (blackResult === "win") {
      return "win";
    } else if (whiteResult === "win") {
      return "lose";
    }
  }
  return "draw";
};

function ArchivedGame({ pgn, setcurrentPgn, item, userName }) {
  const [isHovered, setisHovered] = useState(false);
  const whiteResult = item.white.result;
  const blackResult = item.black.result;
  return (
    <ArchivedGameContainer>
      <GameWrap style={{ padding: 10 }} onClick={() => setcurrentPgn(pgn)}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <Tooltip
              title={
                {
                  blitz: "Blitz game",
                  rapid: "Rapid game",
                  daily: "Daily game",
                  bullet: "Bullet game",
                  custom: "Custom game",
                }[item.time_class]
              }
              placement="top"
            >
              <div>
                {
                  {
                    blitz: <BlitzComponent />,
                    rapid: <RapidComponent />,
                    daily: <DailyComponent />,
                    bullet: <BulletComponent />,
                    custom: <CustomComponent />,
                  }[item.time_class]
                }
              </div>
            </Tooltip>
            <div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <WhiteSquare whiteResult={whiteResult} white={true} />
                <span style={{ fontSize: 16 }}>{item.white.username}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <BlackSquare blackResult={blackResult} black={true} />
                <span style={{ fontSize: 16 }}>{item.black.username}</span>
              </div>
            </div>
          </div>
          <div style={{ display: "flex" }}>
            <GameResultSquare
              item={item}
              userName={userName}
              whiteResult={whiteResult}
              blackResult={blackResult}
            />
            <div style={{ marginLeft: 30 }}>{pgn.headers[2].value}</div>
          </div>
        </div>
        <a
          style={{
            color: isHovered
              ? "var(--button-hovered)"
              : "var(--white-primary-dim)",
          }}
          href={item.url}
          target="_blank"
          onMouseEnter={() => setisHovered(true)}
          onMouseLeave={() => setisHovered(false)}
        >
          {item.url}
        </a>
      </GameWrap>
    </ArchivedGameContainer>
  );
}

export default ArchivedGame;
