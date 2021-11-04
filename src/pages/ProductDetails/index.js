import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import StarRatings from "react-star-ratings";
import logo from '../../assets/logo.png'
import fern_text from '../../assets/fern_text.png'
import apiMock from "../ApiMock";
import co2_icon from '../../assets/CO2.png'
import h2o_icon from '../../assets/h2o_icon.png'
import energy_icon from '../../assets/energy_icon.jpeg'
import './ProductDetails.css';

class ProductDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      product: [],
      calculated_stats: []
    };
  }

  componentDidMount = async () => {
    let product = await localStorage.getItem('recently_clicked')
    await this.setState({ product: JSON.parse(product) })
    console.log(this.state.product)
    let allItems = this.getAllProducts()
    let total = [0, 0, 0]
    for (var i in allItems) {
      total[0] += allItems[i]["carbon"]
      total[1] += allItems[i]["water"]
      total[2] += allItems[i]["energy"]
    }
    let means = []
    means.push(total[0] / allItems.length)
    means.push(total[1] / allItems.length)
    means.push(total[2] / allItems.length)
    this.setState({ calculated_stats: means })
    console.log(means)
  }

  getAllProducts() {
    return apiMock()
  }

  render() {
    return (
      <div className="App">
        <div className="Header">
          <img className="Logo" src={logo} />
          <img className="Fern" src={fern_text} />
          <p className="PageTitle"><a className="ProductName" href={this.state.product[3]}>{this.state.product[1]}</a></p>
        </div>
        <div className="Body">
          <img className="ProductImage" src={this.state.product[2]} />
          <div>
            <div className="DetailsBody">
              <img className="EcoDetsIcon" src={co2_icon} />
              <p className="EcoDetsText">{this.state.product[8]} kg of carbon released into the atmosphere</p>
              <img className="EcoDetsIcon" src={h2o_icon} />
              <p className="EcoDetsText">{this.state.product[9]}k liters of water used in manufacturing</p>
              <img className="EcoDetsIcon" src={energy_icon} />
              <p className="EcoDetsText">{this.state.product[10]} kWh of energy used in production</p>
            </div>
            <div className="ProductBody">
              <div className="Source">
                <p>Source: </p>
                <ul className="SourceText" key={this.state.product[0]}>Amazon</ul>
              </div>
              <ul className="ProductRatingText" key={this.state.product[0]}>{this.state.product[5]}/5.0</ul>
              <ul className="ProductRating" key={this.state.product[0]}>
                <StarRatings
                  rating={this.state.product[5]}
                  starRatedColor="#FFDC61"
                  numberOfStars={5}
                  name='rating'
                  starDimension="15"
                  starSpacing="5"
                />
              </ul>
              <ul className="ProductRatings" key={this.state.product[0]}>({this.state.product[6]})</ul>
            </div>
            <div className="DescriptionBody">
              <ul className="ProductDescriptionText" key={this.state.product[0]}>{this.state.product[7]}</ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductDetails