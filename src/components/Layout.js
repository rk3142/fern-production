import React, {useEffect} from 'react';
import SearchBar from "./SearchBar";
import {useHistory} from "react-router-dom";
import './Layout.css'
import logo from '../assets/logo.png'
import {authenticateAccess} from "../common/utils";
import UserActions from "./UserActions";

function Layout({children, authenticated=false}) {
    let history = useHistory()

    useEffect(() => authenticated && authenticateAccess(history, '/catalog'), [])

    const onClick = () => authenticateAccess(history, '/catalog')

    return (
        <div className={'page'}>
            <div className="page__header">
                <div className={'page__header__logo'} onClick={onClick} role='button'>
                    <img className={'page__header__logo__img'} src={logo} alt={'logo'} />
                    <div className={'page__header__logo__text'}>Fern</div>
                </div>
                {
                    authenticated ? (
                        <>
                            <SearchBar />
                            <UserActions />
                        </>
                    ) : (
                        <button className={'login_btn'} onClick={onClick}>Login</button>
                    )
                }
            </div>

            <main className={'page__content'}>{children}</main>
        </div>
    );
}

export default Layout;