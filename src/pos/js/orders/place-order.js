import { useCallback, useRef } from "react";
import { useTranslation } from "react-i18next";
import { showSuccessMessage } from "src/core/js/utils";
import { placeOrder, usePOSContext } from "../utils";
import { CustomerInfo, OrderType, PaymentMethod } from "./order-utils";

export const PlaceOrder = () => {
    const { selectedItems } = usePOSContext();
    const { t } = useTranslation();

    const payMethodRef = useRef(null);
    const orderTypeRef = useRef(null);
    const customerInfoRef = useRef(null);

    const handleGoBackClick = useCallback(() => {
        // dispatch({ type: GO_BACK_FROM_PLACE_ORDER });
    }, []);

    const handleSubmitClick = useCallback(async () => {
        await placeOrder({
            ...customerInfoRef.current.getValues(),
            paymentType: payMethodRef.current.getSelectedValue(),
            orderType: orderTypeRef.current.getSelectedValue(),
            noOfItems: Object.keys(selectedItems).length,
            amount: "" // state.total
        });
        setTimeout(() => {
            showSuccessMessage("Order placed successfully");
        });
    }, [selectedItems]);

    return "";
    // if (!state.goToPlaceOrder) return "";

    // return (
    //     <div className="order-page-container">
    //         <div className="details">
    //             <form className="px-4 py-3">
    //                 <h4 className="pt-3 mb-3">
    //                     {t("common.amount_to_pay")}
    //                     <strong className="ml-2">
    //                         $
    //                         {state.total}
    //                     </strong>
    //                 </h4>
    //                 <PaymentMethod ref={payMethodRef} />
    //                 <OrderType ref={orderTypeRef} />
    //                 <CustomerInfo ref={customerInfoRef} />
    //             </form>
    //         </div>
    //         <div className="order_footer bg-white">
    //             <div className="btn_box">
    //                 <div className="row no-gutter mx-0">
    //                     <button
    //                         type="button"
    //                         className="btn col-6 Cancel"
    //                         onClick={handleGoBackClick}
    //                     >
    //                         {t("common.go_back")}
    //                     </button>
    //                     <button
    //                         type="button"
    //                         className="btn col-6 place_order"
    //                         onClick={handleSubmitClick}
    //                     >
    //                         {t("common.submit")}
    //                     </button>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // );
};
