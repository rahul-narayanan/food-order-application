import { forwardRef,  useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";
import { OrderTypes, PaymentTypes } from "../constants";
import { RadioButtons } from "../../../core/js/components/radio-buttons";

const PaymentMethod = forwardRef((props, ref) => {
    const { t } = useTranslation();
    const buttonRef = useRef(null);

    useImperativeHandle(ref, () => ({
        getSelectedValue: () => buttonRef.current.getSelectedValue()
    }));

    return (
        <RadioButtons
            id="paymentType"
            ref={buttonRef}
            label={t("common.payment_method")}
            options={PaymentTypes}
        />
    );
});

PaymentMethod.displayName = "PaymentMethod";

const OrderType = forwardRef((props, ref) => {
    const { t } = useTranslation();
    const buttonRef = useRef(null);
    
    useImperativeHandle(ref, () => ({
        getSelectedValue: () => buttonRef.current.getSelectedValue()
    }));

    return (
        <RadioButtons
            id="orderType"
            ref={buttonRef}
            label={t("common.order_type")}
            options={OrderTypes}
        />
    );
});

OrderType.displayName = "OrderType";

const CustomerInfo = forwardRef((props, ref) => {
    const { t } = useTranslation();
    const nameRef = useRef(null);
    const phoneRef = useRef(null);

    useImperativeHandle(ref, () => ({
        getValues: () => ({
            customerName: nameRef.current.value.trim() || "Taters",
            customerPhone: phoneRef.current.value.trim() || "NA"
        })
    }));
    
    return (
        <>
            <div className="form-group">
                <label>{t("common.customer_info")}</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder={t("common.name")}
                    ref={nameRef}
                />
            </div>
            <div className="form-group">
                <input
                    type="text"
                    className="form-control"
                    placeholder={t("common.phone_number")}
                    ref={phoneRef}
                />
            </div>
        </>
    )
});

CustomerInfo.displayName = "CustomerInfo";

export {
    OrderType, PaymentMethod, CustomerInfo
}