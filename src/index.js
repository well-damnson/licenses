import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './index.less';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provide } from './Context';

let Render = (
  <Provide>
    <App></App>
  </Provide>
);

ReactDOM.render(Render, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
