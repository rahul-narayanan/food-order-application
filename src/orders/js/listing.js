import { useCallback, useEffect, useState } from "react"
import { readAllItemsFromTable } from "../../core/js/api-utils";
import { ORDER_TABLE_NAME } from "../../core/js/constants";
import Skeleton from 'react-loading-skeleton';

const Header = () => (
    <div className="list_header d-flex">
        <h2 className="text-left" style={{width: "20%"}}>Order Id</h2>
        <h2 className="text-left" style={{width: "20%"}}>Name</h2>
        <h2 className="text-center" style={{width: "20%"}}>Phone number</h2>
        <h2 className="text-center" style={{width: "20%"}}>Items</h2>
    </div>
);

export const OrderListing = () => {
    const [orders, setOrders] = useState(null);

    const fetchOrders = useCallback(async () => {
        try {
            const res = await readAllItemsFromTable({
                TableName: ORDER_TABLE_NAME
            });
            setOrders(res);
        } catch(err) {
            console.log(err);
        }
    }, []);

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <div className="table-container">
            <div className="order_list">
                <Header />
                {orders === null ? <Skeleton count={5} /> : (
                    <ul>
                        {orders.map(order => (
                            <li
                                className="d-flex animate__animated animate__fadeInUp wow"
                                key={order.OrderId}
                            >
                                <h3 className="text-left" style={{width: "20%"}}>{order.OrderId}</h3>
                                <h3 className="text-left" style={{ width: "20%" }}>
                                    <strong>{order.Customer_Name}</strong>
                                </h3>
                                <h3 className="text-center" style={{width: "20%"}}>{order.Customer_Phone_Number}</h3>
                                <h3 className="text-center" style={{width: "20%"}}>2</h3>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}