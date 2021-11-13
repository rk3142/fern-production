import React, { useState } from 'react';
import { Card, CardActions, CardContent } from "@mui/material";
import NumberFormat from 'react-number-format';
import LinesEllipsis from 'react-lines-ellipsis'
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { LaunchOutlined } from "@mui/icons-material";

import './SimilarItemCard.css'
import co2_icon from "../assets/CO2.png";
import h2o_icon from "../assets/h2o_icon.png";
import energy_icon from "../assets/energy_icon.jpeg";
import StarRatings from "react-star-ratings";
import { useHistory } from "react-router-dom";

function SimilarItemCard({ item }) {
    const [hover, setHover] = useState(false)
    const [saved, setSaved] = useState(false)

    const { product_name,
        image_url,
        link,
        prices,
        rating,
        carbon,
        water,
        energy } = item

    let history = useHistory()

    const goToDetails = async () => {
        localStorage.setItem('recently_clicked', JSON.stringify(item))
        history.push("/productdetails");
        window.location.reload(false);
    }

    return (
        <Card>
            <CardContent onClick={goToDetails} className={'card'}>
                <div className="item__name">{product_name}</div>
                <div className="item__body">
                    <div className="item__eco_status">
                        <div className="EcoStats">
                            <img className="EcoStatsIcon" src={co2_icon} />
                            <p className="EcoStatsText">{carbon} kg</p>
                        </div>
                        <div className="EcoStats">
                            <img className="EcoStatsIcon" src={h2o_icon} />
                            <p className="EcoStatsText">{water}k Liters</p>
                        </div>
                        <div className="EcoStats">
                            <img className="EcoStatsIcon" src={energy_icon} />
                            <p className="EcoStatsText">{energy} kWh</p>
                        </div>s
                    </div>

                    <div className="product_image">
                        <img className="product_image__img" src={image_url} />
                    </div>
                </div>

                <div className="product_details">
                    <div className="product_details__price_seller">
                        <div className="ProductPrice">${prices[0]["price"]}</div>
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
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export default SimilarItemCard;