
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { CLEAR_SELECTED_ITEMS, GO_TO_PLACE_ORDER } from "../redux/actions";

export const OrderFooter = () => {
    const state = useSelector((state) => state);
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const handlePlaceOrderClick = useCallback(() => {
        dispatch({type: GO_TO_PLACE_ORDER})
    }, []);

    const handleCancelClick = useCallback(() => {
        dispatch({ type: CLEAR_SELECTED_ITEMS });
    }, []);

    return (
        <div className="order_footer">
            <div className="amount_details">
                <h2 className="d-flex text-right">
                    <span className="text">{t("common.subtotal")} </span>
                    <span className="mr-0 ml-auto">{state.subtotal}</span>
                </h2>
                <h2 className="d-flex text-right">
                    <span className="text">{t("common.tax")}</span>
                    <span className="mr-0 ml-auto">{state.tax}</span>
                </h2>
            </div>
            <div className="amount_payble">
                <h2 className="d-flex text-right">
                    <span className="text">{t("common.amount_to_pay")}</span>
                    <span className="mr-0 ml-auto">{state.total}</span>
                </h2>
            </div>
            <div className="btn_box">
                <div className="row no-gutter mx-0">
                    <button
                        type="button"
                        className="btn col-6 Cancel"
                        onClick={handleCancelClick}
                    >
                        {t("common.cancel")}
                    </button>
                    <button
                        type="button"
                        className="btn col-6 place_order"
                        onClick={handlePlaceOrderClick}
                    >
                        {t("common.place_order")}
                    </button>
                </div>
            </div>
        </div>
    );
};
