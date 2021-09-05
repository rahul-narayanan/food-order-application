import { createStore } from "redux";
import { reducer } from "./reducer";

export const store = createStore(reducer, {
    selectedCategoryIndex: 0,
    selectedItems: {},
    subTotal: "",
    tax: "",
    total: "",
    searchKey: ""
});