import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { DECREASE_ITEM_COUNT, INCREASE_ITEM_COUNT } from "../redux/actions";
import { OrderFooter } from "./order-footer";

const Header = () => {
    const { t } = useTranslation();
    return (
        <div className="order_header">
            <div className="row align-items-center">
                <div className="col-4">
                    <h2>{t("common.item")}</h2>
                </div>
                <div className="col-2 text-center">
                    <h2>{t("common.price")}</h2>
                </div>
                <div className="col-3 text-center">
                    <h2>{ t("common.quantity")}</h2>
                </div>
                <div className="col-3 text-right">
                    <h2>{ `${t("common.total")}($)` }</h2>
                </div>
            </div>
        </div>
    );
};

export const OrderTable = () => {
    const goToPlaceOrder = useSelector((state) => state?.goToPlaceOrder || false);
    const items = useSelector((state) => state?.selectedItems || {});
    const dispatch = useDispatch();

    const handleMinusClick = useCallback((itemId) => {
        dispatch({ type: DECREASE_ITEM_COUNT, itemId });
    }, []);

    const handlePlusClick = useCallback((itemId) => {
        dispatch({ type: INCREASE_ITEM_COUNT, itemId });
    }, []);

    if (goToPlaceOrder || !Object.keys(items).length) return null;

    return (
        <div className="item_list active">
            <Header />
            <ul>
                {Object.keys(items).map((id) => {
                    const item = items[id];
                    return (
                        <li key={item.id}>
                            <div className="row">
                                <div className="col-4">
                                    <h2>{item.name}</h2>
                                </div>
                                <div className="col-2 text-center">
                                    <h3>{item.price}</h3>
                                </div>
                                <div className="col-3 text-center">
                                    <h3 className="d-flex align-items-center">
                                        <i
                                            className="zmdi zmdi-minus"
                                            onClick={() => handleMinusClick(item.id)}
                                        />
                                        <strong>{item.quantity}</strong>
                                        <i
                                            className="zmdi zmdi-plus"
                                            onClick={() => handlePlusClick(item.id)}
                                        />
                                    </h3>
                                </div>
                                <div className="col-3 text-right">
                                    <h4>{(item.price * item.quantity).toFixed(2)}</h4>
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ul>
            <OrderFooter />
        </div>
    );
};
