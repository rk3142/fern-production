import React  from 'react';
import { Card, CardContent } from "@mui/material";

import './SimilarItemCard.css'
import co2_icon from "../assets/CO2.png";
import h2o_icon from "../assets/h2o_icon.png";
import energy_icon from "../assets/energy_icon.jpeg";
import StarRatings from "react-star-ratings";
import { useHistory } from "react-router-dom";
import LinesEllipsis from "react-lines-ellipsis";

function SimilarItemCard({ item }) {
    const { product_name,
        image_url,
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
            <CardContent onClick={goToDetails} className={'similar_card'}>
                <div className="similar_card__header">
                    <div className="similar_card__header__name">
                        <LinesEllipsis
                            text={product_name}
                            maxLine='2'
                            ellipsis='...'
                            trimRight
                            basedOn='words'
                        />
                    </div>
                    <div className="similar_card__header__price">${prices[0]["price"]}</div>
                </div>
                <div className="similar_card__body">
                    <div className="similar_card__body__image">
                        <img className="similar_card__body__image__img" src={image_url} alt={product_name} />
                    </div>

                    <div className="similar_card__body__details">
                        <div className="similar_card__body__details__rating">
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

                        <div className="similar_card__body__details__eco_status">
                                <div className="similar_card__body__details__eco_status__stats">
                                    <img className="EcoStatsIcon" src={co2_icon} alt='CO2 icon' />
                                    <p className="EcoStatsText">{carbon} kg of carbon</p>
                                </div>
                                <div className="similar_card__body__details__eco_status__stats">
                                    <img className="EcoStatsIcon" src={h2o_icon} alt='H2O icon' />
                                    <p className="EcoStatsText">{water}k Liters of water</p>
                                </div>
                                <div className="similar_card__body__details__eco_status__stats">
                                    <img className="EcoStatsIcon" src={energy_icon} alt='Electricity icon' />
                                    <p className="EcoStatsText">{energy} kWh of energy</p>
                                </div>
                            </div>
                        </div>
                    </div>
            </CardContent>
        </Card>
    );
}

export default SimilarItemCard;