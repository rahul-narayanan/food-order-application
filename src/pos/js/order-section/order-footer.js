import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "react-bootstrap";
import { usePOSContext } from "../utils";

export const OrderFooter = () => {
    const { t } = useTranslation();

    const {
        openPlaceOrderDialog, subtotal, tax, total
    } = usePOSContext();

    const handlePlaceOrderClick = useCallback(() => {
        openPlaceOrderDialog();
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
                    <span className="mr-0 ml-auto">{subtotal}</span>
                </h2>
                <h2 className="d-flex text-right">
                    <span className="text">{t("common.tax")}</span>
                    <span className="mr-0 ml-auto">{tax}</span>
                </h2>
            </div>
            <div className="amount_payable">
                <h2 className="d-flex text-right">
                    <span className="text">{t("common.amount_to_pay")}</span>
                    <span className="mr-0 ml-auto">{total}</span>
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
                    onClick={handlePlaceOrderClick}
                    className="themeBtn"
                >
                    {t("common.place_order")}
                </Button>
            </div>
        </div>
    );
};
