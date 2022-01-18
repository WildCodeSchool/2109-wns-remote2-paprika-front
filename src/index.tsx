import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import style css
import './styles/index.scss';
// import js file
import './styles/index.js';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);