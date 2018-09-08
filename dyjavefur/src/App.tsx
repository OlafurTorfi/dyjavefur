import * as React from "react";
import "./App.css";
import Section from "./Section";

import fp from "./FloorPlan.jpg";
import logo from "./logo.svg";

const sectionStyle = {
  backgroundImage: "url(" + { fp } + ")",
  height: "400px",
  width: "100%"
};

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Dýjagata 7</h1>
        </header>
        <div style={sectionStyle}>
          <p>this is some text</p>
          <img src={fp} />
        </div>
        <Section title="First section" />
      </div>
    );
  }
}

export default App;
