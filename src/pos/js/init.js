import "../scss/pos.scss";

import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { Listing } from "./listing/init";
import { Orders } from "./orders/init";
import { initialState, reducer } from "./redux/reducer";
import { OnBoarding } from "./on-boarding/init";

const store = createStore(reducer, initialState);

export const POSContainer = () => (
    <Provider store={store}>
        <OnBoarding />
        <Orders />
        <Listing />
    </Provider>
);
