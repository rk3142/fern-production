import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { startFirebaseUI } from '../../common/firebaseUtils'
import 'firebaseui/dist/firebaseui.css'


function Authentication() {
    let history = useHistory();

    useEffect(() => {
        startFirebaseUI('#firebaseui')
    }, [])

    useEffect(() => {
        const token = localStorage.getItem("auth_token");
        if (token && token.length > 0) {
            history.push("/catalog");
        }
    }, []);

    return (
        <>
            <div>Sign In</div>
            <div id="firebaseui"></div>
        </>
    )
}
export default Authentication;