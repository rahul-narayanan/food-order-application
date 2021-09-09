
import { useSelector } from "react-redux";
import { NoOrder } from "./no-order";
import { OrderTable } from "./order-table";
import { PlaceOrder } from "./place-order";

export const Orders = () => {
    const type = useSelector(state => state?.type || "");

    if (!type) return "";
    
    return (
        <div className="order_section">
            <div className="order_item_container">
                <NoOrder />
                <OrderTable />
                <PlaceOrder />
            </div>
        </div>
    )
}