import React from 'react';
import './Home.css'
import {useHistory} from "react-router-dom";
import {authenticateAccess} from "../../common/utils";

function Home() {
    let history = useHistory()

    const signIn = () => authenticateAccess(history, "/catalog")

    return (
        <>
          <div className="entry-text">
              <div className="entry-text__block">Feeling <span className="entry-text__block--blue">Blue</span>?</div>
              <div className="entry-text__block">Go <span className="entry-text__block--green">GREEN</span></div>
              <button className="entry-text__btn" onClick={signIn}>Log In</button>
          </div>
        </>
    );
}

export default Home;