import Grobe from "../img/grobe.png";

import React from "react";
import i18n from "../../i18n";
import { OrdersContainer } from "../../orders/js/init";
import { POSContainer } from "../../pos/js/init";
import { Table } from "react-bootstrap-icons";

export const Menus = [
    {
        id: "pos",
        name: i18n.t("menus.pos"),
        view: <POSContainer />,
        containerCSS: "pos-wrapper",
        img: Grobe
    },
    {
        id: "orders",
        name: i18n.t("menus.orders"),
        view: <OrdersContainer />,
        icon: <Table />
    }
];
