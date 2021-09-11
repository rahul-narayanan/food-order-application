import i18n from "../../i18n";
import { Drinks } from "./drink-items";

export const WrapCombos = {
    title: i18n.t("common.comboTitleMessage"),
    sides: [
        {
            id: "freshCutFries",
            name: i18n.t("foods.combos.freshCutFries"),
            price: "3.95"
        },
        {
            id: "tatersTot",
            name: i18n.t("foods.combos.tatersTot"),
            price: "4.95"
        },
        {
            id: "waffleFries",
            name: i18n.t("foods.combos.waffleFries"),
            price: "4.95"
        },
        {
            id: "sweetPotato",
            name: i18n.t("foods.combos.sweetPotato"),
            price: "4.95"
        },
        {
            id: "curlyFries",
            name: i18n.t("foods.combos.curlyFries"),
            price: "4.95"
        },
        {
            id: "poutine",
            name: i18n.t("foods.combos.poutine"),
            price: "6.95"
        },
        {
            id: "houseSalad",
            name: i18n.t("foods.combos.houseSalad"),
            price: "5.95",
            veg: true
        }
    ],
    drinks: [...Drinks]
};
