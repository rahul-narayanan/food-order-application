import { Provider } from "react-redux";
import { createStore } from "redux";
import { ListingCategory } from "./category-listing";
import { ListingItems } from "./items-listing";
import { ListingHeaderNavigator } from "./listing-header-navigator";
import { initialState, reducer } from "./redux";
import { ListingSubTypeSelect } from "./sub-type-listing";
import { ListingTypeSelect } from "./type-listing";
import { ItemDialog } from "./item-dialog";

const store = createStore(reducer, initialState);

export const Listing = () => (
    <Provider store={store}>
        <div className="listing-section-wrapper">
            <ListingHeaderNavigator />
            <ListingTypeSelect />
            <ListingSubTypeSelect />
            <ListingCategory />
            <ListingItems />
            <ItemDialog />
        </div>
    </Provider>
);
