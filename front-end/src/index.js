import React from 'react';
import axios from "axios";
import ReactDOM from 'react-dom';
import {useHistory} from 'react-router-dom';
import './index.css';
import './variables.css'
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from "react-redux";
import {store} from "./store";


axios.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("auth_token");
    if (accessToken == null) {
      return config;
    }

    config.headers = {
        ...config.headers,
        Authorization: "Bearer " + accessToken,
        idToken: accessToken
    };

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (config) => {
    return config;
  },
  (error) => {
    if (error.response && 401 === error.response.status) {
      localStorage.removeItem("auth_token");
      let history = useHistory()
      history.push("/auth");
    }

    return Promise.reject(error);
  }
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
        <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
