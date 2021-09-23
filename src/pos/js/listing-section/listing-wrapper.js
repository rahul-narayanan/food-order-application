import { ListingCategory } from "./category-listing";
import { ListingItems } from "./items-listing";
import { ListingHeaderNavigator } from "./listing-header-navigator";
import { ListingSubTypeSelect } from "./sub-type-listing";
import { ListingTypeSelect } from "./type-listing";
import { ItemDialog } from "./item-dialog";
import { useEffect } from "react";
import Emitter from "src/core/js/event-emitter";
import { useDispatch } from "react-redux";
import { RESET_TO_DEFAULT } from "src/pos/js/listing-section/redux";

export const ListingWrapper = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        Emitter.on("PLACE_ORDER_SUCCESSFUL", () => {
            dispatch({ type: RESET_TO_DEFAULT });
        });

        return () => {
            Emitter.off("PLACE_ORDER_SUCCESSFUL");
        };
    }, []);

    return (
        <div className="listing-section-wrapper">
            <ListingHeaderNavigator />
            <ListingTypeSelect key="typeSelect" />
            <ListingSubTypeSelect key="subTypeSelect" />
            <ListingCategory />
            <ListingItems />
            <ItemDialog />
        </div>
    );
};
