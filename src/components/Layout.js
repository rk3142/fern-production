import React from 'react';
import SearchBar from "./SearchBar";
import {useHistory} from "react-router-dom";

function Layout({children, authenticated=false}) {
    let history = useHistory()

    const onClick = () => {
        history.push("/auth")
    }

    return (
        <>
            <div>
                <div>Fern</div>
                {
                    authenticated ? (
                        <SearchBar />
                    ) : (
                        <button onClick={onClick}>Login</button>
                    )
                }
            </div>

            <main>{children}</main>
        </>
    );
}

export default Layout;