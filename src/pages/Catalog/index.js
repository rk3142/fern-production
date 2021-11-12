import React, {useEffect} from "react";
import './Catalog.css';
import SideBar from "../../components/SideBar";
import ItemCard from "../../components/ItemCard";
import filters from '../../filters.json'
import {useDispatch, useSelector} from "react-redux";
import {getAllCatalog, selectProducts} from "../../reducers/catalogSlice";
import {CircularProgress} from "@mui/material";

function Catalog() {
    const dispatch = useDispatch();
    const items = useSelector(selectProducts).filteredProducts
    const status = useSelector(selectProducts).status

    useEffect(() => {
        dispatch(getAllCatalog())
    }, [])

    return (
        <>
            <SideBar filters={filters} />
            <div className={'catalog__list'}>
                {
                    status === 'success' ?
                        items.map(item => <ItemCard item={item} key={item.product_id} />)
                        : <CircularProgress />
                }
            </div>
        </>
    );
}

export default Catalog;
