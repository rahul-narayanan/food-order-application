import "../scss/orders.scss";

import React from "react";
import { Title } from "./title";
import { OrderListing } from "./listing";

export const OrdersContainer = () => (
    <div className="orders-wrapper">
        <Title />
        <OrderListing />
    </div>
);
