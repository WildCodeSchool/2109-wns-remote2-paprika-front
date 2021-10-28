import React from 'react';
import logoPaprika from './assets/pictures/paprika1.png';
import './assets/App.css';
const red = {color:'red'}
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logoPaprika} className="App-logo" alt="logo" />
          <h1 style={red}>Projet paprika</h1>
        <a
          className="App-link"
          href="https://drive.google.com/drive/folders/1OxO-xvH8QRMulYSm_nZP9imbOXgQNOUl"
          target="_blank"
          rel="noopener noreferrer"
        >
          drive projet
        </a>
      </header>
    </div>
  );
}

export default App;
