export const initialState = {
    selectedItems: [], // Selected items for order
    subTotal: "",
    tax: "",
    total: ""
};

const computeSubTotal = (items) => items.map((key) => items[key])
    .map(({ price, quantity }) => Number(price).toFixed(2) * quantity)
    .reduce((acc, val) => acc + val, 0)
    .toFixed(2)
    .toString();

const getSubTotalTaxAndTotal = (items) => {
    const subtotal = computeSubTotal(items);
    const tax = (subtotal * 0.13).toFixed(2);

    return {
        subtotal,
        tax,
        total: (Number(subtotal) + Number(tax)).toFixed(2)
    };
};

export const ADD_ITEM_ACTION = "ADD_ITEM_ACTION";

export const reducer = (state = {}, action) => {
    switch (action.type) {
        case ADD_ITEM_ACTION: {
            const { item } = action;
            const selectedItems = [...state.selectedItems, item];

            return {
                selectedItems,
                ...getSubTotalTaxAndTotal(selectedItems)
            };
        }

        default:
            return {
                ...state
            };
    }
};
