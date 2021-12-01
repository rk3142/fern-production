import React from 'react';
import {useHistory, useLocation} from "react-router-dom";
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import {useDispatch, useSelector} from "react-redux";
import {selectProducts, setSearchWord} from "../reducers/catalogSlice";

function SearchBar() {
    const dispatch = useDispatch();
    let history = useHistory()
    let location = useLocation()
    const searchWord = useSelector(selectProducts).searchWord

    const submitSearch = event => {
        event.preventDefault()
        dispatch(setSearchWord({searchWord: searchWord, isSearch: true}))

        if (location['pathname'] !== '/catalog') history.push('/catalog')
    }

    const setSearchTerm = searchTerm => {
        dispatch(setSearchWord({searchWord: searchTerm, isSearch: false}))
    }

    return (
        <Paper
            component="form"
            onSubmit={submitSearch}
            sx={{ p: '2px 6px', display: 'flex', alignItems: 'center', width: 400, borderRadius: '1rem' }}
        >
            <InputBase
                sx={{ ml: 2, flex: 1 }}
                placeholder={"Search"}
                inputProps={{ 'aria-label': 'search fern' }}
                onChange={e => setSearchTerm(e.target.value)}
                value={searchWord}
            />
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                <SearchIcon sx={{color: '#43AC3A'}} />
            </IconButton>
        </Paper>
    );
}

export default SearchBar;