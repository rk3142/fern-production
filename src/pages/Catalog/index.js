import React, { useEffect, useState } from "react";
import axios from "axios"
import './Catalog.css';
import SideBar from "../../components/SideBar";
import SearchBar from "../../components/SearchBar";
import ItemCard from "../../components/ItemCard";
import filters from '../../filters.json'
import { useDispatch, useSelector } from "react-redux";
import { getAllCatalog, selectProducts, searchProducts, searchQuery } from "../../reducers/catalogSlice";
import { CircularProgress } from "@mui/material";

function Catalog() {
    const dispatch = useDispatch();
    var items = useSelector(selectProducts).filteredProducts
    const status = useSelector(selectProducts).status

    useEffect(async () => {
        dispatch(getAllCatalog())
    }, [])

    return (
        <div>
            <div className={"catalog__main"}>
                <SideBar filters={filters} />
                <div className={'catalog__list'}>
                    {
                        status === 'success' ?
                            (
                                items.map(item => <ItemCard item={item} key={item.product_id} />)
                            ) : (
                                <div className="catalog__list__load">
                                    <CircularProgress />
                                </div>
                            )
                    }
                </div>
            </div>
        </div>
    );
}

export default Catalog;
