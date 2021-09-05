import React from 'react';
import { Provider } from "react-redux";
import { Listing } from "./listing/init";
import { Orders } from "./orders/init";
import { store } from "./redux/store";

export const POSContainer = () => {
    return (
        <Provider store={store}>
            <Orders />
            <Listing />
        </Provider>
    )
};