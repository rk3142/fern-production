import React from 'react';
import {useSelector} from "react-redux";
import {selectSaved} from "../../reducers/savedSlice";
import ItemCard from "../../components/ItemCard";
import './Saved.css'

function Saved(props) {
    const saved = useSelector(selectSaved)

    return (
        <div className="saved__list">
            {
                saved.length > 0 ? (
                    saved.map(savedItem => <ItemCard item={savedItem} key={savedItem.product_id}/>)
                ) : (
                    <div className='saved__list__empty'>Nothing saved yet...</div>
                )
            }
        </div>
    );
}

export default Saved;