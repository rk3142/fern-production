import React from 'react';
import {Card, CardActions, CardContent} from "@mui/material";
import NumberFormat from 'react-number-format';
import LinesEllipsis from 'react-lines-ellipsis'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

import './ItemCard.css'
import co2_icon from "../assets/CO2.png";
import h2o_icon from "../assets/h2o_icon.png";
import energy_icon from "../assets/energy_icon.jpeg";
import StarRatings from "react-star-ratings";
import {useHistory} from "react-router-dom";

function ItemCard({item}) {
    const { product_id,
            product_name,
            image_url,
            link,
            prices,
            rating,
            ratings,
            product_description,
            carbon,
            water,
            energy } = item

    let history = useHistory()

    const goToDetails = async () => {
        localStorage.setItem('recently_clicked', JSON.stringify(item))
        history.push("/productdetails");
    }

    return (
        <Card>
            <CardContent onClick={goToDetails}>
                <div className="item__name">{product_name}</div>

                <div className="item__eco_status">
                    <img className="EcoStatsIcon" src={co2_icon} />
                    <p className="EcoStatsText">{carbon} kg</p>
                    <img className="EcoStatsIcon" src={h2o_icon} />
                    <p className="EcoStatsText">{water}k Liters</p>
                    <img className="EcoStatsIcon" src={energy_icon} />
                    <p className="EcoStatsText">{energy} kWh</p>
                </div>

                <div className="product_image">
                    <img className="product_image__img" src={image_url} />
                </div>

                <div className="product_details">
                    <div className="product_details__price_seller">
                        <div className="ProductPrice">${prices[0]["price"]}</div>
                        <div className="ProductSource">Amazon</div>
                    </div>

                    <div className="product_details__ratings">
                        <div className="ProductRatingText">{rating}</div>
                        <div className="ProductRating">
                            <StarRatings
                                rating={rating}
                                starRatedColor="#FFDC61"
                                numberOfStars={5}
                                name='rating'
                                starDimension="15"
                                starSpacing="5"
                            />
                        </div>
                        {/*<div className="ProductRatings"></div>*/}
                        <NumberFormat value={ratings}
                                      className="ProductRatings"
                                      displayType={'text'}
                                      thousandSeparator={true}
                                      renderText={(value, props) => <div {...props}>({value})</div>}
                        />
                    </div>
                </div>
            </CardContent>

            <CardActions style={{padding: '0 16px 16px 16px', display: 'flex', alignItems: 'flex-end'}}>
                <div className="product_description">
                    <LinesEllipsis
                        text={product_description || ''}
                        maxLine='3'
                        ellipsis='...'
                        trimRight
                        basedOn='words'
                    />
                </div>
                <div className="product_action">
                    <BookmarkBorderIcon style={{marginRight: '0.6rem'}} onClick={() => console.log('bookmark')} />
                    <AddShoppingCartIcon />
                </div>
            </CardActions>
        </Card>
    );
}

export default ItemCard;