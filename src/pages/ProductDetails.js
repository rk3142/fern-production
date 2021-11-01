import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import './ProductDetails.css';

export default class ProductDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
    };
  }

  updateEmail(event) {
    console.log(event)
    this.setState({ value: event })
  }

  handleLogIn() {
    this.props.history.push("/");
  }

  render() {
    return (
      <div className = "App">
        <p className = "Title">ProductDetails</p>
        <button onClick={() => this.handleLogIn()} className = "Button-Primary">Catalog</button>
        <div className = "Expander"></div>
      </div>
    );
  }
}