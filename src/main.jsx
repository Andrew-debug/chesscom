import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { stockfishResultsUpdated } from "./stockfishEvents.js";
import { config } from "../package.json";
import debounce from "lodash.debounce";

const stockfish_results = {
  bestMove: undefined,
  positionEval: undefined,
};
const notifyFront = debounce(() => {
  window.dispatchEvent(stockfishResultsUpdated);
}, 100);
const stPost = (text) => {
  // console.log("SEND :::: ", text);
  stockfish.postMessage(text);
};
// init stockfish
const stockfish = new Worker("node_modules/stockfish/src/stockfish.js", {
  type: "module",
});
window.stockfish = stockfish;
stPost("uci");
stPost("setoption name Threads value 8");
stPost("setoption name Hash value 512");

// interface for react
const stockfishInterface = {
  depth: 18,
  setDepth: (depth) => (stockfishInterface.depth = depth),
  getResults: () => stockfish_results,
  setPosition: (uciStr) => {
    stPost("stop");
    stPost("ucinewgame");
    stPost(`position startpos moves ${uciStr}`);
    stPost(`go depth ${stockfishInterface.depth}`);
  },
  callForEval: () => stPost("eval"),
};
// main message handler
stockfish.onmessage = (event) => {
  if (config.talkative_fish) {
    // console.log("SF ::: ", event.data);
    // console.log(event.data);
  }

  let dataChanged = false;

  const engine_analisys_regex = event.data.match(/\s.* cp (-?\d+).* pv (.+)/);
  if (engine_analisys_regex) {
    const [__, cp, pv] = engine_analisys_regex;
    const bestMove = pv.split(" ")[0];
    stockfish_results.positionEval = cp;
    stockfish_results.bestMove = bestMove;
    dataChanged = true;
  }
  if (dataChanged) {
    notifyFront();
  }
};
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App stockfishInterface={stockfishInterface} />
  </React.StrictMode>
);
