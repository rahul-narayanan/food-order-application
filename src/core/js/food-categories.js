import WrapsImg from "../img/categories/wraps.png";
import LoadedFriesImg from "../img/categories/loaded-fries.png";
import PoutinesImg from "../img/categories/poutines.png";
import i18n from "../../i18n";
import { WrapCombos, LoadedFriesCombos } from "./combos";
import { Wraps } from "./wrap-items";
import { LoadedFries } from "src/core/js/loaded-fries-items";
import { AddOns } from "src/core/js/addons";

const Categories = [
    {
        id: "wraps",
        name: i18n.t("categories.wraps"),
        img: WrapsImg,
        isAvailableInDiffSizes: false,
        items: Wraps,
        combos: WrapCombos
    },
    {
        id: "loaded_fries",
        name: i18n.t("categories.loaded_fries"),
        img: WrapsImg,
        isAvailableInDiffSizes: true,
        items: LoadedFries,
        combos: LoadedFriesCombos,
        addons: AddOns
    },
    {
        id: "salad_bowls",
        name: i18n.t("categories.salad_bowls"),
        img: WrapsImg,
        isAvailableInDiffSizes: true
    },
    {
        id: "poutines",
        name: i18n.t("categories.poutines"),
        img: WrapsImg,
        isAvailableInDiffSizes: true
    },
    {
        id: "chicken_wings",
        name: i18n.t("categories.chicken_wings"),
        img: WrapsImg,
        isAvailableInDiffSizes: true
    },
    {
        id: "crispy_chicken_dinners",
        name: i18n.t("categories.crispy_chicken_dinners"),
        img: WrapsImg,
        isAvailableInDiffSizes: true
    },
    {
        id: "baked_potato",
        name: i18n.t("categories.baked_potato"),
        img: WrapsImg,
        isAvailableInDiffSizes: true
    },
    {
        id: "fries",
        name: i18n.t("categories.fries"),
        img: WrapsImg,
        isAvailableInDiffSizes: true
    }
];

export default Categories;
