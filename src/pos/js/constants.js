import i18n from "../../i18n";


export const PaymentTypes = [
    {
        name: i18n.t("common.cash"),
        value: "cash"
    },
    {
        name: i18n.t("common.card"),
        value: "card"
    }
];

export const OrderTypes = [
    {
        name: i18n.t("common.pickup"),
        value: "pickup"
    },
    {
        name: i18n.t("common.delivery"),
        value: "delivery"
    }
];