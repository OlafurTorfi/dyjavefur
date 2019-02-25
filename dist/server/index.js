"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var path = require("path");
// import { } from './components/'
var app = express();
app.use(express.static(path.join(__dirname, "../dist"), { maxAge: 31557600000 }));
app.get("/", function (req, res) { return res.send("Hello World!"); });
app.listen(3000, function () { return console.log("Example app listening on port 3000!"); });
//# sourceMappingURL=index.js.map