import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import './Catalog.css';

export default class Catalog extends Component {

  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      email: "",
      password: ""
    };
  }

  componentDidMount() {
    var email = localStorage.getItem("email")
    //alert("email: " + email)
  }

  updateEmail(event) {
    console.log(event)
    this.setState({ value: event })
  }

  handleLogIn() {
    this.props.history.push("/productdetails");
  }

  render() {
    return (
      <div className = "App">
        <p className = "Title">Login</p>
        <button onClick={() => this.handleLogIn()} className = "Button-Primary">Sign In</button>
        <div className = "Expander"></div>
      </div>
    );
  }
}