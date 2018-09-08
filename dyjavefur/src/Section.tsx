import * as React from "react";
import "./Section.css";

import logo from "./RayTrace.jpg";

export interface IProps {
  title: string;
}

class Section extends React.Component<IProps, object> {
  public render() {
    return (
      <div className="Section">
        <img src={logo} className="App-logo" alt="logo" />
        <p className="Section-header">{this.props.title}</p>
      </div>
    );
  }
}

export default Section;
