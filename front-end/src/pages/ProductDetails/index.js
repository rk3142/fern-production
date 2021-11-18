import React, {useEffect} from "react";
import StarRatings from "react-star-ratings";
import co2_icon from '../../assets/CO2.png'
import h2o_icon from '../../assets/h2o_icon.png'
import energy_icon from '../../assets/energy_icon.jpeg'
import './ProductDetails.css';
import SimilarItemCard from "../../components/SimilarItemCard";
import { useDispatch, useSelector } from "react-redux";
import {getAllCatalog, selectProducts} from "../../reducers/catalogSlice";
import { Button, CircularProgress } from "@mui/material";
import { useState } from "react";
import {addSaved, addSavedItem, removeSaved, removeSavedItem, selectSaved} from "../../reducers/savedSlice";
import _ from "lodash";
import {getProductById} from "../../api";

const goToLink = (link) => {
    window.location.href = link
    return null
}

function ProductDetails() { 
    const dispatch = useDispatch();
    const [product, setProduct] = useState(JSON.parse(localStorage.getItem('recently_clicked')))
    const [similarProducts, setSimilarProducts] = useState([])
    const [isSaved, setIsSaved] = useState(false)
    const items = useSelector(selectProducts).products
    const status = useSelector(selectProducts).status
    const savedItems = useSelector(selectSaved)

    useEffect(() => {
        // FIXME
        dispatch(getAllCatalog())
        setSimilarProducts(getSimilarProducts())
    }, [])

    useEffect( () => {
        getProductById(product['product_id']).then(res => setIsSaved(res['is_bookmarked']))
    }, [product])

    const getSimilarProducts = () => {
        let similar_items = []
        for(var i in items) {
            if(product["product_id"] !== items[i]["product_id"] && product["brand"] === items[i]["brand"]) {
                similar_items.push(items[i])
            }
        }
        return similar_items;
    }

    const saveItem = item => {
        dispatch(addSaved(item))
        dispatch(addSavedItem(item['product_id']))
        setIsSaved(true)
    }

    const removeItem = item => {
        dispatch(removeSaved(item))
        dispatch(removeSavedItem(item['product_id']))
        setIsSaved(false)
    }

    return (
        <div className='details_page'>
            <div className="details">
                <img className="details__image" src={product['image_url']} alt={product['product_name']} />

                <div className="details__info">
                    <h1 className="details__info__name">{product['product_name']}</h1>

                    <div className="details__info__body">
                        <img className="EcoDetsIcon" src={co2_icon} alt='CO2 icon' />
                        <p className="EcoDetsText">{product['carbon']}kg of carbon released into the atmosphere</p>
                        <img className="EcoDetsIcon" src={h2o_icon} alt='H2O icon' />
                        <p className="EcoDetsText">{product['water']}k liters of water used in manufacturing</p>
                        <img className="EcoDetsIcon" src={energy_icon} alt='Electricity icon' />
                        <p className="EcoDetsText">{product['energy']}kWh of energy used in production</p>
                    </div>

                    <div className="details__info__more">
                        <div className="details__info__more__actions">
                            <div className="details__info__more__actions__ratings">
                                <div className="details__info__more__actions__ratings__stars">
                                    {`${product['rating']}/5.0`}
                                    <StarRatings
                                        rating={product['rating']}
                                        starRatedColor="#FFDC61"
                                        numberOfStars={5}
                                        name='rating'
                                        starDimension="15"
                                        starSpacing="5"
                                    />
                                </div>

                                {`${product['ratings']} ratings `}

                                <div className="details__info__more__actions__ratings__stars__source">
                                    (Amazon)
                                </div>
                            </div>

                            <div className="details__info__more__actions__price">
                                {`$${product['prices'][0]['price']}`}
                            </div>

                            <div className="details__info__more__actions__buttons">
                                {
                                    isSaved ? (
                                        <Button variant='contained'
                                            className={'details__info__more__actions__buttons-unsave'}
                                            onClick={() => removeItem(product)}
                                        >
                                            Unsave
                                        </Button>
                                    ) : (
                                        <Button variant='contained'
                                            className={'details__info__more__actions__buttons-save'}
                                            onClick={() => saveItem(product)}
                                        >
                                            Save
                                        </Button>
                                    )
                                }

                                <Button variant='contained'
                                    className={'details__info__more__actions__buttons-buy'}
                                    onClick={() => goToLink(product['link'])}
                                >
                                    Buy
                                </Button>
                            </div>
                        </div>

                        <div className="details__info__more__description">
                            {product['product_description']}
                        </div>
                    </div>
                </div>
            </div>

            <div className="similar_products">
                <div className="similar_products__title">Similar Products</div>
                <div className={'similar_catalog__list'}>
                {
                    status === 'success' ?
                        similarProducts.map(item => <SimilarItemCard item={item} key={item.product_id} />)
                        : <CircularProgress />
                }
            </div>
            </div>
        </div>
    );
}

export default ProductDetails