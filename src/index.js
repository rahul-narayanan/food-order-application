import React from 'react';
import ReactDOM from 'react-dom';
import Init from './init';
import Amplify from "aws-amplify";
import awsExports from "./aws-exports";
import "./i18n";
Amplify.configure(awsExports);

const mainElement = document.createElement("main");
document.body.appendChild(mainElement);

ReactDOM.render(<Init />,mainElement);
