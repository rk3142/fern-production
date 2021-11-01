import React, { Component } from "react";
import { BrowserRouter, Route, Switch, NavLink } from 'react-router-dom';

import logo from './logo.svg';
import Catalog from './pages/Catalog';
import ProductDetails from "./pages/ProductDetails";
import './App.css';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          

          <Switch>
            <Route path="/" component={Catalog} exact />
            <Route path="/productdetails" component={ProductDetails} exact />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}