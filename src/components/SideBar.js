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
    );
}

export default SideBar;