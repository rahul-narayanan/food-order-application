import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import NoOrderImg from "../../img/noorder.png";
import { OrderTypes, Types } from "../constants";
import { HeaderNavigator } from "../../../core/js/components/header-navigator";
import { SelectType } from "./select-type";
import { GO_TO_ITEMS_LISTING } from "../redux/actions";

export const OnBoarding = () => {
    const type = useSelector(state => state?.type || "");
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const [selectedType, setSelectedType] = useState(type);

    const handleOnTypeSelect = useCallback((type) => {
        if (type.id === "order") {
            setSelectedType(type.id);
        } else {
            dispatch({
                type: GO_TO_ITEMS_LISTING,
                selectedType: type.id
            });    
        }
    }, []);

    const handleOnSubTypeSelect = useCallback((subType) => {
        dispatch({
            type: GO_TO_ITEMS_LISTING,
            selectedType: selectedType,
            selectedSubType: subType.value
        });
    }, [selectedType]);

    const handleGoToSelectType = useCallback(() => {
        setSelectedType(null);
    }, []);

    if (type) return "";

    const renderChildren = () => {
        if (selectedType && selectedType === "order") {
            return (
                <SelectType
                    options={OrderTypes}
                    title={t("common.type_select_help_message")}
                    onSelect={handleOnSubTypeSelect}
                    />
            );
        }

        return (
            <SelectType
                options={Types}
                title={t("common.welcome_message") }
                description={t("common.how_can_i_help_message")}
                onSelect={handleOnTypeSelect}
            />
        );
    }

    return (
        <>
            <div className="order_section">
                <div className="order_item_container">
                    <div key="posOnBoarding" className="no-order p-4 p-sm-4 p-md-4 p-lg-5">
                        <div className="banner_img">
                            <img src={NoOrderImg} className="img-fluid" />
                        </div>
                        <h2>
                            {t("common.no_order_desc")}
                        </h2>
                    </div>
                </div>
            </div>
            <div className="onBoarding">
                {
                    selectedType ?
                        <HeaderNavigator
                            headerText={Types.find(_type => _type.id === selectedType).name}
                            onBack={handleGoToSelectType}
                    /> : ""
                }
                {renderChildren()}
            </div>
        </>
    );
};
