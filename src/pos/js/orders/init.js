
import { NoOrder } from "./no-order";
import { OrderTable } from "./order-table";

export const Orders = () => {
    return (
        <div className="order_section">
            <div className="order_item_container">
                <NoOrder />
                <OrderTable />
            </div>
        </div>
    )
}