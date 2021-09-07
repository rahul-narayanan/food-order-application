import React, { useCallback, useState } from 'react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { Header } from './core/js/header';
import { Menus } from './core/js/constants';
import { MainContainer } from './core/js/main-container';
import { ToastContainer } from 'react-toastify';

const AppInit = () => {
    const [selectedMenuIndex, setSelectedMenuIndex] = useState(0);  
  
    const handleMenuChange = useCallback((index) => {
        setSelectedMenuIndex(index);
    }, []);

    return (
        <main className="main-container">
            <ToastContainer />
            <div className="main-wrapper">
                <Header
                    menus={Menus}
                    selectedIndex={selectedMenuIndex}
                    onMenuChange={handleMenuChange}
                />
                <MainContainer
                    view={Menus[selectedMenuIndex].view}
                    containerCSS={Menus[selectedMenuIndex].containerCSS}
                />
            </div>
        </main>
    )
}

export default withAuthenticator(AppInit);