import {
    forwardRef,
    useCallback, useRef, useState
} from "react";
import { useTranslation } from "react-i18next";
import { CheckBox } from "src/core/js/components/check-box";
import { IncreaseDecreaseCounter } from "src/core/js/components/increase-decrease-counter";
import { RadioButtons } from "src/core/js/components/radio-buttons";
import { Drinks } from "src/core/js/drink-items";
import Emitter from "src/core/js/event-emitter";
import { getYesNoOptions } from "src/pos/js/listing/item-dialog/utils";

export const DrinkOptions = forwardRef(({
    isComboSelected,
    onComplete = () => {}
}, ref) => {
    const { t } = useTranslation();
    const checkBoxRefArr = useRef([]);
    const counterRefArr = useRef([]);

    const [showDrinks, setShowDrinks] = useState(false);
    const [showClear, setShowClear] = useState(false);

    const isAtleastOneChecked = useCallback(() =>
        checkBoxRefArr.current.some((checkBox) => checkBox.isChecked()),
    [showClear, showDrinks]);

    const handleOptionSelect = useCallback((value) => {
        const newValue = value === "yes";
        setShowDrinks(newValue);
        onComplete(!newValue);
    }, [showDrinks, showClear]);

    const handleOnChange = useCallback((drink, isChecked, index) => {
        setTimeout(() => {
            counterRefArr.current[index].setCount(isChecked ? 1 : 0);
            Emitter.emit("UPDATE_PRICE_IN_DIALOG_HEADER", {
                type: isChecked ? "increase" : "decrease",
                price: drink.price
            });
            const newValue = isAtleastOneChecked();
            setShowClear(newValue);
            onComplete(newValue);
        }, 100);
    }, [showDrinks, showClear]);

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

    function renderDrinks() {
        if (showDrinks) {
            return (
                <>
                    <h6>
                        {t("common.which_drinks")}
                        {showClear ? (
                            <a className="txtLink" onClick={handleClearSelection}>
                                {t("common.clear")}
                            </a>
                        ) : ""}
                    </h6>
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
                </>
            );
        }

        return "";
    }
    return (
        <>
            <RadioButtons
                ref={ref}
                id="drinks-options"
                options={getYesNoOptions(t)}
                title={isComboSelected ? t("common.extra_drinks_help_message") : t("common.drinks_help_message")}
                inline
                onChange={handleOptionSelect}
                containerCSS="drinks-option-container"
            />
            {renderDrinks()}
        </>
    );
});
