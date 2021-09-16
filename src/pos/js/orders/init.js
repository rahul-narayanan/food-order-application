import { NoOrder } from "./no-order";
import { OrderTable } from "./order-table";
import { PlaceOrder } from "./place-order";

export const Orders = () => (
    <div className="order_section">
        <div className="order_item_container">
            <NoOrder />
            <OrderTable />
            <PlaceOrder />
        </div>
    </div>
);
