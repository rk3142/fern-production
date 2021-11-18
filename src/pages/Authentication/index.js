import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { startFirebaseUI } from '../../common/firebaseUtils'
import 'firebaseui/dist/firebaseui.css'
import './authentication.css'
import {authenticateAccess} from "../../common/utils";


function Authentication() {
    let history = useHistory();

    useEffect(() => {
        startFirebaseUI('#firebaseui')
    }, [])

    useEffect(() => authenticateAccess(history, '/catalog'), []);

    return (
        <div className={'authentication'}>
            <div className="authentication__card">
                <div className='authentication__text'>Sign In / Sign Up</div>
                <div id="firebaseui"></div>
            </div>
        </div>
    )
}
export default Authentication;