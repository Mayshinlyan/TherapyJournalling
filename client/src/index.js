import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Routes from './Router';
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(<Routes />, document.getElementById("root"));
registerServiceWorker();

