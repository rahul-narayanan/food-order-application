import { useTranslation } from "react-i18next";
import { useCallback, useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { ComboSideAndDrink, ExtraDrinkSelect } from "./listing-utils";
import { HeaderNavigator } from "src/core/js/components/header-navigator";

const initialState = {
    selectedComboOption: null,
    selectedComboSide: null,
    selectedComboDrink: null,
    selectedExtraDrinks: null
};

export const DialogBody = ({ category, onAdd = () => {} }) => {
    const { t } = useTranslation();
    const [state, setState] = useState(initialState);

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

    const handleComboOptionSelect = useCallback((value) => {
        setState({
            ...initialState,
            selectedComboOption: value
        });
    }, [state]);

    const handleDeSelectComboOption = useCallback(() => {
        setState({
            ...initialState
        });
    }, [state]);

    const handleComboSideSelect = useCallback((side) => {
        setState({
            ...initialState,
            selectedComboOption: state.selectedComboOption,
            selectedComboSide: side
        });
    }, [state]);

    const handleComboSideDeSelect = useCallback(() => {
        setState({
            ...initialState,
            selectedComboOption: state.selectedComboOption
        });
    }, [state]);

    const handleComboDrinkSelect = useCallback((drink) => {
        setState({
            ...state,
            selectedComboDrink: drink
        });
    }, [state]);

    const handleExtraDrinkSelectionComplete = useCallback((drinks) => {
        setState({
            ...state,
            selectedExtraDrinks: drinks
        });
    }, [state]);

    function renderComboQuestion() {
        if (state.selectedComboOption) return "";

        return (
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
        );
    }

    function renderComboSideAndDrink() {
        if (!state.selectedComboOption || state.selectedComboOption === "no") return "";

        const { combos = [] } = category || {};

        if (state.selectedComboSide) {
            return (
                <>
                    <HeaderNavigator
                        key="comboDrinkSelectHeader"
                        headerText={`${t("common.combo")} - ${t("common.drinks")}`}
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
                    headerText={`${t("common.combo")} - ${t("common.sides")}`}
                    onBack={handleDeSelectComboOption}
                />
                <ComboSideAndDrink
                    key="comboSideSelect"
                    items={combos.sides}
                    onComplete={handleComboSideSelect}
                    actionBtnName={t("common.next")}
                />
            </>
        );
    }

    function renderDrinks() {
        if (!state.selectedComboOption || state.selectedComboOption === "yes") return "";

        const { combos = [] } = category || {};
        return (
            <ExtraDrinkSelect
                key="nonComboDrinkSelect"
                items={combos.drinks}
                onComplete={handleExtraDrinkSelectionComplete}
                onBack={handleDeSelectComboOption}
                actionBtnName={t("common.next")}
            />
        );
    }

    return (
        <Modal.Body>
            {renderComboQuestion()}
            {renderComboSideAndDrink()}
            {renderDrinks()}
        </Modal.Body>
    );
};
