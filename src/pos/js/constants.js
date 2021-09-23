import i18n from "../../i18n";
import OrderImg from "../img/order.png";
import PickUpImg from "../img/pickup.png";
import PhoneImg from "../img/phone.png";

import ForHereImg from "../img/forhere.png";
import ToGoImg from "../img/togo.png";
import PreOrderImg from "../img/preorder.png";

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
        img: PhoneImg
    }
];

export const getOrderTypeName = (id) => Types.find((type) => type.id === id).name;

export const OrderTypes = [
    {
        name: i18n.t("common.dine_in"),
        value: "dinein",
        img: ForHereImg
    },
    {
        name: i18n.t("common.pickup"),
        value: "pickup",
        img: ToGoImg
    },
    {
        name: i18n.t("common.preorder"),
        value: "preorder",
        img: PreOrderImg
    }
];

export const getOrderSubTypeName = (id) => OrderTypes.find((type) => type.id === id).name;

export const Sizes = [
    {
        name: i18n.t("common.small"),
        value: "small"
    },
    {
        name: i18n.t("common.regular"),
        value: "regular"
    },
    {
        name: i18n.t("common.jumbo"),
        value: "jumbo"
    }
];
