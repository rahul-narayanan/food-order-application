import {
    ADD_ITEM_ACTION, CHANGE_CATEGORY_ACTION,
    CLEAR_SELECTED_ITEMS,
    DECREASE_ITEM_COUNT, GO_BACK_FROM_PLACE_ORDER,
    GO_TO_PLACE_ORDER, INCREASE_ITEM_COUNT, ORDER_PLACED, UPDATE_SEARCH_KEY
} from "./actions"

const initialState = {
    selectedCategoryIndex: 0,
    selectedItems: {},
    subTotal: "",
    tax: "",
    total: "",
    searchKey: "",
    goToPlaceOrder: false
};

const computeSubTotal = (items) => {
    return Object.keys(items).map(key => items[key])
        .map(({ price, quantity }) => Number(price).toFixed(2) * quantity)
        .reduce((acc, val) => acc + val, 0).toFixed(2).toString();
};

const getStateVariables = (items) => {
    const subtotal = computeSubTotal(items);
    const tax = (subtotal * 0.13).toFixed(2);

    return {
        subtotal,
        tax,
        total: (Number(subtotal) + Number(tax)).toFixed(2)
    }
}

const reducer = (state = {}, action) => {
    switch (action.type) {
        case CHANGE_CATEGORY_ACTION: return {
            ...state,
            selectedCategoryIndex: action.index
        };

        case ADD_ITEM_ACTION: {
            const { item } = action;
            const selectedItems = { ...state.selectedItems };
            if (selectedItems[item.id]) {
                selectedItems[item.id].quantity += 1;
            } else {
                selectedItems[item.id] = {
                    ...item,
                    quantity: 1
                }
            }

            return {
                ...state,
                selectedItems,
                ...getStateVariables(selectedItems)
            }
        }
            
        case INCREASE_ITEM_COUNT: {
            const { itemId } = action;
            const selectedItems = { ...state.selectedItems };
            
            selectedItems[itemId].quantity += 1;

            return {
                ...state,
                selectedItems,
                ...getStateVariables(selectedItems)
            }
        }
            
        case DECREASE_ITEM_COUNT: {
            const { itemId } = action;
            const selectedItems = { ...state.selectedItems };
            
            selectedItems[itemId].quantity -= 1;

            if (!selectedItems[itemId].quantity) {
                delete selectedItems[itemId];
            }

            return {
                ...state,
                selectedItems,
                ...getStateVariables(selectedItems)
            }
        }
            
        case CLEAR_SELECTED_ITEMS:
            return {
                ...state,
                selectedItems: {},
                ...getStateVariables({})
            }

        case UPDATE_SEARCH_KEY:
            return {
                ...state,
                searchKey: action.searchKey
            }
        
        case GO_TO_PLACE_ORDER: {
            return {
                ...state,
                goToPlaceOrder: true
            }
        }
            
        case GO_BACK_FROM_PLACE_ORDER: {
            return {
                ...state,
                goToPlaceOrder: false
            }
        }
            
        case ORDER_PLACED: {
            return {
                ...initialState,
                selectedCategoryIndex: state.selectedCategoryIndex
            }
        }
            
        default:
            return {
                ...state
            }
    }
};

export {
    initialState,
    reducer
}