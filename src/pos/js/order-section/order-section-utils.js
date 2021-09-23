import {
    CashCoin, CreditCard2Back, Gift, Shop, Clipboard
} from "react-bootstrap-icons";
import i18n from "src/i18n";

export const CashOptionContent = () => "Cash";

export const CardOptionContent = () => "Card";

export const GiftOptionContent = () => "Cash";

export const StoreCreditOptionContent = () => "Cash";

export const OtherOptionContent = () => "Cash";

export const PaymentTypes = [
    {
        name: i18n.t("common.cash"),
        value: "cash",
        icon: <CashCoin />,
        content: CashOptionContent
    },
    {
        name: i18n.t("common.card"),
        value: "card",
        icon: <CreditCard2Back />,
        content: CardOptionContent
    },
    {
        name: i18n.t("common.giftCard"),
        value: "giftCard",
        icon: <Gift />,
        content: GiftOptionContent
    },
    {
        name: i18n.t("common.storeCredit"),
        value: "storeCredit",
        icon: <Shop />,
        content: StoreCreditOptionContent
    }
    // {
    //     name: i18n.t("common.other"),
    //     value: "other",
    //     icon: <Clipboard />,
    //     content: OtherOptionContent
    // }
];
