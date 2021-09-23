export const initialState = {
    selectedType: null, // Order, pickup or phone
    selectedSubType: null, // If order, here or to go
    selectedCategory: null,
    selectedItem: null
};

export const TYPE_SELECTED = "TYPE_SELECTED_ACTION";

export const SUB_TYPE_SELECTED = "TSUB_YPE_SELECTED_ACTION";

export const CATEGORY_SELECTED = "CATEGORY_SELECTED_ACTION";

export const ITEM_SELECTED = "ITEM_SELECTED_ACTION";

export const HANDLE_GO_BACK_CLICK = "HANDLE_GO_BACK_CLICK_ACTION";

export const HANDLE_SHOW_CATEGORIES = "HANDLE_SHOW_CATEGORIES_ACTION";

export const RESET_TO_DEFAULT = "RESET_TO_DEFAULT_ACTION";

export const reducer = (state = {}, action) => {
    switch (action.type) {
        case TYPE_SELECTED:
            return {
                ...initialState,
                selectedType: action.selectedType
            };

        case SUB_TYPE_SELECTED:
            return {
                ...initialState,
                selectedType: state.selectedType,
                selectedSubType: action.selectedSubType
            };

        case CATEGORY_SELECTED:
            return {
                ...state,
                selectedCategory: action.selectedCategory,
                selectedItem: null
            };

        case ITEM_SELECTED:
            return {
                ...state,
                selectedItem: action.selectedItem
            };

        case HANDLE_GO_BACK_CLICK: {
            if (state.selectedItem) {
                return {
                    ...state,
                    selectedItem: null
                };
            }

            if (state.selectedCategory) {
                return {
                    ...state,
                    selectedCategory: null,
                    selectedItem: null
                };
            }

            if (state.selectedSize) {
                return {
                    ...state,
                    selectedSize: null,
                    selectedCategory: null,
                    selectedItem: null
                };
            }

            if (state.selectedSubType) {
                return {
                    ...state,
                    selectedSubType: null,
                    selectedCategory: null,
                    selectedItem: null
                };
            }

            return {
                ...initialState
            };
        }

        case HANDLE_SHOW_CATEGORIES:
            return {
                ...state,
                selectedCategory: null,
                selectedItem: null
            };

        case RESET_TO_DEFAULT:
            return {
                ...initialState
            };

        default:
            return {
                ...state
            };
    }
};
