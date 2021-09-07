import React from 'react';
import { createStore } from "redux";
import { Provider } from "react-redux";
import { Listing } from "./listing/init";
import { Orders } from "./orders/init";
import { initialState, reducer } from './redux/reducer';

const store = createStore(reducer, initialState);

export const POSContainer = () => {
    return (
        <Provider store={store}>
            <Orders />
            <Listing />
        </Provider>
    )
};