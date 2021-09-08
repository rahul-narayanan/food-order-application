import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { showSuccessMessage } from "../../../core/js/utils";
import { GO_BACK_FROM_PLACE_ORDER, ORDER_PLACED } from "../redux/actions";
import { placeOrder } from "../utils";
import { CustomerInfo, OrderType, PaymentMethod } from "./utils";

export const PlaceOrder = () => {
    const state = useSelector((state) => state);
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const handleGoBackClick = useCallback(() => {
        dispatch({ type: GO_BACK_FROM_PLACE_ORDER });
    }, []);

    const handleSubmitClick = useCallback(async () => {
        await placeOrder();
        dispatch({ type: ORDER_PLACED, payload: state });
        setTimeout(() => {
            showSuccessMessage("Order placed successfully");
            //showSuccessMessage("Order placed successfully");
        });
    }, []);

    if (!state.goToPlaceOrder) return "";

    return (
        <div className="order-page-container">
            <div className="details">
                <form className="px-4 py-3">
                    <h4 className="pt-3 mb-3">
                        {t("common.amount_to_pay")}
                        <strong className="ml-2">${state.total}</strong>
                    </h4>
                    <PaymentMethod />
                    <OrderType />
                    <CustomerInfo />
                </form>
            </div>
            <div className="order_footer bg-white">
                <div className="btn_box">
                    <div className="row no-gutter mx-0">
                        <button
                            type="button"
                            className="btn col-6 Cancel"
                            onClick={handleGoBackClick}
                        >
                            {t("common.go_back")}
                        </button>
                        <button
                            type="button"
                            className="btn col-6 place_order"
                            onClick={handleSubmitClick}
                        >
                            {t("common.submit")}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
};