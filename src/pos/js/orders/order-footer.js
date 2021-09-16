import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "react-bootstrap";
import { usePOSContext } from "src/pos/js/utils";

export const OrderFooter = () => {
    const { t } = useTranslation();

    const { selectedItems } = usePOSContext();

    const subtotal = useMemo(() => {
        let value = 0;
        for (let i = 0; i < selectedItems.length; i++) {
            const item = selectedItems[i];
            value += item.quantity * Number(item.price);
        }
        return value;
    }, [selectedItems]);

    const tax = useMemo(() => subtotal * 0.13, [subtotal]);

    const total = useMemo(() => subtotal + tax, [subtotal, tax]);

    const handlePlaceOrderClick = useCallback(() => {

    }, []);

    const handleCancelClick = useCallback(() => {

    }, []);

    return (
        <div className="order_footer">
            <div className="amount_details">
                <h2 className="d-flex text-right">
                    <span className="text">
                        {t("common.subtotal")}
                        {" "}
                    </span>
                    <span className="mr-0 ml-auto">{subtotal.toFixed(2)}</span>
                </h2>
                <h2 className="d-flex text-right">
                    <span className="text">{t("common.tax")}</span>
                    <span className="mr-0 ml-auto">{tax.toFixed(2)}</span>
                </h2>
            </div>
            <div className="amount_payable">
                <h2 className="d-flex text-right">
                    <span className="text">{t("common.amount_to_pay")}</span>
                    <span className="mr-0 ml-auto">{total.toFixed(2)}</span>
                </h2>
            </div>
            <div className="btn_box">
                <Button
                    variant="secondary"
                    onClick={handleCancelClick}
                >
                    {t("common.cancel")}
                </Button>
                <Button
                    variant="warning"
                    onClick={handlePlaceOrderClick}
                    className="themeBtn"
                >
                    {t("common.place_order")}
                </Button>
            </div>
        </div>
    );
};
