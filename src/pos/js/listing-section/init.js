import { Provider } from "react-redux";
import { createStore } from "redux";
import { ListingWrapper } from "./listing-wrapper";
import { initialState, reducer } from "./redux";

export const ListingStore = createStore(reducer, initialState);

export const Listing = () => (
    <Provider store={ListingStore}>
        <ListingWrapper />
    </Provider>
);
