import React, { forwardRef, useState } from "react";
import { ReactComponent as Blitz } from "../../assets/icons/blitz.svg";
import { ReactComponent as Bullet } from "../../assets/icons/bullet.svg";
import { ReactComponent as Custom } from "../../assets/icons/custom.svg";
import { ReactComponent as Daily } from "../../assets/icons/daily.svg";
import { ReactComponent as Rapid } from "../../assets/icons/rapid.svg";
import Tooltip from "@mui/material/Tooltip";
import {
  ArchivedGameContainer,
  BlackSquare,
  DrawComponent,
  GameWrap,
  LoseComponent,
  WhiteSquare,
  WinComponent,
} from "./ArchivedGameStyles";

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

const GameResultSquare = ({ item, username }) => {
  const lowerCurrentUsername = String(username).toLowerCase();
  // const lowerCurrentUsername = "kaarelen";

  const [userResult, oponentResult] = {
    [String(item.white.username).toLowerCase()]: [
      item.white.result,
      item.black.result,
    ],
    [String(item.black.username).toLowerCase()]: [
      item.black.result,
      item.white.result,
    ],
  }[lowerCurrentUsername];
  if (userResult === "win") {
    return (
      <WinComponent>
        <span>+</span>
      </WinComponent>
    );
  } else if (oponentResult === "win") {
    return (
      <LoseComponent>
        <span>-</span>
      </LoseComponent>
    );
  } else {
    return (
      <DrawComponent>
        <span>=</span>
      </DrawComponent>
    );
  }
};

function ArchivedGame({ pgn, setcurrentPgn, item, username }) {
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
                }[item.time_class] || "Custom game"
              }
              placement="top"
            >
              <div>
                {{
                  blitz: <BlitzComponent />,
                  rapid: <RapidComponent />,
                  daily: <DailyComponent />,
                  bullet: <BulletComponent />,
                }[item.time_class] || <CustomComponent />}
              </div>
            </Tooltip>
            <div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <WhiteSquare whiteResult={whiteResult} />
                <span style={{ fontSize: 16 }}>{item.white.username}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <BlackSquare blackResult={blackResult} />
                <span style={{ fontSize: 16 }}>{item.black.username}</span>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <GameResultSquare item={item} username={username} />
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
