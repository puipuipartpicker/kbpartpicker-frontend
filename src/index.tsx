import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'
import { MessageProvider } from './context/MessageContext';
import { WatchListProvider } from './context/WatchListContext';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import dotenv from 'dotenv'
dotenv.config()

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <WatchListProvider>
        <MessageProvider>
          <App />
        </MessageProvider>
      </WatchListProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
