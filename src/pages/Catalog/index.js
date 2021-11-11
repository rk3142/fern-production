import React, { Component } from "react";
import StarRatings from "react-star-ratings";
import axios from "axios"
import co2_icon from '../../assets/CO2.png'
import h2o_icon from '../../assets/h2o_icon.png'
import energy_icon from '../../assets/energy_icon.jpeg'
import cart_icon from '../../assets/cart_icon.png'
import remove_cart_icon from '../../assets/remove_cart_icon.png'
import './Catalog.css';
import SideBar from "../../components/SideBar";
import ItemCard from "../../components/ItemCard";
import filters from '../../filters.json'

export default class Catalog extends Component {

    // const [searchCriteria, setSearchCriteria] = useState([]);

    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            cart: [],
            search: '',
            items_col1: [],
            items_col2: [],
            items_col3: [],
            allItems:[],
            isPrice1: false,
            isPrice2: false,
            isPrice3: false,
            isPrice4: false,
            isRating1: false,
            isRating2: false,
            isRating3: false
        };
    }

    async componentDidMount() {
        await this.getAllProducts();
        this.updateColumns(this.state.allItems)
    }

    async getAllProducts() {
        await axios.get("https://fern-development.herokuapp.com/products")
        .then(response => {
            console.log(response)
            this.setState({allItems: response["data"]["products"]})
        }).catch(error => {
            console.log(error)
            alert("Error getting data please try again")
        });;
    }

    goToDetails = async (item) => {
        await localStorage.setItem('recently_clicked', JSON.stringify(item))
        this.props.history.push("/productdetails");
    }

    updateColumns = async (items) => {
        var items1 = []
        var items2 = []
        var items3 = []
        await this.setState({
            items_col1: [],
            items_col2: [],
            items_col3: []
        })
        for (var i in items) {
            if (i % 3 == 0) {
                items1.push(items[i])
            } else if (i % 3 == 1) {
                items2.push(items[i])
            } else {
                items3.push(items[i])
            }
        }
        await this.setState({
            items_col1: items1,
            items_col2: items2,
            items_col3: items3
        })
        /*console.log(this.state.items_col1)
        console.log(this.state.items_col2)
        console.log(this.state.items_col3)*/
    }

    updateSearchQuery = async (query) => {
        await this.setState({ search: query.target.value })
        console.log(query.target.value + "|")
        if (this.state.search == '') {
            this.handleSearch('')
        }
    }

    submitSearchQuery = () => {
        this.setState({ search: "" })
    }

    truncateString = (string) => {
        var maxLength = 60
        if(string == null) {
            return ""
        }
        var trimmedString = string.substr(0, maxLength);
        trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")))
        return trimmedString + " . . . "
    }

    truncateRatings = (rating) => {
        let rate = parseInt(rating)
        if(rate > 1000) {
            return Math.round(rate/1000).toString() + "k"
        }
        return rating
    }

    handleCheckPrice = async (start) => {
        var allItems = await this.getAllProducts()
        if (start == 0) {
            await this.setState({ isPrice1: !this.state.isPrice1 })
        } else if (start == 10) {
            await this.setState({ isPrice2: !this.state.isPrice2 })
        } else if (start == 15) {
            await this.setState({ isPrice3: !this.state.isPrice3 })
        } else if (start == 20) {
            await this.setState({ isPrice4: !this.state.isPrice4 })
        }
        this.updateByPrice(allItems)
    }

    updateByPrice = async (allItems) => {
        if (!this.state.isPrice1 && !this.state.isPrice2 && !this.state.isPrice3 && !this.state.isPrice4) {
            await this.updateColumns(allItems)
            return allItems
        }
        var filteredItems = []
        if (this.state.isPrice1) {
            for (var i in allItems) {
                if (allItems[i]["prices"][0]["price"] < 10.00) {
                    filteredItems.push(allItems[i])
                }
            }
        }
        if (this.state.isPrice2) {
            for (var i in allItems) {
                if (allItems[i]["prices"][0]["price"] >= 10.0 && allItems[i]["prices"][0]["price"] < 15.0) {
                    filteredItems.push(allItems[i])
                }
            }
        }
        if (this.state.isPrice3) {
            for (var i in allItems) {
                if (allItems[i]["prices"][0]["price"] >= 15.0 && allItems[i]["prices"][0]["price"] < 20.0) {
                    filteredItems.push(allItems[i])
                }
            }
        }
        if (this.state.isPrice4) {
            for (var i in allItems) {
                if (allItems[i]["prices"][0]["price"] >= 20.0) {
                    filteredItems.push(allItems[i])
                }
            }
        }
        await this.updateColumns(filteredItems);
        return filteredItems
    }

    handleCheckRating = async (start) => {
        var allItemsOld = await this.getAllProducts()
        var allItems = await this.updateByPrice(allItemsOld)
        console.log(allItems)
        if (start == 2) {
            this.setState({ isRating1: !this.state.isRating1 })
        } else if (start == 3) {
            this.setState({ isRating2: !this.state.isRating2 })
        } else if (start == 4) {
            this.setState({ isRating3: !this.state.isRating3 })
        }
        if (!this.state.isRating1 && !this.state.isRating2 && !this.state.isRating3) {
            return this.updateColumns(allItems)
        }
        var filteredItems = []
        if (this.state.isRating1) {
            for (var i in allItems) {
                if (allItems[i]["rating"] > 2.00) {
                    filteredItems.push(allItems[i])
                }
            }
        }
        if (this.state.isRating2) {
            for (var i in allItems) {
                if (allItems[i]["rating"] > 3.00) {
                    filteredItems.push(allItems[i])
                }
            }
        }
        if (this.state.isRating3) {
            for (var i in allItems) {
                if (allItems[i]["rating"] > 4.00) {
                    filteredItems.push(allItems[i])
                }
            }
        }
        await this.updateColumns(filteredItems);
    }

    handleSearch = async (query) => {
        //console.log(query)
        var allItems = await this.getAllProducts()
        var filteredItems = []
        for (var i in allItems) {
            if (allItems[i]["product_name"].includes(query)) {
                filteredItems.push(allItems[i])
            }
        }
        return this.updateColumns(filteredItems);
    }

    addToCart = async (product_id) => {
        var cart = [...this.state.cart]
        console.log(cart.includes(product_id))
        if(cart.includes(product_id)) {
            cart.splice(cart.indexOf(product_id), 1)
        } else {
            cart.push(product_id)
        }
        this.setState({cart: cart})
    }

    renderButton = (product_id) => {
        if(this.state.cart.includes(product_id)) {
            return (<img className="CartIcon" src={remove_cart_icon} onClick={() => this.addToCart(product_id)}/>)
        } else {
            return (<img className="CartIcon" src={cart_icon} onClick={() => this.addToCart(product_id)}/>)
        }
    }

    renderColumn = (data) => {
        return (
            <ul>
                {data.map(({ product_id, product_name, image_url, link, prices, rating, ratings, product_description, carbon, water, energy }) => (
                    <div className="Item">
                        <ul className="ProductName" key={product_id}><a className="ProductName" href={link}>{product_name}</a></ul>
                        <div className="ProductEcoStats" onClick={() => {this.goToDetails([product_id, product_name, image_url, link, prices, rating, ratings, product_description, carbon, water, energy ])}}>
                        <img className="EcoStatsIcon" src={co2_icon} />
                            <p className="EcoStatsText">{carbon} kg</p>
                            <img className="EcoStatsIcon" src={h2o_icon} />
                            <p className="EcoStatsText">{water}k Liters</p>
                            <img className="EcoStatsIcon" src={energy_icon} />
                            <p className="EcoStatsText">{energy} kWh</p>
                        </div>
                        <img className="ProductImage" src={image_url} onClick={() => {this.goToDetails([product_id, product_name, image_url, link, prices, rating, ratings, product_description, carbon, water, energy ])}}/>
                        <div className="ProductBody" onClick={() => {this.goToDetails([product_id, product_name, image_url, link, prices, rating, ratings, product_description, carbon, water, energy ])}}>
                            <ul className="ProductPrice" key={product_id}>${prices[0]["price"]}</ul>
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
                            <ul className="ProductRatings" key={product_id}>({this.truncateRatings(ratings)})</ul>
                        </div>
                        <div className="ProductFooter">
                            <ul className="ProductDescription" key={product_id} onClick={() => {this.goToDetails([product_id, product_name, image_url, link, prices, rating, ratings, product_description, carbon, water, energy ])}}>{this.truncateString(product_description)}</ul>
                            {this.renderButton(product_id)}
                        </div>
                    </div>
                ))}
            </ul>
        )
    }

    render() {
        return (
            <>
                <SideBar filters={filters} />
                <div className={'catalog__list'}>
                    {
                        this.state.items_col1.map(item => <ItemCard item={item} />)
                    }
                </div>
            </>
            // <div className="App">
            //     {/*<div className="Header">*/}
            //     {/*    <div className="CartCountContainer">*/}
            //     {/*        <div className="CartCount">*/}
            //     {/*            <p className="CartCountText">{this.state.cart.length}</p>*/}
            //     {/*            <p className="CartCountText2"> IN CART</p>*/}
            //     {/*        </div>*/}
            //     {/*    </div>*/}
            //     {/*</div>*/}
            //
            //
            //     <div className="PageBody">
            //
            //         <div className="ItemsContainer">
            //             {this.renderColumn(this.state.items_col1)}
            //             {this.renderColumn(this.state.items_col2)}
            //             {this.renderColumn(this.state.items_col3)}
            //         </div>
            //     </div>
            // </div>
        );
    }
}