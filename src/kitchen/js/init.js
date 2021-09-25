import "../scss/kitchen.scss";

import OnBoardingImg from "../img/on-boarding.png";

import { useCallback, useEffect, useState } from "react";
import { readAllItemsFromTable } from "src/core/js/api-utils";
import { ORDER_TABLE_NAME } from "src/core/js/utils";
import { getOrderSubTypeName, getOrderTypeName } from "src/pos/js/constants";
import { normalizeItemName } from "src/pos/js/listing-section/listing-utils";
import { useTranslation } from "react-i18next";
import { InfoCircleFill } from "react-bootstrap-icons";
import { ClockTimer } from "src/core/js/components/clock-timer";

export const Kitchen = () => {
    const [orders, setOrders] = useState(null);
    const { t } = useTranslation();

    const fetchOrders = useCallback(async () => {
        try {
            const result = await readAllItemsFromTable({
                TableName: ORDER_TABLE_NAME,
                ScanIndexForward: false
            });
            setOrders(result);
        } catch (err) {

        }
    }, []);

    useEffect(() => {
        fetchOrders();
    }, []);

    function renderLoader() {
        return (
            <div className="on-boarding-container" key="ordersLoader">
                <div className="circle-loader">
                    <div />
                    <div />
                    <div />
                    <div />
                </div>
                <div className="title">{t("common.loading_orders")}</div>
            </div>
        );
    }

    function renderOrders() {
        return orders.map((order) => (
            <div
                key={`order_${order.OrderId}`}
                className="order animate__ animate__zoomIn wow active1 animated"
                style={{ visibility: "visible", animationName: "zoomIn" }}
            >
                <div className="order_inner">
                    <div className="order_header d-flex align-items-center">
                        <h2>
                            {getOrderTypeName(order.orderType) || ""}
                            {" - "}
                            {getOrderSubTypeName(order.orderSubType) || ""}
                            <span>{order.OrderId}</span>
                        </h2>
                        <h3 className="ml-auto"><ClockTimer count={100} /></h3>
                    </div>
                    {order.items.map((item) => (
                        <div className="item" key={`orderedItem_${item.item.id}`}>
                            <h3 className="ion-text-start">{item.quantity}</h3>
                            <h4>
                                <p>{normalizeItemName(item.item.name, item.isVeggie)}</p>

                                {item.selectedSize && <p>{item.selectedSize.name}</p> || ""}
                                {item.selectedComboOption === "yes" && (
                                    <>
                                        <p className="title">{t("common.combo")}</p>
                                        <p>{`${item.selectedComboSide.name}, ${item.selectedComboDrink.name}`}</p>
                                    </>
                                ) || ""}
                                {item.selectedExtraDrinks && Object.keys(item.selectedExtraDrinks).length && (
                                    <>
                                        <p className="title" key="extraDrinksHeader">{t("common.drinks")}</p>
                                        {Object.values(item.selectedExtraDrinks).map((drink) => (
                                            <p key={`extraDrink_${drink.id}`}>{`${drink.name} - ${drink.quantity}`}</p>
                                        ))}
                                    </>
                                ) || ""}
                                {item.selectedAddOns?.length && (
                                    <>
                                        <p className="title">{t("common.addons")}</p>
                                        {item.selectedAddOns.map((addon) => (
                                            <p key={`addon_${addon.id}`}>{`${addon.name} - ${addon.quantity}`}</p>
                                        ))}
                                    </>
                                ) || ""}
                                {item.modifiers?.length && (
                                <div className="modifiers-info">
                                    <InfoCircleFill />
                                    {item.modifiers.join(", ")}
                                </div>
                                ) || ""}

                            </h4>
                        </div>
                    ))}
                </div>
            </div>
        ));
    }

    function renderContent() {
        if (orders === null) {
            return renderLoader();
        }

        if (!orders.length) {
            return (
                <div className="on-boarding-container">
                    <img src={OnBoardingImg} />
                    <div className="title">
                        {t("common.no_orders_found")}
                    </div>
                </div>
            );
        }

        return renderOrders();
    }

    return (
        <div className="kitchen-wrapper">
            {renderContent()}
        </div>
    );
};
