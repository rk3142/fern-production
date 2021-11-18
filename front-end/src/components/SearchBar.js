// import React, {useState} from 'react';
// import Paper from '@mui/material/Paper';
// import InputBase from '@mui/material/InputBase';
// import Divider from '@mui/material/Divider';
// import IconButton from '@mui/material/IconButton';
// import SearchIcon from '@mui/icons-material/Search';
// import {useDispatch} from "react-redux";
//
// function SearchBar(props) {
//     // const dispatch = useDispatch();
//     const [searchTerm, setSearchTerm] = useState('')
//
//
//     const submitSearch = event => {
//         event.preventDefault()
//         // props.goToCatalog(searchTerm)
//         setSearchTerm(event.target.value)
//     }
//
//     return (
//         <Paper
//             component="form"
//             onSubmit={submitSearch}
//             sx={{ p: '2px 6px', display: 'flex', alignItems: 'center', width: 400, borderRadius: '1rem' }}
//         >
//             <InputBase
//                 sx={{ ml: 2, flex: 1 }}
//                 placeholder="Search"
//                 inputProps={{ 'aria-label': 'search fern' }}
//                 onChange={e => setSearchTerm(e.target.value)}
//                 value={searchTerm}
//             />
//             <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
//             <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
//                 <SearchIcon sx={{color: '#43AC3A'}} />
//             </IconButton>
//         </Paper>
//     );
// }
//
// export default SearchBar;