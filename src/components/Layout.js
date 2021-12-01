import React, {useEffect} from 'react';
import {useHistory, useLocation} from "react-router-dom";
import './Layout.css'
import SearchBar from "./SearchBar";
import logo from '../assets/logo.png'
import {authenticateAccess} from "../common/utils";
import UserActions from "./UserActions";
import {useDispatch} from "react-redux";
import {setSearchWord} from "../reducers/catalogSlice";

function Layout({children, authenticated=false}) {
    let history = useHistory()
    let location = useLocation()
    const dispatch = useDispatch();

    useEffect(() => authenticated && authenticateAccess(history, location['pathname']), [])

    const onClickLogo = () => {
        dispatch(setSearchWord({searchWord: '', isSearch: true}))
        authenticateAccess(history, '/catalog')
    }

    return (
        <div className={'page'}>
            <div className="page__header">
                <div className={'page__header__logo'} onClick={onClickLogo} role='button'>
                    <img className={'page__header__logo__img'} src={logo} alt={'logo'} />
                    <div className={'page__header__logo__text'}>Fern</div>
                </div>
                {
                    authenticated && (
                        <>
                            <SearchBar />
                            <UserActions />
                        </>
                    )
                }
            </div>

            <main className={'page__content'}>{children}</main>
        </div>
    );
}

export default Layout;