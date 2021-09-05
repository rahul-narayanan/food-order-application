
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css.map';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import "./core/css/google_sans_font.css";
import "./core/css/animate.css";
import "./core/css/style.css";
import "./core/css/responsive.css";

//import 'jquery/dist/jquery.min.js';
import 'owl.carousel/dist/owl.carousel.min.js';

import React, { useCallback, useState } from 'react';
import Amplify from 'aws-amplify';
import awsExports from "./aws-exports";
import { Header } from './core/js/header';
import { MainContainer } from './core/js/main-container';
import { Menus } from './core/js/constants';

Amplify.configure(awsExports);

const Init = () => {
    const [selectedMenuIndex, setSelectedMenuIndex] = useState(0);  
  
    const handleMenuChange = useCallback((index) => {
        setSelectedMenuIndex(index);
    }, []);

    return (
        <>
            <Header menus={Menus} selectedIndex={selectedMenuIndex} onChange={handleMenuChange}/>
            <div className="header_spacebar"></div>
            <MainContainer view={Menus[selectedMenuIndex].view}/>
        </>
    )
}

export default Init;