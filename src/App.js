import "./App.css";
import Guesser from "./components/Guesser";
import Landing from "./components/Landing";

function App() {
  return (
    <div className="app">
      <Landing></Landing>
      <Guesser></Guesser>
    </div>
  );
}

export default App;
