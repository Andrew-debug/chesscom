import React, { useContext, useState } from "react";
import styled from "styled-components";
import pgnParser from "pgn-parser";

///////
import { PgnContext } from "../board/Board";
import staticData from "../../assets/data/tmp.json";
import { serverIP } from "../../assets/data/config";
import { Container } from "../navBar/NavBar";
import FetchDataComponent from "../FetchDataComponent";
import ArchivedGame from "./ArchivedGame";
import Loader from "../loader/Loader";

const InputWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const useFetchData1 = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(url);
      const jsonData = await response.json();
      setData(jsonData);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error);
    }
  };

  return { data, isLoading, error, fetchData };
};

const FetchButton = ({ fetchData }) => {
  return (
    <div>
      <button onClick={fetchData}>Fetch Data</button>
    </div>
  );
};

const DisplayDataComponent = ({ data, setcurrentPgn, username }) => {
  return (
    <>
      {data.games
        .reverse()
        .slice(0, 20)
        .map((item, index) => {
          const pgn = pgnParser.parse(item.pgn)[0];
          pgn.rawPgn = item.pgn;
          return (
            <ArchivedGame
              key={index}
              item={item}
              pgn={pgn}
              setcurrentPgn={setcurrentPgn}
              username={username}
            />
          );
        })}
    </>
  );
};

const DataComponent = ({ url }) => {
  const { data, isLoading, error, fetchData } = useFetchData1(url);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return "error";
  }

  if (data) {
    return <DisplayDataComponent data={data} />;
  }

  return <FetchButton fetchData={fetchData} />;
};

function GamesHisory() {
  const [gamesData, setgamesData] = useState([]);
  const [showData, setShowData] = useState(false);
  const [username, setUsername] = useState("GothamChess");
  const { setcurrentPgn } = useContext(PgnContext);

  // const [isLoading, setisLoading] = useState(false);

  return (
    <Container>
      {!showData && (
        <InputWrap>
          <div style={{ color: "var(--white-primary)" }}>
            Use Chess.com username
          </div>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {/* <button onClick={() => setShowData(true)}>Show games</button> */}
          <FetchButton />
        </InputWrap>
      )}
      <div
        style={{
          maxWidth: 500,
          maxHeight: 800,
          overflowX: "hidden",
          overflow: "auto",
        }}
      >
        <div>
          <div>
            {/* {isLoading ? (
              <Loader></Loader>
            ) : (
              <button
                onClick={async () => {
                  setisLoading(true);
                  const response = await fetch(
                    `http://${serverIP}:8080/get_games?` +
                      new URLSearchParams({
                        user_name: username,
                      })
                  );
                  const jsonData = await response.json();
                  setgamesData(jsonData);
                  setisLoading(false);
                }}
              >
                'show games plssss'
              </button>
            )} */}
            <DataComponent
              url={
                `http://${serverIP}:8080/get_games?` +
                new URLSearchParams({
                  user_name: username,
                })
              }
              setcurrentPgn={setcurrentPgn}
              username={username}
            />
            {/* {gamesData.games &&
              gamesData.games
                .reverse()
                .slice(0, 20)
                .map((item, index) => {
                  const pgn = pgnParser.parse(item.pgn)[0];
                  pgn.rawPgn = item.pgn;
                  return (
                    <ArchivedGame
                      key={index}
                      item={item}
                      pgn={pgn}
                      setcurrentPgn={setcurrentPgn}
                      username={username}
                    />
                  );
                })} */}
            {/* {showData && (
              <FetchDataComponent
                action={fetchJSONData(
                  `http://${serverIP}:8080/get_games?` +
                    new URLSearchParams({
                      user_name: username,
                    })
                )}
                loaderSize="0.5"
              >
                {(data) => {
                  return data.games
                    .reverse()
                    .slice(0, 20)
                    .map((item, index) => {
                      const pgn = pgnParser.parse(item.pgn)[0];
                      pgn.rawPgn = item.pgn;
                      return (
                        <ArchivedGame
                          key={index}
                          item={item}
                          pgn={pgn}
                          setcurrentPgn={setcurrentPgn}
                          username={username}
                        />
                      );
                    });
                }}
              </FetchDataComponent>
            )} */}
          </div>

          {/* <button
            onClick={() => {
              setgamesData(staticData.games);
            }}
          >
            get static data
          </button>
          {gamesData.slice(0, 20).map((item, index) => {
            const pgn = pgnParser.parse(item.pgn)[0];
            pgn.rawPgn = item.pgn;
            // console.log(item);
            return (
              <ArchivedGame
                key={index}
                item={item}
                pgn={pgn}
                setcurrentPgn={setcurrentPgn}
                username={username}
              />
            );
          })} */}
        </div>
      </div>
    </Container>
  );
}

export default GamesHisory;
