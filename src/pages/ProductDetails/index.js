import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import './ProductDetails.css';

class ProductDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      product: [],
    };
  }

  componentDidMount = async () => {
    let product = await localStorage.getItem('recently_clicked')
    this.setState({product: product})
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

export default ProductDetails