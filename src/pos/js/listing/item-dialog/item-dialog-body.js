import {
    useState, useMemo, useRef, useCallback, useLayoutEffect, useEffect
} from "react";
import { useTranslation } from "react-i18next";
import { Sizes } from "./sizes";
import Categories from "src/core/js/food-categories";
import { DrinkOptions } from "./drinks";
import { TextBox } from "src/core/js/components/text-box";
import { Combos } from "./combos";
import { Modifications } from "./modifications";
import Emitter from "src/core/js/event-emitter";

const initialState = {
    selectedSize: null,
    selectedComboOption: null,
    isComboSideAndDrinkSelected: false,
    drinkSelectionComplete: false
};

export const ItemDialogBody = (props) => {
    const { item, scrollToBottom } = props;

    const [state, setState] = useState(initialState);

    const { t } = useTranslation();

    const selectedCategory = useMemo(() => Categories.find(
        (_category) => _category.id === item.categoryId
    ), [item]);

    const comboRef = useRef(null);
    const sizeRef = useRef(null);
    const drinksRef = useRef(null);
    const instructionRef = useRef(null);

    const handleSizeChange = useCallback((newSize) => {
        setState({
            ...state,
            selectedSize: newSize
        });
    });

    const handleComboOptionChange = useCallback((value) => {
        setState({
            ...initialState,
            selectedComboOption: value
        });
    }, []);

    const handleComboSelectionComplete = useCallback(() => {
        setState({
            ...initialState,
            selectedComboOption: state.selectedComboOption,
            isComboSideAndDrinkSelected: true
        });
    }, [state]);

    const handleDrinkSelectionComplete = useCallback((value) => {
        setState({
            ...state,
            drinkSelectionComplete: value
        });
    }, [state]);

    function renderCombo() {
        return (
            <Combos
                ref={comboRef}
                selectedCategory={selectedCategory}
                onChange={handleComboOptionChange}
                onComplete={handleComboSelectionComplete}
            />
        );
    }

    function renderDrinks() {
        return (
            <DrinkOptions
                ref={drinksRef}
                isComboSelected={state.selectedComboOption === "yes"}
                onComplete={handleDrinkSelectionComplete}
            />
        );
    }

    function checkAndRenderDrinks() {
        if (!state.selectedComboOption) return "";

        if (state.selectedComboOption === "yes") {
            if (state.isComboSideAndDrinkSelected) {
                return renderDrinks();
            }

            return "";
        }

        return renderDrinks();
    }

    function renderInstructionTextBox() {
        if (state.drinkSelectionComplete) {
            return (
                <li className="instruction-textbox-container">
                    <TextBox
                        ref={instructionRef}
                        label={t("common.specialInstructions")}
                        type="textarea"
                    />
                </li>
            );
        }
    }

    function renderDivForScroll() {
        // This div is used for scroll to bottom
        return <div className="item-dialog-scroll-div" />;
    }

    useEffect(() => {
        Emitter.emit("ENABLE_ITEM_DIALOG_ACTION_BUTTON", state.drinkSelectionComplete);
    }, [state.drinkSelectionComplete]);

    useLayoutEffect(() => {
        scrollToBottom();
    }, [state.drinkSelectionComplete]);

    return (
        <>
            <div className="content">
                <ul>
                    {selectedCategory?.isAvailableInDiffSizes ? (
                        <Sizes
                            ref={sizeRef}
                            onChange={handleSizeChange}
                        />
                    ) : renderCombo()}
                    {state.selectedSize ? renderCombo() : ""}
                    {checkAndRenderDrinks()}
                    {renderInstructionTextBox()}
                    {renderDivForScroll()}
                </ul>
            </div>
            <Modifications item={item} />
        </>
    );
};
