import WrapsImg from "../img/categories/wraps.png";
import LoadedFriesImg from "../img/categories/loaded-fries.png";
import PoutinesImg from "../img/categories/poutines.png";
import i18n from "../../i18n";

const Categories = [
    {
        id: "wraps",
        name: i18n.t("categories.wraps"),
        description:
      `Delicious fresh made pita wraps, with a side of fresh cut fries, house salad, chilli or poutine & pop!`,
        img: WrapsImg
    },
    {
        id: "salad_bowls",
        name: i18n.t("categories.salad_bowls"),
        description:
      `Delicious fresh made salads & bowls. Add a side of fresh cut fries, house salad, chilli or poutine & pop!`,
        img: LoadedFriesImg
    },
    {
        id: "loaded_taters",
        name: i18n.t("categories.loaded_taters"),
        description:
      `Our taters, loaded with different delicious fresh toppings and sauces, with side salad or chili and pop.`,
        img: WrapsImg
    },
    {
        id: "poutines",
        name: i18n.t("categories.poutines"),
        description:
      `Our fresh cut fries topped with Montreal Cheese Curds and our freshly made gravy made in a variety of stykes and options + side salad or chili and pop.`,
        img: PoutinesImg
    },
    {
        id: "chicken_wings",
        name: i18n.t("categories.chicken_wings"),
        description:
      `Delicious fresh made pita wraps, with a side of fresh cut fries, house salad, chilli or poutine & pop!`,
        img: WrapsImg
    },
    {
        id: "className="",
        name: i18n.t("categories.className=""),
        description:
      `Delicious fresh made pita wraps, with a side of fresh cut fries, house salad, chilli or poutine & pop!`,
        img: LoadedFriesImg
    }
];

export default Categories;
