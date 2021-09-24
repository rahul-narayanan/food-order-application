import { useCallback, useEffect, useState } from "react";
import { readAllItemsFromTable } from "src/core/js/api-utils";
import Skeleton from "react-loading-skeleton";
import { getOrderSubTypeName, getOrderTypeName } from "src/pos/js/constants";
import { useTranslation } from "react-i18next";
import { ORDER_TABLE_NAME, sortByKey } from "src/core/js/utils";
import { Table } from "react-bootstrap";
import i18n from "src/i18n";
import { OrderPreview } from "src/orders/js/preview";
import { getStatusText } from "src/core/js/status-utils";

const headerTexts = [
    i18n.t("orders.id"),
    i18n.t("orders.orderedAt"),
    i18n.t("common.customer_name"),
    i18n.t("common.customer_phone"),
    i18n.t("orders.type"),
    i18n.t("orders.subtype"),
    i18n.t("orders.noOfItems"),
    i18n.t("common.total"),
    i18n.t("common.status")
];

export const OrderListing = () => {
    const [orders, setOrders] = useState(null);
    const [previewOrder, setPreviewOrder] = useState(null);

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

    const handleRowClick = useCallback((obj) => {
        setPreviewOrder(obj);
    }, []);

    const renderOrders = () => {
        if (orders === null) {
            const result = [];

            for (let i = 0; i < 5; i++) {
                result.push(
                    <tr key={`loadingHeaderSkeleton_${i}`}>
                        {headerTexts.map((header, index) => (
                            <td
                                key={`loadingHeaderSkeleton_${i}_${index}`}
                            >
                                <Skeleton />
                            </td>
                        ))}
                    </tr>
                );
            }

            return result;
        }

        if (!orders.length) {
            return (
                <tr key="noOrdersFound">
                    <td
                        className="noData"
                        colSpan={headerTexts.length}
                    >
                        {t("common.no_orders_found")}
                    </td>
                </tr>
            );
        }

        return orders.map((order) => (
            <tr key={`order_${order.OrderId}`} onClick={() => handleRowClick(order)}>
                <td>{order.OrderId}</td>
                <td>{new Date(Number(order.OrderTime)).toLocaleString()}</td>
                <td>{order.customerPhone}</td>
                <td>{order.customerName}</td>
                <td>{getOrderTypeName(order.orderType) || ""}</td>
                <td>{getOrderSubTypeName(order.orderSubType) || ""}</td>
                <td>{order.items?.length || ""}</td>
                <td>{`$${order.total}`}</td>
                <td>{getStatusText(order.status)}</td>
            </tr>
        ));
    };

    function renderHeaders() {
        return (
            <thead>
                <tr key="headerRow">
                    {headerTexts.map((header, index) => <th key={`header_${index}`}>{header}</th>)}
                </tr>
            </thead>
        );
    }

    return (
        <div className="table-container">
            <Table
                responsive
                borderless
                hover={orders && orders.length}
            >
                {renderHeaders()}
                <tbody>
                    {renderOrders()}
                </tbody>
            </Table>
            <OrderPreview order={previewOrder} />
        </div>
    );
};
