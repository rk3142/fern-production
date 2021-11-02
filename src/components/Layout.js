import React from 'react';
import SearchBar from "./SearchBar";

function Layout({children, authenticated=false}) {
    return (
        <>
            <div>
                <div>Fern</div>
                {console.log(authenticated)}
                {
                    authenticated ? (
                        <SearchBar />
                    ) : (
                        <button>Login</button>
                    )
                }
            </div>

            <main>{children}</main>
        </>
    );
}

export default Layout;