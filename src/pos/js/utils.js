import { putItemIntoTable } from "src/core/js/api-utils";
import { getCurrentUTCTimeStamp, ORDER_TABLE_NAME } from "src/core/js/utils";

export const placeOrder = async (params) => {
    const {
        customerName, customerPhone,
        paymentType, orderType, amount, noOfItems
    } = params;

    const currentTime = String(getCurrentUTCTimeStamp());
    try {
        await putItemIntoTable({
            TableName: ORDER_TABLE_NAME,
            Item: {
                OrderId: `MTP${currentTime}`,
                OrderTime: currentTime,
                Customer_Name: customerName,
                Customer_Phone_Number: customerPhone,
                PaymentType: paymentType,
                OrderType: orderType,
                NoOfItems: noOfItems,
                Amount: amount
            }
        });
    } catch (err) {

    }
};
