
import "./core/scss/home.scss";
import 'react-toastify/dist/ReactToastify.css';

import React from 'react';
import ReactDOM from 'react-dom';
import Amplify from "aws-amplify";
import awsExports from "./aws-exports";
import "./i18n";
import AppInit from "./init";

Amplify.configure(awsExports);

const el = document.createElement("div");
document.body.appendChild(el);

ReactDOM.render(<AppInit />, el);
