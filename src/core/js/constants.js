
import React from "react";
import i18n from "../../i18n";
import { POSContainer } from "../../pos/js/init";

export const Menus = [
    {
        id: "pos",
        name: i18n.t("menus.pos"), //i18n.t("menu.pos"),
        view: <POSContainer />
    }
    // {
    //     id: "transaction",
    //     name: i18n.t("menus.transaction"),
    //     view: <div>Transaction</div>
    // }
];
