import "../scss/orders.scss";

import React from 'react';
import { Title } from "./title";
import { OrderListing } from "./listing";

export const OrdersContainer = () => {
    return (
        <div className="orders-wrapper">
            <Title />
            <OrderListing />            
        </div>
    )
};