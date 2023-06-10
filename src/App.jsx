import Board from "./components/board/Board";
function App({ stockfishInterface }) {
  return (
    <div>
      <Board stockfishInterface={stockfishInterface} />
    </div>
  );
}

export default App;
