import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import $ from 'jquery';
import Popper from 'popper.js';
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Routes from './Router';

import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(<Routes />, document.getElementById("root"));
registerServiceWorker();

