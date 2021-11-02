import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Navigation } from 'react-minimal-side-navigation';
import { AiOutlineMenu } from "react-icons/ai";

import logo from '../assets/logo.png'
import fern_text from '../assets/fern_text.png'
import search_icon from '../assets/search_icon.png'
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import './Catalog.css';

export default class Catalog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            cart_count: 0,
            search: ''
        };
    }

    handleLogIn() {
        this.props.history.push("/productdetails");
    }

    updateSearchQuery = (query) => {
        this.setState({search: query.target.value})
    }

    submitSearchQuery = () => {
        this.setState({search: ""})
    }

    render() {
        return (
            <div className="App">
                <div className="Header">
                    <img className="Logo" src={logo} />
                    <img className="Fern" src={fern_text} />
                    <div className="SearchBar">
                        <input className = "SearchBar" 
                            value={this.state.search} 
                            onChange={(query) => {this.updateSearchQuery(query)}} 
                            type="search"
                        />
                        <div className = "SearchButton" onClick = {() => this.submitSearchQuery()}>
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
            </div>
        );
    }
}