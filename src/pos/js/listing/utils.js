import {
    forwardRef,
    useCallback, useEffect, useImperativeHandle, useRef, useState
} from "react";
import { Modal, CloseButton } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { CheckBox } from "../../../core/js/components/check-box";
import Emitter from "../../../core/js/event-emitter";
import { Drinks } from "../../../core/js/drink-items";
import { normalizeI18NText } from "../../../core/js/utils";
import { RadioButtons } from "../../../core/js/components/radio-buttons";
import { IncreaseDecreaseCounter } from "../../../core/js/components/increase-decrease-counter";
import { SelectBox } from "../../../core/js/components/select-box";

export const REGULAR_SIZE_EXTRA_CHARGE = 2;

export const JUMBO_SIZE_EXTRA_CHARGE = 4;

const getComboOptions = (translation) => [
    {
        name: translation("common.with_combo"),
        value: "withCombo"
    },
    {
        name: translation("common.without_combo"),
        value: "withOutCombo"
    }
];

const getAvailableSizes = (translation) => [
    {
        name: translation("common.small"),
        value: "small"
    },
    {
        name: `${translation("common.regular")} (+$${REGULAR_SIZE_EXTRA_CHARGE})`,
        value: "regular"
    },
    {
        name: `${translation("common.jumbo")} (+$${JUMBO_SIZE_EXTRA_CHARGE})`,
        value: "jumbo"
    }
];

export const Sizes = forwardRef((props, ref) => {
    const { t } = useTranslation();
    const SIZES = getAvailableSizes(t);
    const [selectedSize, setSelectedSize] = useState(SIZES[0].value);

    const handleOnChange = useCallback((newSize) => {
        const params = {};

        if (selectedSize === "small" && (newSize === "regular" || newSize === "jumbo")) {
            params.type = "increase";
            params.price = newSize === "regular" ? REGULAR_SIZE_EXTRA_CHARGE : JUMBO_SIZE_EXTRA_CHARGE;
        } else if (selectedSize === "regular") {
            params.price = REGULAR_SIZE_EXTRA_CHARGE;
            params.type = newSize === "small" ? "decrease" : "increase";
        } else {
            params.type = newSize === "decrease";
            params.price = newSize === "small" ? JUMBO_SIZE_EXTRA_CHARGE : REGULAR_SIZE_EXTRA_CHARGE;
        }

        Emitter.emit("UPDATE_PRICE_IN_DIALOG_HEADER", params);
        setSelectedSize(newSize);
    }, [selectedSize]);

    return (
        <RadioButtons
            ref={ref}
            id="size-options"
            options={SIZES}
            title={t("common.size_help_message")}
            onChange={handleOnChange}
        />
    );
});

export const ComboSideSelectBox = forwardRef(({ sides }, ref) => {
    const { t } = useTranslation();

    const SIDES_OPTIONS = sides.map((side) => ({
        labelKey: side.id,
        value: `${side.name} (+$${side.price})`
    }));

    const [selectedOption, setSelectedOption] = useState(null);

    const emitPriceChangeEvent = useCallback((newOption) => {
        const params = {
            type: "increase",
            price: newOption.price
        };

        if (selectedOption) {
            params.type = "increase";
            params.price = (Number(newOption.price) - Number(selectedOption.price)).toFixed(2);

            if (selectedOption.price > newOption.price) {
                params.type = "decrease";
                params.price = (Number(selectedOption.price) - Number(newOption.price)).toFixed(2);
            }
        }

        Emitter.emit("UPDATE_PRICE_IN_DIALOG_HEADER", params);
    }, [selectedOption]);

    const handleSideSelect = useCallback((_newOption) => {
        if (_newOption) {
            const newOption = sides.find((option) => option.id === _newOption.labelKey);
            emitPriceChangeEvent(newOption);
            setSelectedOption(newOption);
        }
    }, [selectedOption]);

    useImperativeHandle(ref, () => ({
        getSelectedSide: () => selectedOption
    }));

    return (
        <SelectBox
            ref={ref}
            className="sides-dropdown"
            placeholder={t("common.selectSide")}
            options={SIDES_OPTIONS}
            onChange={handleSideSelect}
        />
    );
});

export const Combos = forwardRef(({ selectedCategory = {} }, ref) => {
    const {
        combos = {
            sides: [],
            drinks: []
        }
    } = selectedCategory;
    const { t } = useTranslation();
    const COMBOS_OPTIONS = getComboOptions(t);

    const DRINK_OPTIONS = combos.drinks.map((drink) => ({
        labelKey: drink.id,
        value: drink.name
    }));

    const sideRef = useRef(null);
    const drinkRef = useRef(null);

    const [selectedValue, setSelectedValue] = useState(null);

    const handleOnChange = useCallback((_selectedValue) => {
        if (_selectedValue === "withOutCombo" && sideRef.current) {
            const lastSelectedSide = sideRef.current.getSelectedSide();
            Emitter.emit("UPDATE_PRICE_IN_DIALOG_HEADER", {
                type: "decrease",
                price: lastSelectedSide.price
            });
        }
        setSelectedValue(_selectedValue);
    }, [selectedValue]);

    function renderCombosList() {
        if (selectedValue === "withCombo") {
            return (
                <li className="combos-container">
                    <h6>{combos.title}</h6>
                    <ComboSideSelectBox ref={sideRef} sides={combos.sides} />
                    <SelectBox
                        ref={drinkRef}
                        className="drinks-dropdown"
                        placeholder={t("common.selectDrink")}
                        options={DRINK_OPTIONS}
                    />
                </li>
            );
        }

        return "";
    }

    return (
        <>
            <RadioButtons
                ref={ref}
                id="combo-options"
                options={COMBOS_OPTIONS}
                title={t("common.combo_help_message")}
                inline
                onChange={handleOnChange}
            />
            {renderCombosList()}
        </>
    );
});

