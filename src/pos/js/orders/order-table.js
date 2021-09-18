import VegIconImg from "../../img/veg_icon.png";
import {
    useCallback, useEffect, useRef, useState
} from "react";
import { useTranslation } from "react-i18next";
import { IncreaseDecreaseCounter } from "src/core/js/components/increase-decrease-counter";
import { calculatePrice, normalizeItemName } from "../listing/listing-utils";
import { usePOSContext } from "../utils";
import { OrderFooter } from "./order-footer";
import { Trash, InfoCircleFill } from "react-bootstrap-icons";

const Header = () => {
    const { t } = useTranslation();
    return (
        <div className="order_header">
            <div className="row align-items-center">
                <div className="col-4">
                    <h2>{t("common.item")}</h2>
                </div>
                <div className="col-2 text-center">
                    <h2>{`${t("common.price")}($)`}</h2>
                </div>
                <div className="col-3 text-center">
                    <h2>{ t("common.quantity")}</h2>
                </div>
                <div className="col-3 text-center">
                    <h2>{`${t("common.total")}($)`}</h2>
                </div>
            </div>
        </div>
    );
};

export const OrderTable = () => {
    const { selectedItems, handleUpdateItem, handleDeleteItem } = usePOSContext();
    const { t } = useTranslation();
    const listingParentRef = useRef(null);

    const handleMinusClick = useCallback((count, index) => {
        const obj = selectedItems[index];
        if (count > 0) {
            obj.quantity = count;
            obj.price = calculatePrice(obj.item, obj);
            handleUpdateItem(obj, index);
            return;
        }

        handleDeleteItem(index);
    }, [selectedItems]);

    const handlePlusClick = useCallback((count, index) => {
        const obj = selectedItems[index];
        obj.quantity = count;
        obj.price = calculatePrice(obj.item, obj);
        handleUpdateItem(obj, index);
    }, [selectedItems]);

    function renderAdditionalItemDetails(obj) {
        let result = [];
        const {
            selectedSize, selectedComboOption, selectedComboSide,
            selectedComboDrink, selectedExtraDrinks, selectedAddOns
        } = obj;

        if (selectedSize && selectedSize !== "small") {
            result.push(
                <p className="m5" key="sizeName">
                    {selectedSize.name}
                </p>
            );
        }

        if (selectedComboOption === "yes") {
            result.push(<p className="m5 light" key="comboHeader">{t("common.combo")}</p>);
            result.push(
                <p className="m5" key="comboSide">
                    {selectedComboSide.name}
                </p>
            );

            result.push(
                <p className="m5" key="comboDrink">
                    {selectedComboDrink.name}
                </p>
            );
        }

        if (selectedExtraDrinks && Object.keys(selectedExtraDrinks).length) {
            result.push(<p className="m5 light" key="extraDrinksHeader">{t("common.drinks")}</p>);
            result = result.concat(Object.values(selectedExtraDrinks).map((item) => (
                <p className="m5" key={`extraDrink_${item.id}`}>{item.name}</p>
            )));
        }

        if (selectedAddOns?.length) {
            result.push(<p className="m5 light" key="addonHeader">{t("common.addons")}</p>);
            result = result.concat(selectedAddOns.map((addon) => (
                <p className="m5" key={`addon_${addon.id}`}>{addon.name}</p>
            )));
        }

        return result;
    }

    function renderAdditionalPriceDetails(obj) {
        const {
            selectedSize, selectedComboOption,
            selectedComboSide, selectedExtraDrinks, selectedAddOns
        } = obj;

        let result = [];

        if (selectedSize) {
            result.push(<p className="m5" key="selectedSizePrice">&nbsp;</p>);
        }

        if (selectedComboOption === "yes") {
            result.push(<p className="m5" key="comboSideHeaderPrice">&nbsp;</p>);
            result.push(<p className="m5" key="comboSidePrice">{selectedComboSide.price}</p>);
            result.push(<p className="m5" key="comboDrinkPrice">&nbsp;</p>);
        }

        if (selectedExtraDrinks && Object.keys(selectedExtraDrinks).length) {
            result.push(<p className="m5" key="extraDrinksHeaderPrice">&nbsp;</p>);
            result = result.concat(Object.values(selectedExtraDrinks).map((drink, index) => (
                <p className="m5" key={`extraDrinkPrice_${index}`}>{drink.price}</p>
            )));
        }

        if (selectedAddOns?.length) {
            result.push(<p className="m5" key="addonsHeaderPrice">&nbsp;</p>);
            result = result.concat(selectedAddOns.map((addon) => (
                <p className="m5" key={`addon_${addon.id}`}>{addon.price}</p>
            )));
        }

        return result;
    }

    function renderModifiers(obj) {
        const { modifiers } = obj;

        if (modifiers && modifiers.length) {
            return (
                <div className="modifiers-info">
                    <InfoCircleFill />
                    {modifiers.join(", ")}
                </div>
            );
        }

        return "";
    }

    useEffect(() => {
        try {
            const { children } = listingParentRef.current;
            const el = children[children.length - 1];

            if (el.scrollIntoViewIfNeeded) {
                el.scrollIntoViewIfNeeded();
            } else {
                el.scrollIntoView();
            }
        } catch {}
    }, [selectedItems]);

    if (!selectedItems.length) return null;

    return (
        <div className="item_list active">
            <Header />
            <ul ref={listingParentRef}>
                {selectedItems.map((obj, index) => {
                    const {
                        item, quantity, finalPrice, selectedSize, isVeggie
                    } = obj;

                    return (
                        <li key={`${item.id}_${index}`}>
                            <div className="row">
                                <div className="col-4">
                                    <h2>
                                        {isVeggie ? <img src={VegIconImg} /> : ""}
                                        {normalizeItemName(item.name, isVeggie)}
                                    </h2>
                                    {renderAdditionalItemDetails(obj)}
                                </div>
                                <div className="col-2 text-center">
                                    <h3>
                                        {selectedSize && selectedSize.value !== "small"
                                            ? item[`${selectedSize.value}Price`] : item.price}
                                    </h3>
                                    {renderAdditionalPriceDetails(obj)}
                                </div>
                                <div className="col-3 text-center">
                                    <IncreaseDecreaseCounter
                                        key={`counter_${item.id}`}
                                        count={quantity}
                                        onIncrement={(count) => handlePlusClick(count, index)}
                                        onDecrement={(count) => handleMinusClick(count, index)}
                                    />
                                </div>
                                <div className="col-3 text-right">
                                    <h4>{(quantity * Number(finalPrice)).toFixed(2)}</h4>
                                </div>
                            </div>
                            {renderModifiers(obj)}
                            <div className="delete-icon">
                                <Trash onClick={() => handleDeleteItem(index)} />
                            </div>
                        </li>
                    );
                })}
            </ul>
            <OrderFooter />
        </div>
    );
};
