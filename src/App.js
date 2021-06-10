import React, {useState} from "react";
import logo from "./icons/logo.svg";
import gh from "./icons/github.png";
import li from "./icons/linkedin.png";
import './style/App.css';
import GameContainer from './component/GameContainer';
import Help from './component/Help.js'

function App() {
  const [show, setShow] = useState(false)

  return (
    <div className="App">

      <h2>Yahtzee du pauvre</h2>
      <button onClick={() => setShow(true)}>Comment jouer ?</button>
      <Help show={show} onClose={() => setShow(false)}/>

      <GameContainer />

      <footer className="App-footer">
      <p>Fait avec React par Clément Bauchet 
        <a href="https://github.com/Tagpower/reactzee"><img className="icon" src={gh} alt="GitHub"/></a>
        <a href="https://www.linkedin.com/in/cl%C3%A9ment-bauchet-ba76b012a/"><img className="icon" src={li} alt="LinkedIn"/></a>
      </p>
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
