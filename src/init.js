
import 'owl.carousel/dist/owl.carousel.min.js';

import React, { useCallback, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
            <ToastContainer />
            <Header menus={Menus} selectedIndex={selectedMenuIndex} onChange={handleMenuChange}/>
            <div className="header_spacebar"></div>
            <MainContainer view={Menus[selectedMenuIndex].view}/>
        </>
    )
}

export default Init;