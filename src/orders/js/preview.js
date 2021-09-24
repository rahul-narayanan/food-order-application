import {
    useCallback, useEffect, useState
} from "react";
import { Offcanvas, Table } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import i18n from "src/i18n";
import { normalizeItemName } from "src/pos/js/listing-section/listing-utils";
import { InfoCircleFill } from "react-bootstrap-icons";
import { getInProgressStatus, getStatusText } from "src/core/js/status-utils";
import { DotLoader } from "src/core/js/utils";

const Headers = () => (
    <thead>
        <tr>
            <th>{i18n.t("common.quantity")}</th>
            <th>{i18n.t("common.items")}</th>
            <th align="right">{i18n.t("common.price")}</th>
        </tr>
    </thead>
);

export const OrderPreview = ({ order }) => {
    const [show, setShow] = useState(Boolean(order));

    useEffect(() => {
        setShow(Boolean(order));
    }, [order]);

    const handleClose = useCallback(() => {
        setShow(false);
    });

    function renderItems() {
        return order.items.map((item, index) => (
            <tr key={`orderedItem_${index}`}>
                <td>{item.quantity}</td>
                <td>
                    <div className="name">{normalizeItemName(item.item.name, item.isVeggie)}</div>
                    {item.selectedSize && <p>{item.selectedSize.name}</p> || ""}
                    {item.selectedComboOption === "yes" && (
                        <>
                            <p className="title">{i18n.t("common.combo")}</p>
                            <p>{`${item.selectedComboSide.name}, ${item.selectedComboDrink.name}`}</p>
                        </>
                    ) || ""}
                    {item.selectedExtraDrinks && Object.keys(item.selectedExtraDrinks).length && (
                        <>
                            <p className="title" key="extraDrinksHeader">{i18n.t("common.drinks")}</p>
                            {Object.values(item.selectedExtraDrinks).map((drink) => (
                                <p key={`extraDrink_${drink.id}`}>{`${drink.name} - ${drink.quantity}`}</p>
                            ))}
                        </>
                    ) || ""}
                    {item.selectedAddOns?.length && (
                        <>
                            <p className="title">{i18n.t("common.addons")}</p>
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
                </td>
                <td align="right">{`${item.finalPrice}`}</td>
            </tr>
        ));
    }

    function renderTable() {
        return (
            <Table
                responsive
                borderless
            >
                <Headers />
                <tbody>
                    {renderItems()}
                </tbody>
            </Table>
        );
    }

    function renderFooter() {
        return (
            <div className="order_footer">
                <div className="amount_details">
                    <h2 className="d-flex text-right">
                        <span className="text">
                            {i18n.t("common.subtotal")}
                        </span>
                        <span className="mr-0 ml-auto">{`$${order.subtotal}`}</span>
                    </h2>
                    <h2 className="d-flex text-right">
                        <span className="text">{i18n.t("common.tax")}</span>
                        <span className="mr-0 ml-auto">{`$${order.tax}`}</span>
                    </h2>
                </div>
                <div className="amount_payable">
                    <h2 className="d-flex text-right">
                        <span className="text">{i18n.t("common.total")}</span>
                        <span className="mr-0 ml-auto">{`$${order.total}`}</span>
                    </h2>
                </div>
            </div>
        );
    }

    function renderContent() {
        if (order) {
            return (
                <>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>
                            <div>
                                {`${order.customerName || ""}, ${order.customerPhone || ""}`}
                            </div>
                            <p style={{ marginBottom: "5px" }}>{`${order.OrderId} | ${new Date(Number(order.OrderTime)).toLocaleString()}`}</p>
                            {getStatusText(order.status)}
                            {order.status === getInProgressStatus() ? <DotLoader /> : ""}
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        {renderTable()}
                    </Offcanvas.Body>
                    {renderFooter()}
                </>
            );
        }

        return "";
    }

    return (
        <Offcanvas
            className="order-preview-dialog-container"
            key="modifier-overlay"
            show={show}
            onHide={handleClose}
            placement="end"
        >
            {renderContent()}
        </Offcanvas>
    );
};
