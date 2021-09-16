import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { OrderTypes } from "../constants";
import { SUB_TYPE_SELECTED } from "./redux";
import { SelectType } from "./listing-utils";

export const ListingSubTypeSelect = () => {
    const state = useSelector((_state) => _state || {});
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const handleOnSubTypeSelect = useCallback((_selectedSubType) => {
        dispatch({ type: SUB_TYPE_SELECTED, selectedSubType: _selectedSubType });
    }, []);

    if (state.selectedSubType) return "";

    if (state.selectedType?.id === "order") {
        return (
            <SelectType
                options={OrderTypes}
                title={t("common.type_select_help_message")}
                onSelect={handleOnSubTypeSelect}
                containerCSS="item-section-wrapper subType"
            />
        );
    }

    return "";
};
