import React from "react";
import { useTranslation } from "react-i18next";
import { usePOSContext } from "../utils";
import NoOrderImg from "../../img/noorder.png";

export const NoOrder = () => {
    const { t } = useTranslation();
    const { selectedItems } = usePOSContext();

    if (Object.keys(selectedItems).length) return null;

    return (
        <div className="no-order p-4 p-sm-4 p-md-4 p-lg-5">
            <div className="banner_img">
                <img src={NoOrderImg} className="img-fluid" />
                <h5>{t("common.no_order_desc")}</h5>
            </div>
        </div>
    );
};
