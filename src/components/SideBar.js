import React from 'react';
import './SideBar.css'
import SideBarCard from "./SideBarCard";

function SideBar({filters}) {
    return (
        <div className='sidebar'>
            {
                Object.keys(filters).map(filterName =>
                    <SideBarCard
                        key={filterName}
                        title={filterName}
                        filter={filters[filterName]["filter"]}
                    />
                )
            }
        </div>
        // <div className="SideBarContainer">
        //     <div className="FilterCriterion">
        //         <p className="FilterTitle">Price</p>
        //         <div className="CheckBox">
        //             <input
        //                 className="Check"
        //                 id="price0"
        //                 name="Price2"
        //                 type="checkbox"
        //                 checked={this.state.isPrice1}
        //                 onChange={async () => await this.handleCheckPrice(0)} />
        //             <p className="FilterItemText"> Up to $10.00</p>
        //         </div>
        //         <div className="CheckBox">
        //             <input
        //                 className="Check"
        //                 id="price10"
        //                 name="Price2"
        //                 type="checkbox"
        //                 checked={this.state.isPrice2}
        //                 onChange={async () => await this.handleCheckPrice(10)} />
        //             <p className="FilterItemText">$10.00 - $14.99</p>
        //         </div>
        //         <div className="CheckBox">
        //             <input
        //                 className="Check"
        //                 name="Price2"
        //                 id="price15"
        //                 type="checkbox"
        //                 checked={this.state.isPrice3}
        //                 onChange={async () => await this.handleCheckPrice(15)} />
        //             <p className="FilterItemText">$15.00 - $19.99</p>
        //         </div>
        //         <div className="CheckBox">
        //             <input
        //                 className="Check"
        //                 name="Price2"
        //                 id="price20"
        //                 type="checkbox"
        //                 checked={this.state.isPrice4}
        //                 onChange={async () => await this.handleCheckPrice(20)} />
        //             <p className="FilterItemText">$20.00 & above</p>
        //         </div>
        //     </div>
        //     <div className="FilterCriterionRating">
        //         <p className="FilterTitle">Rating</p>
        //         <div className="CheckBox">
        //             <input
        //                 className="Check"
        //                 name="Price2"
        //                 id="rating2"
        //                 type="checkbox"
        //                 checked={this.state.isRating1}
        //                 onChange={async () => await this.handleCheckRating(2)} />
        //             <p className="FilterItemText"> 2 Stars and up</p>
        //         </div>
        //         <div className="CheckBox">
        //             <input
        //                 className="Check"
        //                 name="Price2"
        //                 id="rating3"
        //                 type="checkbox"
        //                 checked={this.state.isRating2}
        //                 onChange={async () => await this.handleCheckRating(3)} />
        //             <p className="FilterItemText">3 Stars and up</p>
        //         </div>
        //         <div className="CheckBox">
        //             <input
        //                 className="Check"
        //                 name="Price2"
        //                 id="rating4"
        //                 type="checkbox"
        //                 checked={this.state.isRating3}
        //                 onChange={async () => await this.handleCheckRating(4)} />
        //             <p className="FilterItemText">4 Stars and up</p>
        //         </div>
        //     </div>
        // </div>
    );
}

export default SideBar;