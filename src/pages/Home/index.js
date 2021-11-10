import React from 'react';
import './Home.css'
import {signIn} from "../../api";
import {useHistory} from "react-router-dom";

function Home() {
    let history = useHistory()

    const onClick = () => {
        const accessToken = localStorage.getItem("auth_token");
        if (accessToken != null) signIn()
        history.push("/auth")
    }

    return (
        <>
          <div className="entry-text">
              <div className="entry-text__block">Feeling <span className="entry-text__block--blue">Blue</span>?</div>
              <div className="entry-text__block">Go <span className="entry-text__block--green">GREEN</span></div>
              <button className="entry-text__btn">Sign Up</button>
          </div>
        </>
    );
}

export default Home;