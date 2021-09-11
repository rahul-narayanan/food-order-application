import i18n from "../../i18n";
import OrderImg from "../img/order.png";
import PickUpImg from "../img/pickup.png";
import DeliveryImg from "../img/delivery.png";

export const Types = [
    {
        id: "order",
        name: "Order",
        img: OrderImg
    },
    {
        id: "pickup",
        name: "Pick up",
        img: PickUpImg
    },
    {
        id: "phone",
        name: "Phone",
        img: OrderImg
    }
];

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
        name: i18n.t("common.dine_in"),
        value: "dinein",
        img: OrderImg
    },
    {
        name: i18n.t("common.pickup"),
        value: "pickup",
        img: PickUpImg
    },
    {
        name: i18n.t("common.preorder"),
        value: "preorder",
        img: DeliveryImg
    }
];
