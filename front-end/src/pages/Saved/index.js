import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getAllSavedItem, selectSaved} from "../../reducers/savedSlice";
import ItemCard from "../../components/ItemCard";
import './Saved.css'

function Saved(props) {
    const dispatch = useDispatch()
    const saved = useSelector(selectSaved)

    useEffect(() => {
        dispatch(getAllSavedItem())
    }, [])

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