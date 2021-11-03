import React from 'react';
import axios from "axios";
import ReactDOM from 'react-dom';
import {Route, Switch, BrowserRouter as Router, useHistory} from 'react-router-dom';
import './index.css';
import App from './App';
import Catalog from './pages/Catalog';
import { store } from './store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import ProductDetails from "./pages/ProductDetails";
import Authentication from "./pages/Authentication";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";


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
    {/*<Provider store={store}>*/}
        <Router>
            <Switch>
                <Route path="/auth" component={Authentication} />

                <Route path={['/catalog', '/productdetails']}>
                    <Layout authenticated>
                        <Switch>
                            <ProtectedRoute path="/catalog" component={Catalog} exact />
                            <ProtectedRoute path="/productdetails" component={ProductDetails} />
                        </Switch>
                    </Layout>
                </Route>

                {/*used for the root "/" and will be greedy so need it after everything*/}
                <Route path={['/404', '/']}>
                    <Layout>
                        <Switch>
                            <Route path="/" component={App} exact />
                            <Route path="/404" component={App} />
                        </Switch>
                    </Layout>
                </Route>
            </Switch>
        </Router>
    {/*</Provider>*/}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
