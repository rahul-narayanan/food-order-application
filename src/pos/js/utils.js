import { putItemIntoTable } from "../../core/js/api-utils";
import { ORDER_TABLE_NAME as TableName} from "../../core/js/constants";
import { getCurrentUTCTimeStamp } from "../../core/js/utils";

export const placeOrder = async (params) => {
    const {
        customerName, customerPhone,
        paymentType, orderType, amount, noOfItems
    } = params;

    const currentTime = String(getCurrentUTCTimeStamp());
    try {
        await putItemIntoTable({
            TableName,
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
        console.log(err);
    }
} 