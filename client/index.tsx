import * as React from "react";
import * as ReactDOM from "react-dom";

import { Door } from "./components/Door";

ReactDOM.render(
    <Door compiler="TypeScript" framework="React" />,
    document.getElementById("example")
);