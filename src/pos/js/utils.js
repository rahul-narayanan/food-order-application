import { putItemIntoTable } from "../../core/js/api-utils";
import { ORDER_TABLE_NAME as TableName} from "../../core/js/constants";
import { getCurrentUTCTimeStamp } from "../../core/js/utils";

export const placeOrder = async () => {
    //const { items } = params;
    const id = `MTP_${getCurrentUTCTimeStamp()}`;
    try {
        await putItemIntoTable({
            TableName,
            Item: {
                OrderId: id,
                OrderTime: getCurrentUTCTimeStamp(),
                Customer_Name: "Testing",
                Customer_Phone_Number: "226 976 7213"
            }
        });
    } catch (err) {
        console.log(err);
    }
} 