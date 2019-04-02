import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Routes from './Router';

import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(<Routes />, document.getElementById("root"));
registerServiceWorker();

