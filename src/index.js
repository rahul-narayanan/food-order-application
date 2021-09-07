
import "./core/scss/home.scss";
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer } from 'react-toastify';
import React, { useCallback, useState } from 'react';
import ReactDOM from 'react-dom';
import Amplify from "aws-amplify";
import awsExports from "./aws-exports";
import { Header } from './core/js/header';
import { Menus } from './core/js/constants';
import { MainContainer } from './core/js/main-container';
import "./i18n";

Amplify.configure(awsExports);

const AppInit = () => {
    const [selectedMenuIndex, setSelectedMenuIndex] = useState(0);  
  
    const handleMenuChange = useCallback((index) => {
        setSelectedMenuIndex(index);
    }, []);

    return (
        <main className="main-container">
            <ToastContainer />
            <div className="main-wrapper">
                <Header menus={Menus} selectedIndex={selectedMenuIndex} onChange={handleMenuChange} />
                <MainContainer
                    view={Menus[selectedMenuIndex].view}
                    containerCSS={Menus[selectedMenuIndex].containerCSS} 
                />
            </div>
        </main>
    )
}

const el = document.createElement("div");
document.body.appendChild(el);

ReactDOM.render(<AppInit />, el);