export const DialogHeader = ({ item }) => {
    const { name, description, price: _price } = item;
    const [price, setPrice] = useState(_price);

    const calculateAndSetPrice = useCallback(({ type, price: __price }) => {
        let newPrice;
        if (type === "increase") {
            newPrice = (Number(price) + Number(__price)).toFixed(2);
        } else {
            newPrice = (Number(price) - Number(__price)).toFixed(2);
        }
        setPrice(newPrice);
    }, [price]);

    useEffect(() => {
        Emitter.on("UPDATE_PRICE_IN_DIALOG_HEADER", calculateAndSetPrice);

        return () => {
            Emitter.off("UPDATE_PRICE_IN_DIALOG_HEADER");
        };
    }, [price]);

    return (
        <Modal.Header closeButton>
            <Modal.Title className="single" id="contained-modal-title-vcenter">
                {name}
                <span className="right">
                    {`$ ${price}`}
                </span>
                <p>{normalizeI18NText(description)}</p>
            </Modal.Title>
        </Modal.Header>

    );
};

export const Modifications = ({ item = {} }) => {
    const { description = "" } = item;
    const { t } = useTranslation();
    const [show, setShow] = useState(false);
    const refArr = useRef([]);

    const handleShow = useCallback(() => {
        setShow(!show);
    }, [show]);

    const ingredients = (description.match(/{(.*?)}/g) || []).map((ingredient) => ingredient.replace(/[{}]/g, ""));

    return (
        <div className="modifications">
            {!show ? (
                <div
                    className="link"
                    onClick={handleShow}
                >
                    {t("common.modify")}
                </div>
            ) : ""}

            {show ? (
                <div className="content animate__animated animate__zoomIn wow">
                    <div className="title">
                        {t("common.modify")}
                        <CloseButton onClick={handleShow} />
                    </div>
                    {ingredients.map((ingredient, index) => (
                        <CheckBox
                            key={index}
                            ref={(el) => refArr.current[index] = el}
                            name={`${t("common.no")} ${ingredient}`}
                            value={ingredient.toLowerCase()}
                        />
                    ))}
                </div>
            ) : ""}
        </div>
    );
};

export const DrinkOptions = () => {
    const { t } = useTranslation();
    const checkBoxRefArr = useRef([]);
    const counterRefArr = useRef([]);

    const [showClear, setShowClear] = useState(false);

    const isAtleastOneChecked = useCallback(() => {
        const rider = "";
        return checkBoxRefArr.current.some((checkBox) => checkBox.isChecked());
    }, []);

    const handleOnChange = useCallback((drink, isChecked, index) => {
        counterRefArr.current[index].setCount(isChecked ? 1 : 0);
        Emitter.emit("UPDATE_PRICE_IN_DIALOG_HEADER", {
            type: isChecked ? "increase" : "decrease",
            price: drink.price
        });
        setShowClear(isAtleastOneChecked());
    }, []);

    const handleIncrement = useCallback((drink, count, index) => {
        Emitter.emit("UPDATE_PRICE_IN_DIALOG_HEADER", {
            type: "increase",
            price: drink.price
        });
    }, []);

    const handleDecrement = useCallback((drink, count, index) => {
        if (count === 0) {
            checkBoxRefArr.current[index].unCheck();
        }
        Emitter.emit("UPDATE_PRICE_IN_DIALOG_HEADER", {
            type: "decrease",
            price: drink.price
        });
    }, []);

    const handleClearSelection = useCallback(() => {
        // Clear selection
    }, []);

    return (
        <li>
            <h5>
                {t("common.drinks")}
                {showClear ? (
                    <a className="txtLink" onClick={handleClearSelection}>
                        {t("common.clear")}
                    </a>
                ) : ""}
            </h5>
            <div className="drinks-container">
                {Drinks.map((drink, index) => (
                    <div className="df">
                        <CheckBox
                            key={index}
                            ref={(el) => checkBoxRefArr.current[index] = el}
                            name={`${drink.name} (+$${drink.price})`}
                            value={drink.id}
                            onChange={(checked) => handleOnChange(drink, checked, index)}
                        />
                        <IncreaseDecreaseCounter
                            key={`counterFor${drink.id}`}
                            ref={(el) => counterRefArr.current[index] = el}
                            onIncrement={(count) => handleIncrement(drink, count, index)}
                            onDecrement={(count) => handleDecrement(drink, count, index)}
                        />
                    </div>
                ))}
            </div>
        </li>
    );
};
