import { useCallback, useEffect, useState } from "react";
import { readAllItemsFromTable } from "../../core/js/api-utils";
import Skeleton from "react-loading-skeleton";
import { OrderTypes, PaymentTypes } from "../../pos/js/constants";
import { useTranslation } from "react-i18next";
import { ORDER_TABLE_NAME, sortByKey } from "../../core/js/utils";

const Header = () => (
    <div className="list_header d-flex">
        <h2 className="text-left" style={{ width: "10%" }}>Order Id</h2>
        <h2 className="text-left" style={{ width: "25%" }}>Name</h2>
        <h2 className="text-center" style={{ width: "25%" }}>Phone number</h2>
        <h2 className="text-center" style={{ width: "10%" }}>Items</h2>
        <h2 className="text-center" style={{ width: "10%" }}>Payment type</h2>
        <h2 className="text-center" style={{ width: "10%" }}>Order type</h2>
        <h2 className="text-center" style={{ width: "10%" }}>Amount</h2>
    </div>
);

export const OrderListing = () => {
    const [orders, setOrders] = useState(null);
    const { t } = useTranslation();

    const fetchOrders = useCallback(async () => {
        try {
            const result = await readAllItemsFromTable({
                TableName: ORDER_TABLE_NAME,
                ScanIndexForward: false
            });
            setOrders(sortByKey(result, "OrderId"));
        } catch (err) {

        }
    }, []);

    useEffect(() => {
        fetchOrders();
    }, []);

    const renderOrders = () => {
        if (!orders.length) {
            return (
                <li
                    className="d-flex animate__animated animate__fadeInUp wow"
                    key="noOrdersFound"
                >
                    <h3 className="text-center" style={{ width: "100%" }}>
                        {t("common.no_orders_found")}
                    </h3>
                </li>
            );
        }

        return orders.map((order) => (
            <li
                className="d-flex animate__animated animate__fadeInUp wow"
                key={order.OrderId}
            >
                <h3 className="text-left" style={{ width: "10%" }}>{order.OrderId}</h3>
                <h3
                    className="text-left"
                    style={{ width: "25%" }}
                >
                    <strong>{order.Customer_Name}</strong>
                </h3>
                <h3 className="text-center" style={{ width: "25%" }}>{order.Customer_Phone_Number}</h3>
                <h3 className="text-center" style={{ width: "10%" }}>{order.NoOfItems}</h3>
                <h3 className="text-center" style={{ width: "10%" }}>
                    {PaymentTypes.find((type) => type.value === order.PaymentType)?.name || ""}
                </h3>
                <h3 className="text-center" style={{ width: "10%" }}>
                    {OrderTypes.find((type) => type.value === order.OrderType)?.name || ""}
                </h3>
                <h3 className="text-center" style={{ width: "10%" }}>
                    {order.Amount ? `$${order.Amount}` : ""}
                </h3>
            </li>
        ));
    };

    return (
        <div className="table-container">
            <div className="order_list">
                <Header />
                {orders === null ? <Skeleton count={5} /> : (
                    <ul>
                        {renderOrders()}
                    </ul>
                )}
            </div>
        </div>
    );
};
