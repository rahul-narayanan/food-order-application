import {
    forwardRef, useCallback, useRef, useState
} from "react";
import { useTranslation } from "react-i18next";
import Emitter from "src/core/js/event-emitter";
import { SelectBox } from "src/core/js/components/select-box";
import { RadioButtons } from "src/core/js/components/radio-buttons";
import { getYesNoOptions } from "src/pos/js/listing/item-dialog/utils";

const ComboSideSelectBox = forwardRef(({ sides, onChange }, ref) => {
    const { t } = useTranslation();

    const SIDES_OPTIONS = sides.map((side) => ({
        labelKey: side.id,
        value: `${side.name} (+$${side.price})`,
        price: side.price
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
            onChange(newOption);
        }
    }, [selectedOption]);

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

export const Combos = forwardRef(({
    selectedCategory = {},
    onChange = () => {},
    onComplete = () => {}
}, ref) => {
    const {
        combos = {
            sides: [],
            drinks: []
        }
    } = selectedCategory;
    const { t } = useTranslation();
    const COMBOS_OPTIONS = getYesNoOptions(t);

    const DRINK_OPTIONS = combos.drinks.map((drink) => ({
        labelKey: drink.id,
        value: drink.name
    }));

    const sideRef = useRef(null);
    const drinkRef = useRef(null);

    const [selectedValue, setSelectedValue] = useState(null);

    const handleOnChange = useCallback((_selectedValue) => {
        if (_selectedValue === "no" && sideRef.current) {
            const lastSelectedSide = sideRef.current.getSelectedOption();
            if (lastSelectedSide) {
                Emitter.emit("UPDATE_PRICE_IN_DIALOG_HEADER", {
                    type: "decrease",
                    price: lastSelectedSide.price
                });
            }
        }
        setSelectedValue(_selectedValue);
        onChange(_selectedValue);
    }, [selectedValue]);

    const handleSideAndDrinkSelect = useCallback(() => {
        if (sideRef.current.getSelectedValue() && drinkRef.current.getSelectedValue()) {
            onComplete();
        }
    });

    function renderCombosList() {
        if (selectedValue === "yes") {
            return (
                <li className="combos-container">
                    <h6>{combos.title}</h6>
                    <ComboSideSelectBox
                        ref={sideRef}
                        sides={combos.sides}
                        onChange={handleSideAndDrinkSelect}
                    />
                    <SelectBox
                        ref={drinkRef}
                        className="drinks-dropdown"
                        placeholder={t("common.selectDrink")}
                        options={DRINK_OPTIONS}
                        onChange={handleSideAndDrinkSelect}
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
                containerCSS="combos-option-container"
            />
            {renderCombosList()}
        </>
    );
});
