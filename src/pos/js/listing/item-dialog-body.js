import { useTranslation } from "react-i18next";
import { useCallback, useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { ComboSideAndDrink, ExtraDrinkSelect, calculatePrice } from "./listing-utils";
import { HeaderNavigator } from "src/core/js/components/header-navigator";
import { Sizes } from "../constants";
import Emitter from "src/core/js/event-emitter";

const getInitialState = () => ({
    selectedSize: null,
    selectedComboOption: null,
    selectedComboSide: null,
    selectedComboDrink: null,
    selectedExtraDrinks: null
});

export const DialogBody = ({ category, item, onAdd = () => {} }) => {
    const { t } = useTranslation();
    const [state, setState] = useState((getInitialState()));

    useEffect(() => {
        const {
            selectedComboOption, selectedComboSide, selectedComboDrink, selectedExtraDrinks
        } = state;
        if (!selectedComboOption) return;

        if (selectedComboOption === "yes" && selectedComboSide && selectedComboDrink) {
            onAdd(state);
        }

        if (selectedExtraDrinks) {
            onAdd(state);
        }
    }, [state]);

    const updatePriceInHeader = (obj) => Emitter.emit("UPDATE_PRICE_IN_ITEM_DIALOG", calculatePrice(item, obj, !category.isAvailableInDiffSizes));

    const handleSizeSelect = useCallback((size) => {
        const newState = {
            ...getInitialState(),
            selectedSize: size
        };
        setState(newState);
        updatePriceInHeader(newState);
    }, [state]);

    const handleSizeDeSelect = useCallback((size) => {
        const newState = {
            ...getInitialState()
        };
        setState(newState);
        updatePriceInHeader(newState);
    }, [state]);

    function renderSize() {
        if (!category?.isAvailableInDiffSizes) {
            return "";
        }

        if (!state.selectedSize) {
            return (
                <div className="combo-options">
                    <h5 className="msgText">{t("common.size_help_message")}</h5>
                    <div className="combo-items">
                        {Sizes.map((size) => {
                            const isSelected = state.selectedSize === size.value;

                            return (
                                <div
                                    key={`sizeOption_${size.value}`}
                                    className={`combo-item ${isSelected ? "active" : ""}`}
                                    onClick={() => handleSizeSelect(size)}
                                >
                                    {size.name}
                                    &nbsp;
                                    {" - $ "}
                                    {item[`${size.value}Price`] ? item[`${size.value}Price`] : item.price}
                                </div>
                            );
                        })}
                    </div>
                </div>
            );
        }

        return "";
    }

    const handleComboOptionSelect = useCallback((value) => {
        setState({
            ...getInitialState(),
            selectedSize: state.selectedSize,
            selectedComboOption: value
        });
    }, [state]);

    function renderComboQuestion() {
        if (category?.isAvailableInDiffSizes && !state.selectedSize) return "";

        if (state.selectedComboOption) return "";

        return (
            <>
                {state.selectedSize ? (
                    <HeaderNavigator
                        headerText={state.selectedSize.name}
                        onBack={handleSizeDeSelect}
                    />
                ) : ""}
                <div className="combo-options">
                    <h5 className="msgText">{t("common.combo_help_message")}</h5>
                    <div>
                        <Button
                            variant="primary"
                            size="lg"
                            onClick={() => handleComboOptionSelect("yes")}
                            className="themeBtn"
                        >
                            {t("common.combo")}
                        </Button>
                        <Button
                            variant="secondary"
                            size="lg"
                            onClick={() => handleComboOptionSelect("no")}
                        >
                            {t("common.noCombo")}
                        </Button>
                    </div>
                </div>
            </>
        );
    }

    const handleDeSelectComboOption = useCallback(() => {
        const newState = {
            ...getInitialState(),
            selectedSize: state.selectedSize
        };
        setState(newState);
        updatePriceInHeader(newState);
    }, [state]);

    const handleComboSideSelect = useCallback((side) => {
        updatePriceInHeader({
            ...getInitialState(),
            selectedSize: state.selectedSize,
            selectedComboOption: state.selectedComboOption,
            selectedComboSide: side
        });
    }, [state]);

    const handleComboSideSelectComplete = useCallback((side) => {
        const newState = {
            ...getInitialState(),
            selectedSize: state.selectedSize,
            selectedComboOption: state.selectedComboOption,
            selectedComboSide: side
        };
        setState(newState);
        updatePriceInHeader(newState);
    }, [state]);

    const handleComboSideDeSelect = useCallback(() => {
        const newState = {
            ...getInitialState(),
            selectedSize: state.selectedSize,
            selectedComboOption: state.selectedComboOption
        };
        setState(newState);
        updatePriceInHeader(newState);
    }, [state]);

    const handleComboDrinkSelect = useCallback((drink) => {
        setState({
            ...state,
            selectedComboDrink: drink
        });
    }, [state]);

    function renderComboSideAndDrink() {
        if (!state.selectedComboOption || state.selectedComboOption === "no") return "";

        const { combos = [] } = category || {};

        if (state.selectedComboSide) {
            return (
                <>
                    <HeaderNavigator
                        key="comboDrinkSelectHeader"
                        headerText={`${state.selectedSize ? `${state.selectedSize.name} - ` : ""}${t("common.combo")} - ${t("common.drinks")}`}
                        onBack={handleComboSideDeSelect}
                    />
                    <ComboSideAndDrink
                        key="comboDrinkSelect"
                        items={combos.drinks}
                        onComplete={handleComboDrinkSelect}
                        showPrice={false}
                        actionBtnPrefixIcon={(<span className="tick" />)}
                        actionBtnName={t("common.place_order")}
                    />
                </>
            );
        }
        return (
            <>
                <HeaderNavigator
                    key="comboSideSelectHeader"
                    headerText={`${state.selectedSize ? `${state.selectedSize.name} - ` : ""}${t("common.combo")} - ${t("common.sides")}`}
                    onBack={handleDeSelectComboOption}
                />
                <ComboSideAndDrink
                    key="comboSideSelect"
                    items={combos.sides}
                    onSelect={handleComboSideSelect}
                    onComplete={handleComboSideSelectComplete}
                    actionBtnName={t("common.next")}
                />
            </>
        );
    }

    const handleExtraDrinkSelectionComplete = useCallback((drinks) => {
        setState({
            ...state,
            selectedExtraDrinks: drinks
        });
    }, [state]);

    const handleExtraDrinkSelection = useCallback((drinks) => {
        const newState = {
            ...state,
            selectedExtraDrinks: drinks
        };
        updatePriceInHeader(newState);
    }, [state]);

    const handleDeSelectDrinkOption = useCallback(() => {
        const newState = {
            ...state,
            selectedExtraDrinks: null
        };
        updatePriceInHeader({
            ...state,
            selectedExtraDrinks: null
        });
    }, [state]);

    function renderDrinks() {
        if (!state.selectedComboOption || state.selectedComboOption === "yes") return "";

        const { combos = [] } = category || {};
        return (
            <ExtraDrinkSelect
                key="nonComboDrinkSelect"
                selectedSizeName={state.selectedSize?.name}
                items={combos.drinks}
                onSelect={handleExtraDrinkSelection}
                onComplete={handleExtraDrinkSelectionComplete}
                onBack={handleDeSelectDrinkOption}
                actionBtnName={t("common.next")}
            />
        );
    }

    if (!item) return "";

    return (
        <Modal.Body>
            {renderSize()}
            {renderComboQuestion()}
            {renderComboSideAndDrink()}
            {renderDrinks()}
        </Modal.Body>
    );
};
