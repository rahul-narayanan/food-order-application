import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Types } from "../constants";
import { TYPE_SELECTED } from "./redux";
import { SelectType } from "./listing-utils";

export const ListingTypeSelect = () => {
    const selectedType = useSelector((state) => state?.selectedType || null);
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const handleOnTypeSelect = useCallback((_selectedType) => {
        dispatch({ type: TYPE_SELECTED, selectedType: _selectedType });
    }, []);

    if (selectedType) return "";

    return (
        <SelectType
            options={Types}
            title={t("common.welcome_message")}
            onSelect={handleOnTypeSelect}
            containerCSS="item-section-wrapper type"
        />
    );
};
