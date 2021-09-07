import { useTranslation } from "react-i18next";

export const PaymentMethod = () => {
    const { t } = useTranslation();

    return (
        <div className="form-group mb-4 pb-2">
            <label>{t("common.payment_method")}</label>
            <div className="row no-gutters align-items-center ml-0">
                <div className="col-6 col-sm-6 col-md-6 col-lg-4">
                    <div className="custom-control custom-radio">
                        <input
                            checked
                            type="radio"
                            id="payByCash"
                            name="PaymentMethod"
                            className="custom-control-input"
                        />
                        <label
                            className="custom-control-label"
                            htmlFor="payByCash">
                            <span>{t("common.cash")}</span>
                        </label>
                    </div>
                </div>
                <div className="col-6 col-sm-6 col-md-6 col-lg-4">
                    <div className="custom-control custom-radio">
                        <input
                            type="radio"
                            id="payByCard"
                            name="PaymentMethod"
                            className="custom-control-input"
                        />
                        <label className="custom-control-label" htmlFor="payByCard">
                            <span>{t("common.cash")}</span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}

export const OrderType = () => {
    const { t } = useTranslation();

    return (
        <div className="form-group mb-4 pb-2">
            <label>{t("common.order_type")}</label>
            <div className="row no-gutters align-items-center ml-0">
                <div className="col-6 col-sm-6 col-md-6 col-lg-4">
                    <div className="custom-control custom-radio">
                        <input
                            checked
                            type="radio"
                            id="takeaway"
                            name="OrderType"
                            className="custom-control-input"
                        />
                        <label
                            className="custom-control-label"
                            htmlFor="takeaway">
                            <span>{t("common.take_away")}</span>
                        </label>
                    </div>
                </div>
                <div className="col-6 col-sm-6 col-md-6 col-lg-4">
                    <div className="custom-control custom-radio">
                        <input
                            type="radio"
                            id="dine-in"
                            name="OrderType"
                            className="custom-control-input"
                        />
                        <label
                            className="custom-control-label"
                            htmlFor="dine-in">
                            <span>{t("common.dine_in")}</span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}

export const CustomerInfo = () => {
    const { t } = useTranslation();
    
    return (
        <>
            <div className="form-group">
                <label>{t("common.customer_info")}</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder={t("common.name")}
                    />
            </div>
            <div className="form-group">
                <input
                    type="text"
                    className="form-control"
                    placeholder={t("common.phone_number")}
                    />
            </div>
        </>
    )
}