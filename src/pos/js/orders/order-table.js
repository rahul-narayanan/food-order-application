import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { IncreaseDecreaseCounter } from "src/core/js/components/increase-decrease-counter";
import { calculatePrice } from "src/pos/js/listing/listing-utils";
import { usePOSContext } from "src/pos/js/utils";
import { OrderFooter } from "./order-footer";
import { Trash } from "react-bootstrap-icons";

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
                <div className="col-3 text-center">
                    <h2>{ `${t("common.total")}($)` }</h2>
                </div>
            </div>
        </div>
    );
};

export const OrderTable = () => {
    const { selectedItems, handleUpdateItem, handleDeleteItem } = usePOSContext();
    const { t } = useTranslation();

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
        const {
            selectedComboOption, selectedComboSide, selectedComboDrink, selectedExtraDrinks
        } = obj;

        if (selectedComboOption === "yes") {
            return (
                <>
                    <p className="m5" key="comboSide">
                        {`${selectedComboSide.name} ${t("common.combo")}`}
                    </p>
                    <p className="m5" key="comboDrink">
                        {`${selectedComboDrink.name} ${t("common.combo")}`}
                    </p>
                </>
            );
        }

        if (selectedExtraDrinks && Object.keys(selectedExtraDrinks).length) {
            return Object.values(selectedExtraDrinks).map((item) => (
                <p className="m5">{item.name}</p>
            ));
        }
    }

    function renderAdditionalPriceDetails(obj) {
        const {
            selectedComboOption, selectedComboSide, selectedExtraDrinks
        } = obj;

        if (selectedComboOption === "yes") {
            return (
                <>
                    <p className="m5" key="comboSidePrice">{selectedComboSide.price}</p>
                </>
            );
        }

        if (selectedExtraDrinks && Object.keys(selectedExtraDrinks).length) {
            return Object.values(selectedExtraDrinks).map((item, index) => (
                <p className="m5" key={`extraDrinkPrice_${index}`}>{item.price}</p>
            ));
        }
    }

    if (!selectedItems.length) return null;

    return (
        <div className="item_list active">
            <Header />
            <ul>
                {selectedItems.map((obj, index) => {
                    const { item, quantity, price } = obj;

                    return (
                        <li key={`${item.id}_${index}`}>
                            <div className="row">
                                <div className="col-4">
                                    <h2>{item.name}</h2>
                                    {renderAdditionalItemDetails(obj)}
                                </div>
                                <div className="col-2 text-center">
                                    <h3>{item.price}</h3>
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
                                    <h4>{(quantity * Number(price)).toFixed(2)}</h4>
                                </div>
                            </div>
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
