import i18n from "../../i18n";
import OrderImg from "../img/order.png";
import PickUpImg from "../img/pickup.png";
import PhoneImg from "../img/phone.png";

import ForHereImg from "../img/forhere.png";
import ToGoImg from "../img/togo.png";
import PreOrderImg from "../img/preorder.png";

import { CashCoin, CreditCard2Back, Gift } from "react-bootstrap-icons";

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

export const PaymentTypes = [
    {
        name: i18n.t("common.cash"),
        value: "cash",
        icon: <CashCoin />
    },
    {
        name: i18n.t("common.card"),
        value: "card",
        icon: <CreditCard2Back />
    },
    {
        name: i18n.t("common.giftCard"),
        value: "giftCard",
        icon: <Gift />
    },
    {
        name: i18n.t("common.storeCredit"),
        value: "storeCredit"
    },
    {
        name: i18n.t("common.other"),
        value: "other"
    }
];

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
