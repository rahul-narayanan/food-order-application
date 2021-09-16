import React, { useCallback, useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { HeaderNavigator } from "src/core/js/components/header-navigator";
import { IncreaseDecreaseCounter } from "src/core/js/components/increase-decrease-counter";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";

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
                    <img src={_type.img} className="crop_img" />
                </div>
            ))}
        </div>
    </div>
);

export const ComboSideAndDrink = ({
    items = [],
    actionBtnName = "",
    actionBtnPrefixIcon = "",
    showPrice = true,
    onComplete = () => {},
    showLoading = false
}) => {
    const [selectedItem, setSelectedItem] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleClick = useCallback((item) => {
        if (showLoading) {
            setLoading(true);
        }
        onComplete(selectedItem);
    }, [selectedItem, showLoading]);

    function renderIconInActionButton() {
        if (loading) {
            return (
                <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                />
            );
        }

        return actionBtnPrefixIcon;
    }

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
                        <Button
                            disabled={loading}
                            onClick={() => handleClick(selectedItem)}
                            className="themeBtn"
                        >
                            {renderIconInActionButton()}
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

        let newItems = { ...selectedItems };
        if (isItemSelected) {
            delete newItems[item.id];
        } else {
            newItems[item.id] = {
                ...item,
                quantity: 1
            };
        }

        if (!Object.keys(newItems).length) {
            newItems = null;
        }

        setSelectedItems(newItems);
    }, [selectedOption, selectedItems]);

    const handleGoBack = useCallback(() => {
        if (!selectedOption) {
            onBack();
        }

        setSelectedOption(null);
    }, [selectedOption]);

    const handleIncrement = useCallback((item, count) => {
        const newItems = { ...selectedItems };
        newItems[item.id].quantity = count;
        setSelectedItems(newItems);
    }, [selectedItems]);

    const handleDecrement = useCallback((item, count) => {
        if (count === 0) {
            const newItems = { ...selectedItems };
            delete newItems[item.id];
            setSelectedItems(newItems);
        }
    }, [selectedItems]);

    function renderOptions() {
        return (
            <div className="combo-options">
                <h5 className="msgText">{t("common.extra_drinks_help_message")}</h5>
                <div>
                    <Button
                        variant="primary"
                        size="lg"
                        onClick={() => handleOptionSelect("yes")}
                        className="themeBtn"
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
                                            onIncrement={(count) => handleIncrement(item, count)}
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
                            <Button
                                className="themeBtn"
                                onClick={() => onComplete(selectedItems)}
                            >
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

export const calculatePrice = (item, obj) => {
    let price = Number(item.price);

    const { selectedComboOption, selectedComboSide, selectedExtraDrinks } = obj;

    if (selectedComboOption === "yes") {
        price += Number(selectedComboSide.price);
    }

    if (selectedExtraDrinks) {
        for (const key in selectedExtraDrinks) {
            price += Number(selectedExtraDrinks[key].price + selectedExtraDrinks[key].quantity);
        }
    }

    return price.toFixed(2);
};

export const Modifier = ({ item }) => {
    const { t } = useTranslation();
    const { description = "" } = item || {};

    const [selected, setSelected] = useState([]);

    const handleOnChange = useCallback((list) => {
        setSelected(list);
    });

    if (!description) return "";

    let ingredients = description.match(/{(.*?)}/g);

    if (ingredients) {
        ingredients = ingredients.map((ingredient) => ingredient.replace(/[{}]/g, ""))
            .map((ingredient) => `${t("common.no")} ${ingredient}`);
    }

    return (
        <DropdownMultiselect
            buttonClass="btn-outline-secondary"
            placeholder={t("common.modifier")}
            placeholderMultipleChecked={`${selected.length} ${t("common.selected")}`}
            name="ingredientsModifiers"
            options={ingredients}
            handleOnChange={handleOnChange}
            selected={selected}
            showSelectToggle={false}
        />
    );
};

export const Addons = ({ item }) => {
    const { t } = useTranslation();
    const { description = "" } = item || {};

    const [selected, setSelected] = useState([]);

    const handleOnChange = useCallback((list) => {
        setSelected(list);
    });

    if (!description) return "";

    let ingredients = description.match(/{(.*?)}/g);

    if (ingredients) {
        ingredients = ingredients.map((ingredient) => ingredient.replace(/[{}]/g, ""))
            .map((ingredient) => `${t("common.no")} ${ingredient}`);
    }

    return (
        <DropdownMultiselect
            buttonClass="btn-outline-secondary"
            placeholder={selected.length ? `${selected.length} ${t("common.selected")}` : t("common.addons")}
            placeholderMultipleChecked={`${selected.length} ${t("common.selected")}`}
            name="addons"
            options={ingredients}
            handleOnChange={handleOnChange}
            selected={selected}
            showSelectToggle={false}
        />
    );
};
