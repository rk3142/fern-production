import React, { Component } from "react";
import './App.css';

export default class App extends Component {
  render() {
    return (
        <>
          <div className="entry-text">
              <div className="entry-text__block">Feeling <span className="entry-text__block--blue">Blue</span>?</div>
              <div className="entry-text__block">Go <span className="entry-text__block--green">GREEN</span></div>
          </div>
        </>
    );
  }
}