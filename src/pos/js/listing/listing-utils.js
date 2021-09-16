import React, { useCallback, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { HeaderNavigator } from "src/core/js/components/header-navigator";
import { IncreaseDecreaseCounter } from "src/core/js/components/increase-decrease-counter";

export const SelectType = ({
    options, title, description, onSelect, containerCSS = ""
}) => (
    <div className={containerCSS}>
        <div className="title">
            <h2 className="msgText">{title}</h2>
            {description
                ? <h3 className="msgText">{description}</h3> : ""}
        </div>
        <div className="item-section">
            {options.map((_type) => (
                <div
                    key={_type.id || _type.value}
                    className="item animate__animated animate__zoomIn wow"
                    onClick={() => onSelect(_type)}
                >
                    <div className="item_img center_img">
                        <img src={_type.img} className="crop_img" />
                    </div>
                    <div className="text_box">
                        <h2>{_type.name}</h2>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export const ComboSideAndDrink = ({
    items = [],
    actionBtnName = "",
    showPrice = true,
    onComplete = () => {}
}) => {
    const [selectedItem, setSelectedItem] = useState(null);

    return (
        <>
            <div className="combo-items">
                {items.map((item) => (
                    <div
                        key={item.id}
                        className={`combo-item ${selectedItem && selectedItem.id === item.id ? "active" : ""}`}
                        onClick={() => setSelectedItem(item)}
                    >
                        {item.name}
                        &nbsp;
                        {showPrice && `- $${item.price}`}
                        {selectedItem && selectedItem.id === item.id ? <span className="tick" /> : ""}
                    </div>
                ))}
            </div>
            {selectedItem
                ? (
                    <Modal.Footer>
                        <Button variant="success" onClick={() => onComplete(selectedItem)}>
                            {actionBtnName}
                        </Button>
                    </Modal.Footer>
                ) : ""}
        </>
    );
};

export const ExtraDrinkSelect = ({ items = [], onComplete = () => {}, onBack }) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedItems, setSelectedItems] = useState({});
    const { t } = useTranslation();

    const handleOptionSelect = useCallback((value) => {
        setSelectedOption(value);
    }, [selectedOption]);

    const handleItemSelect = useCallback((item) => {
        const isItemSelected = selectedItems[item.id];

        const newItems = { ...selectedItems };
        if (isItemSelected) {
            delete newItems[item.id];
        } else {
            newItems[item.id] = {
                ...item,
                quantity: 1
            };
        }
        setSelectedItems(newItems);
    }, [selectedOption, selectedItems]);

    const handleGoBack = useCallback(() => {
        if (!selectedOption) {
            onBack();
        }

        setSelectedOption(null);
    }, [selectedOption]);

    const handleDecrement = useCallback((item, count) => {
        if (count === 0) {
            const newItems = { ...selectedItems };
            delete newItems[item.id];
            setSelectedItems(newItems);
        }
    }, []);

    function renderOptions() {
        return (
            <div className="combo-options">
                <h5 className="msgText">{t("common.extra_drinks_help_message")}</h5>
                <div>
                    <Button
                        variant="primary"
                        size="lg"
                        onClick={() => handleOptionSelect("yes")}
                    >
                        {t("common.drink")}
                    </Button>
                    <Button
                        variant="secondary"
                        size="lg"
                        onClick={() => handleOptionSelect("no")}
                    >
                        {selectedOption && selectedOption === "no" ? <span className="tick" /> : ""}
                        {t("common.noDrink")}
                    </Button>
                </div>
            </div>
        );
    }

    function renderChildren() {
        if (!selectedOption) {
            return renderOptions();
        }

        return (
            <>
                {selectedOption === "yes" ? (
                    <div className="combo-items">
                        {items.map((item) => {
                            const isItemSelected = selectedItems[item.id];

                            return (
                                <div
                                    key={item.id}
                                    className={`combo-item ${isItemSelected ? "active" : ""}`}
                                    onClick={() => handleItemSelect(item)}
                                >
                                    {item.name}
                            &nbsp;
                                    {`- $${item.price}`}
                                    {isItemSelected ? (
                                        <IncreaseDecreaseCounter
                                            key={`counter_${item.id}`}
                                            count={isItemSelected.quantity}
                                            onDecrement={(count) => handleDecrement(item, count)}
                                        />
                                    ) : ""}
                                </div>
                            );
                        })}
                    </div>
                ) : renderOptions()}
                {selectedOption === "no" || Object.keys(selectedItems).length > 0
                    ? (
                        <Modal.Footer>
                            <Button variant="success" onClick={() => onComplete(selectedItems)}>
                                <span className="tick" />
                                {t("common.place_order")}
                            </Button>
                        </Modal.Footer>
                    ) : ""}
            </>
        );
    }

    let headerText = t("common.noCombo");
    if (selectedOption) {
        if (selectedOption === "yes") {
            headerText += ` - ${t("common.drink")}`;
        } else {
            headerText += ` - ${t("common.noDrink")}`;
        }
    }

    return (
        <>
            <HeaderNavigator
                headerText={headerText}
                onBack={handleGoBack}
            />
            {renderChildren()}
        </>
    );
};
