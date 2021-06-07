import logo from './icons/logo.svg';
import './App.css';
import DiceContainer from './DiceContainer';

function App() {
  return (
    <div className="App">

      <h2>Yahtzee du pauvre</h2>

      <DiceContainer />

      <footer className="App-footer">
      <p>Fait avec React </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        ><img src={logo} className="App-logo" alt="Learn React" />
        </a>

      </footer>
    </div>
  );
}

export default App;
