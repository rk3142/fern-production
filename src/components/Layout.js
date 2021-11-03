import React from 'react';
import SearchBar from "./SearchBar";
import {useHistory} from "react-router-dom";
import './Layout.css'
import logo from '../assets/logo.png'
import {signIn} from "../api";

function Layout({children, authenticated=false}) {
    let history = useHistory()

    const onClick = () => {
        const accessToken = localStorage.getItem("auth_token");
        if (accessToken != null) signIn()
        history.push("/auth")
    }

    return (
        <div className={'page'}>
            <div className="page__header">
                <div className={'page__header__logo'}>
                    <img className={'page__header__logo__img'} src={logo} alt={'logo'}></img>
                    <div className={'page__header__logo__text'}>Fern</div>
                </div>
                {
                    authenticated ? (
                        <SearchBar />
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