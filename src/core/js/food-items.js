import CeasarWrapImg from "../img/items/chicken-ceasar.png";
import PopsChickenWrapImg from "../img/items/pops-chicken-wrap.png";
import ChickenMessPoutine from "../img/items/chicken-mess-poutine.png";
import TraditionalPoutine from "../img/items/traditional-poutine.png";
import i18n from "../../i18n";
import { Wraps } from "./wrap-items";

const Items = [
    ...(Wraps.map((wrap) => ({ categoryId: "wraps", ...wrap }))),
    {
        categoryId: "salad_bowls",
        id: "popsChickenSaladBowl",
        name: i18n.t("foods.popsChickenSaladBowl"),
        description: i18n.t("foods.popsChickenSaladBowlDesc"),
        img: CeasarWrapImg,
        price: "7.95"
    },
    {
        categoryId: "salad_bowls",
        id: "wildPopsChickenSaladBowl",
        name: i18n.t("foods.wildPopsChickenSaladBowl"),
        description: i18n.t("foods.wildPopsChickenSaladBowlDesc"),
        img: PopsChickenWrapImg,
        price: "8.95"
    },
    {
        categoryId: "poutines",
        id: "traditionalPoutine",
        name: i18n.t("foods.traditionalPoutine"),
        description: i18n.t("foods.traditionalPoutineDesc"),
        img: TraditionalPoutine,
        price: "6.95"
    },
    {
        categoryId: "poutines",
        id: "chickenMessPoutine",
        name: i18n.t("foods.chickenMessPoutine"),
        description: i18n.t("foods.chickenMessPoutineDesc"),
        img: ChickenMessPoutine,
        price: "8.95"
    },
    {
        categoryId: "loaded_taters",
        id: "nachoFries",
        name: i18n.t("foods.nachoFries"),
        description: i18n.t("foods.nachoFriesDesc"),
        img: CeasarWrapImg,
        price: "7.95",
        veg: true
    },
    {
        categoryId: "loaded_taters",
        id: "fireCrackerFries",
        name: i18n.t("foods.fireCrackerFries"),
        description: i18n.t("foods.fireCrackerFriesDesc"),
        img: PopsChickenWrapImg,
        price: "9.95"
    },
    {
        categoryId: "chicken_wings",
        id: "regularWings",
        name: i18n.t("foods.regularWings"),
        description: i18n.t("foods.regularWingsDesc"),
        img: CeasarWrapImg,
        price: "7.95"
    },
    {
        categoryId: "chicken_wings",
        id: "garlicParmWings",
        name: i18n.t("foods.garlicParmWings"),
        description: i18n.t("foods.garlicParmWingsDesc"),
        img: PopsChickenWrapImg,
        price: "8.95"
    },
    {
        categoryId: "crispy_chicken_dinners",
        id: "chickenNuggets",
        name: i18n.t("foods.chickenNuggets"),
        description: i18n.t("foods.chickenNuggets"),
        img: TraditionalPoutine,
        price: "4.95"
    },
    {
        categoryId: "crispy_chicken_dinners",
        id: "crispyChickenDinner",
        name: i18n.t("foods.crispyChickenDinner"),
        description: i18n.t("foods.crispyChickenDinnerDesc"),
        img: ChickenMessPoutine,
        price: "10.95"
    },
    {
        categoryId: "baked_potato",
        id: "bakeNCheeseFest",
        name: i18n.t("foods.bakeNCheeseFest"),
        description: i18n.t("foods.bakeNCheeseFestDesc"),
        img: CeasarWrapImg,
        price: "14.95",
        veg: true
    },
    {
        categoryId: "baked_potato",
        id: "steakNBake",
        name: i18n.t("foods.steakNBake"),
        description: i18n.t("foods.steakNBakeDesc"),
        img: PopsChickenWrapImg,
        price: "14.95"
    },
    {
        categoryId: "fries",
        id: "freshCutFries",
        name: i18n.t("foods.freshCutFries"),
        img: PopsChickenWrapImg,
        price: "5.95"
    },
    {
        categoryId: "fries",
        id: "waffleFries",
        name: i18n.t("foods.waffleFries"),
        img: TraditionalPoutine,
        price: "5.95"
    },
    {
        categoryId: "sides_and_drinks",
        id: "coleslaw",
        name: i18n.t("foods.coleslaw"),
        img: ChickenMessPoutine,
        price: "3.79",
        veg: true
    },
    {
        categoryId: "sides_and_drinks",
        id: "chili",
        name: i18n.t("foods.chili"),
        img: CeasarWrapImg,
        price: "4.79",
        veg: true
    }
];

export default Items;
