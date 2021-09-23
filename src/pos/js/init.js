import "../scss/pos.scss";

import React, { useCallback, useMemo, useState } from "react";
import { Orders } from "./order-section/init";
import { POSContext } from "./utils";
import { PlaceOrderDialog } from "./order-section/place-order-dialog";
import { Listing } from "./listing-section/init";
import Emitter from "src/core/js/event-emitter";

export const POSContainer = () => {
    const [selectedItems, setSelectedItems] = useState([]);

    const [showPlaceOrderDialog, setShowPlaceOrderDialog] = useState(false);

    const subtotal = useMemo(() => {
        let value = 0;
        for (let i = 0; i < selectedItems.length; i++) {
            const item = selectedItems[i];
            value += item.quantity * Number(item.finalPrice);
        }
        return value;
    }, [selectedItems]);

    const tax = useMemo(() => subtotal * 0.13, [subtotal]);

    const total = useMemo(() => subtotal + tax, [subtotal, tax]);

    const openPlaceOrderDialog = useCallback(() => {
        setShowPlaceOrderDialog(true);
    }, []);

    const closePlaceOrderDialog = useCallback((value) => {
        setShowPlaceOrderDialog(false);
    }, []);

    const handleAddItem = useCallback((item) => {
        const newItems = selectedItems.slice();
        newItems.push(item);
        setSelectedItems(newItems);
    }, [selectedItems]);

    const handleUpdateItem = useCallback((item, index) => {
        const newItems = [
            ...selectedItems
        ];
        newItems[index] = item;
        setSelectedItems(newItems);
    }, [selectedItems]);

    const handleDeleteItem = useCallback((index) => {
        const newItems = [
            ...selectedItems
        ];
        newItems.splice(index, 1);
        setSelectedItems(newItems);
    }, [selectedItems]);

    const handleClearItems = useCallback(() => {
        setSelectedItems([]);
    });

    const handlePlaceOrderSuccess = useCallback(() => {
        setShowPlaceOrderDialog(false);
        setSelectedItems([]);
        Emitter.emit("PLACE_ORDER_SUCCESSFUL");
    }, []);

    const context = {
        selectedItems,
        handleAddItem,
        handleUpdateItem,
        handleDeleteItem,
        handleClearItems,

        showPlaceOrderDialog,
        openPlaceOrderDialog,
        closePlaceOrderDialog,

        handlePlaceOrderSuccess,

        subtotal: subtotal.toFixed(2),
        tax: tax.toFixed(2),
        total: total.toFixed(2)
    };

    return (
        <POSContext.Provider value={context}>
            <Orders />
            <Listing />
            <PlaceOrderDialog key={`placeOrderDialog_${Date.now()}`} />
        </POSContext.Provider>
    );
};
