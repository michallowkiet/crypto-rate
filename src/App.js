import bitcoin from "./Bitcoin.svg";
import Crypto from "./Components/Crypto";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={bitcoin} className="App-logo" alt="logo" />
        <h1>Crypto Rate</h1>
      </header>
      <Crypto />
    </div>
  );
}

export default App;
