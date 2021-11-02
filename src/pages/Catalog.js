import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Navigation } from 'react-minimal-side-navigation';
import { AiOutlineMenu } from "react-icons/ai";
import StarRatings from "react-star-ratings";

import logo from '../assets/logo.png'
import fern_text from '../assets/fern_text.png'
import search_icon from '../assets/search_icon.png'
import co2_icon from '../assets/CO2.png'
import apiMock from "./ApiMock";
import './Catalog.css';

export default class Catalog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            cart_count: 0,
            search: '',
            items: [],
            items_col1: [],
            items_col2: [],
            items_col3: []
        };
    }

    componentDidMount() {
        var items = apiMock();
        var items1 = []
        var items2 = []
        var items3 = []
        for (var i in items) {
            if (i % 3 == 0) {
                items1.push(items[i])
            } else if (i % 3 == 1) {
                items2.push(items[i])
            } else {
                items3.push(items[i])
            }
        }
        this.setState({
            items_col1: items1,
            items_col2: items2,
            items_col3: items3
        })
    }

    handleLogIn() {
        this.props.history.push("/productdetails");
    }

    updateSearchQuery = (query) => {
        this.setState({ search: query.target.value })
    }

    submitSearchQuery = () => {
        this.setState({ search: "" })
    }

    truncateString = (string) => {
        var maxLength = 60
        var trimmedString = string.substr(0, maxLength);
        trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")))
        return trimmedString + " . . . "
    }

    render() {
        return (
            <div className="App">
                <div className="Header">
                    <img className="Logo" src={logo} />
                    <img className="Fern" src={fern_text} />
                    <div className="SearchBar">
                        <input className="SearchBar"
                            value={this.state.search}
                            onChange={(query) => { this.updateSearchQuery(query) }}
                            type="search"
                        />
                        <div className="SearchButton" onClick={() => this.submitSearchQuery()}>
                            <img className="SearchIcon" src={search_icon} />
                        </div>
                    </div>

                    <div className="CartCountContainer">
                        <div className="CartCount">
                            <p className="CartCountText">{this.state.cart_count}</p>
                            <p className="CartCountText2"> IN CART</p>
                        </div>
                    </div>
                </div>
                <div className="ItemsContainer">
                    <ul>
                        {this.state.items_col1.map(({ product_id, product_name, image_url, prices, rating, ratings, product_description }) => (
                            <div className="Item">
                                <ul className="ProductName" key={product_id}>{product_name}</ul>
                                <div className="ProductEcoStats">
                                    <img className="EcoStatsIcon" src={co2_icon} />
                                </div>
                                <img className="ProductImage" src={image_url} />
                                <div className="ProductBody">
                                    <ul className="ProductPrice" key={product_id}>{prices[0]["price"]}</ul>
                                    <ul className="ProductSource" key={product_id}>Amazon</ul>
                                    <ul className="ProductRatingText" key={product_id}>{rating}</ul>
                                    <ul className="ProductRating" key={product_id}>
                                        <StarRatings
                                            rating={rating}
                                            starRatedColor="#FFDC61"
                                            numberOfStars={5}
                                            name='rating'
                                            starDimension="15"
                                            starSpacing="5"
                                        />
                                    </ul>
                                    <ul className="ProductRatings" key={product_id}>({ratings})</ul>
                                </div>
                                <ul className="ProductDescription" key={product_id}>{this.truncateString(product_description)}</ul>
                            </div>
                        ))}
                    </ul>
                    <ul>
                        {this.state.items_col2.map(({ product_id, product_name, image_url, prices, rating, ratings, product_description }) => (
                            <div className="Item">
                                <ul className="ProductName" key={product_id}>{product_name}</ul>
                                <img className="ProductImage" src={image_url} />
                                <div className="ProductBody">
                                    <ul className="ProductPrice" key={product_id}>{prices[0]["price"]}</ul>
                                    <ul className="ProductSource" key={product_id}>Amazon</ul>
                                    <ul className="ProductRatingText" key={product_id}>{rating}</ul>
                                    <ul className="ProductRating" key={product_id}>
                                        <StarRatings
                                            rating={rating}
                                            starRatedColor="#FFDC61"
                                            numberOfStars={5}
                                            name='rating'
                                            starDimension="15"
                                            starSpacing="5"
                                        />
                                    </ul>
                                    <ul className="ProductRatings" key={product_id}>({ratings})</ul>
                                </div>
                                <ul className="ProductDescription" key={product_id}>{this.truncateString(product_description)}</ul>
                            </div>
                        ))}
                    </ul>
                    <ul>
                        {this.state.items_col3.map(({ product_id, product_name, image_url, prices, rating, ratings, product_description }) => (
                            <div className="Item">
                                <ul className="ProductName" key={product_id}>{product_name}</ul>
                                <img className="ProductImage" src={image_url} />
                                <div className="ProductBody">
                                    <ul className="ProductPrice" key={product_id}>{prices[0]["price"]}</ul>
                                    <ul className="ProductSource" key={product_id}>Amazon</ul>
                                    <ul className="ProductRatingText" key={product_id}>{rating}</ul>
                                    <ul className="ProductRating" key={product_id}>
                                        <StarRatings
                                            rating={rating}
                                            starRatedColor="#FFDC61"
                                            numberOfStars={5}
                                            name='rating'
                                            starDimension="15"
                                            starSpacing="5"
                                        />
                                    </ul>
                                    <ul className="ProductRatings" key={product_id}>({ratings})</ul>
                                </div>
                                <ul className="ProductDescription" key={product_id}>{this.truncateString(product_description)}</ul>
                            </div>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
}