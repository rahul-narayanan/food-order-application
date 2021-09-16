import "../scss/pos.scss";

import React, { useCallback, useState } from "react";
import { Listing } from "./listing/init";
import { Orders } from "./orders/init";
import { POSContext } from "src/pos/js/utils";

export const POSContainer = () => {
    const [selectedItems, setSelectedItems] = useState([]);

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

    const context = {
        selectedItems,
        handleAddItem,
        handleUpdateItem,
        handleDeleteItem,
        handleClearItems
    };

    return (
        <POSContext.Provider value={context}>
            <Orders />
            <Listing />
        </POSContext.Provider>
    );
};
