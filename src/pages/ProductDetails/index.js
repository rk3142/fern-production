import React, { Component } from "react";
import StarRatings from "react-star-ratings";
import co2_icon from '../../assets/CO2.png'
import h2o_icon from '../../assets/h2o_icon.png'
import energy_icon from '../../assets/energy_icon.jpeg'
import './ProductDetails.css';
import {Button} from "@mui/material";

class ProductDetails extends Component {

  constructor(props) {
      super(props);
      this.state = {
        product: [],
      };
  }

  componentWillMount = () => {
      let product = localStorage.getItem('recently_clicked')
      this.setState({ product: JSON.parse(product) })
  }

  render() {
    return (
        <div className='details_page'>
          <div className="details">
            <img className="details__image" src={this.state.product['image_url']} />

            <div className="details__info">
                <h1 className="details__info__name">{this.state.product['product_name']}</h1>

                <div className="details__info__body">
                    <img className="EcoDetsIcon" src={co2_icon} />
                    <p className="EcoDetsText">{this.state.product['carbon']}kg of carbon released into the atmosphere</p>
                    <img className="EcoDetsIcon" src={h2o_icon} />
                    <p className="EcoDetsText">{this.state.product['water']}k liters of water used in manufacturing</p>
                    <img className="EcoDetsIcon" src={energy_icon} />
                    <p className="EcoDetsText">{this.state.product['energy']}kWh of energy used in production</p>
                </div>

                <div className="details__info__more">
                    <div className="details__info__more__actions">
                        <div className="details__info__more__actions__ratings">
                            <div className="details__info__more__actions__ratings__stars">
                                {`${this.state.product['rating']}/5.0`}
                                <StarRatings
                                  rating={this.state.product['rating']}
                                  starRatedColor="#FFDC61"
                                  numberOfStars={5}
                                  name='rating'
                                  starDimension="15"
                                  starSpacing="5"
                                />
                            </div>

                            {`${this.state.product['ratings']} ratings `}

                            <div className="details__info__more__actions__ratings__stars__source">
                                (Amazon)
                            </div>
                        </div>

                        <div className="details__info__more__actions__price">
                            {`$${this.state.product['prices'][0]['price']}`}
                        </div>

                        <div className="details__info__more__actions__buttons">
                            <Button variant='contained' className={'details__info__more__actions__buttons-save'}>Save</Button>
                            <Button variant='contained' className={'details__info__more__actions__buttons-buy'}>Buy</Button>
                        </div>
                    </div>

                    <div className="details__info__more__description">
                        {this.state.product['product_description']}
                    </div>
                </div>
            </div>
          </div>

          <div className="similar_products">
              <div className="similar_products__title">Similar Products</div>
          </div>
        </div>
    );
  }
}

export default ProductDetails