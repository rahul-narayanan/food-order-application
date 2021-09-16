import WrapsImg from "../img/categories/wraps.png";
import LoadedFriesImg from "../img/categories/loaded-fries.png";
import PoutinesImg from "../img/categories/poutines.png";
import i18n from "../../i18n";
import { WrapCombos } from "./combos";
import { Wraps } from "./wrap-items";

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
        id: "salad_bowls",
        name: i18n.t("categories.salad_bowls"),
        img: WrapsImg,
        isAvailableInDiffSizes: true
    },
    {
        id: "loaded_taters",
        name: i18n.t("categories.loaded_taters"),
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
    // {
    //     id: "sides_and_drinks",
    //     name: i18n.t("categories.sides_and_drinks"),
    //     img: LoadedFriesImg
    // },
    // {
    //     id: "catering_menu_wraps",
    //     name: i18n.t("categories.catering_menu_wraps"),
    //     img: LoadedFriesImg
    // },
    // {
    //     id: "catering_menu_wings",
    //     name: i18n.t("categories.catering_menu_wings"),
    //     img: LoadedFriesImg
    // },
    // {
    //     id: "catering_menu_taters",
    //     name: i18n.t("categories.catering_menu_taters"),
    //     img: LoadedFriesImg
    // },
    // {
    //     id: "catering_menu_loaded_taters",
    //     name: i18n.t("categories.catering_menu_loaded_taters"),
    //     img: LoadedFriesImg
    // },
    // {
    //     id: "catering_menu_poutines",
    //     name: i18n.t("categories.catering_menu_poutines"),
    //     img: LoadedFriesImg
    // },
    // {
    //     id: "catering_menu_salads",
    //     name: i18n.t("categories.catering_menu_salads"),
    //     img: LoadedFriesImg
    // }
];

export default Categories;
