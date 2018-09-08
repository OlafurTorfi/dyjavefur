import * as React from "react";
import * as ReactDOM from "react-dom";
import Section from "./Section";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Section title="testtitle" />, div);
  ReactDOM.unmountComponentAtNode(div);
});
