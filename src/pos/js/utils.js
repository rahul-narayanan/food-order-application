import { createContext, useContext } from "react";
import { putItemIntoTable, readLastItemFromTable } from "src/core/js/api-utils";
import { getPlacedStatus } from "src/core/js/status-utils";
import { ORDER_TABLE_NAME } from "src/core/js/utils";

export const POSContext = createContext();

export const usePOSContext = () => useContext(POSContext);

export const placeOrder = async (params) => {
    const lastInsertedItem = await readLastItemFromTable(ORDER_TABLE_NAME);

    const newId = Number((lastInsertedItem?.OrderId || "").match(/\d+/)?.[0] || 0) + 1;

    await putItemIntoTable({
        TableName: ORDER_TABLE_NAME,
        Item: {
            OrderId: `G${newId}`,
            OrderTime: String(Date.now()),
            ...params,
            status: getPlacedStatus()
        }
    });
};
