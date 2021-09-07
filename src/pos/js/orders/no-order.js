import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import NoOrderImg from "../../img/noorder.png";

export const NoOrder = () => {
    const { t } = useTranslation();
    const items = useSelector((state) => state?.selectedItems || new Map());

    if (Object.keys(items).length) return null;

    return (
        <div id="no-order" className="no-order p-4 p-sm-4 p-md-4 p-lg-5">
            <div className="banner_img">
                <img src={NoOrderImg} className="img-fluid" />
            </div>
            <h2>
                {t("common.no_order_desc")}
            </h2>
            <h3>{t("common.click_to_order")}</h3>
        </div>
    );
};
