import {
    useCallback, useState
} from "react";
import {
    Button, Offcanvas, Accordion
} from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Pencil } from "react-bootstrap-icons";
import { SwapFries } from "src/core/js/swap-fries-items";

export const Modifier = ({
    category, item, onComplete = () => {},
    isVeggie, selectedSwap, selectedIngredients
}) => {
    const { description = "" } = item || {};
    const { t } = useTranslation();

    const [show, setShow] = useState(false);
    const [isVeggieTemp, setIsVeggieTemp] = useState(isVeggie);
    const [tempSelectedSwap, setTempSelectedSwap] = useState(selectedSwap);
    const [tempSelectedIngredients, setTempSelectedIngredients] = useState(selectedIngredients);

    let ingredients = description.match(/{(.*?)}/g);

    if (ingredients) {
        ingredients = ingredients.map((ingredient) => ingredient.replace(/[{}]/g, ""))
            .map((ingredient) => `${t("common.no")} ${ingredient}`);
    }

    const handleClose = useCallback(() => {
        setShow(false);
    });

    const handleShow = () => setShow(true);

    const handleSelect = useCallback((value) => {
        const newSelected = tempSelectedIngredients.slice();
        const index = tempSelectedIngredients.indexOf(value);
        if (index > -1) {
            newSelected.splice(index, 1);
        } else {
            newSelected.push(value);
        }
        setTempSelectedIngredients(newSelected);
    }, [tempSelectedIngredients]);

    const handleSwapFriesSelect = useCallback((value) => {
        setTempSelectedSwap(value);
    }, []);

    const handleVeggieBtnClick = useCallback(() => {
        setIsVeggieTemp(!isVeggieTemp);
    }, [isVeggieTemp]);

    const handleDoneClick = useCallback(() => {
        onComplete(isVeggieTemp, tempSelectedSwap, tempSelectedIngredients);
        handleClose();
    }, [tempSelectedIngredients, tempSelectedSwap, isVeggieTemp]);

    function renderVegSwitch() {
        return (
            <div className="vegOptionBtn">
                <Button
                    key="veggieBtn"
                    variant={isVeggieTemp ? "success" : "outline-success"}
                    onClick={handleVeggieBtnClick}
                >
                    {isVeggieTemp ? <span className="tick" /> : ""}
                    {t("common.veggieOption")}
                </Button>
            </div>
        );
    }

    function renderIngredients() {
        if (!ingredients) return "";

        return (
            <Accordion.Item
                eventKey="ingredientsAccordion"
                key="ingredientsAccordionItem"
                className="addon-container"
            >
                <Accordion.Header>{t("common.modify")}</Accordion.Header>
                <Accordion.Body className="combo-items">
                    {ingredients.map((ingredient) => (
                        <div
                            key={ingredient}
                            className={`combo-item ${tempSelectedIngredients.indexOf(ingredient) > -1 ? "active" : ""}`}
                            onClick={() => handleSelect(ingredient)}
                        >
                            {ingredient}
                            {tempSelectedIngredients.indexOf(ingredient) > -1 ? <span className="tick" /> : ""}
                        </div>
                    ))}
                </Accordion.Body>
            </Accordion.Item>
        );
    }

    function renderSwapFries() {
        if (!category.isSwapFriesAvailable) return "";
        const selectedObj = tempSelectedSwap || selectedSwap;
        return (
            <Accordion.Item
                eventKey="swapFriesAccordion"
                key="swapFriesAccordionItem"
                className="addon-container"
            >
                <Accordion.Header>{t("common.swapFries")}</Accordion.Header>
                <Accordion.Body className="combo-items">
                    {SwapFries.map((swapItem) => {
                        const isSelected = selectedObj && selectedObj.id === swapItem.id;
                        return (
                            <div
                                key={`swapFries_${swapItem.id}`}
                                className={`combo-item ${isSelected ? "active" : ""}`}
                                onClick={() => handleSwapFriesSelect(swapItem)}
                            >
                                {swapItem.name}
                                {" - "}
                                <span className="symbol">$</span>
                                {swapItem.price}
                                {isSelected ? <span className="tick" /> : ""}
                            </div>
                        );
                    })}
                </Accordion.Body>
            </Accordion.Item>
        );
    }

    return (
        <>
            <Button variant="outline-secondary" onClick={handleShow}>
                {selectedIngredients.length ? `${selectedIngredients.length} ${t("common.selected")}` : t("common.modifier")}
                <Pencil />
            </Button>
            <Offcanvas
                className="modifier-dialog-container"
                key="modifier-overlay"
                show={show}
                onHide={handleClose}
                placement="end"
            >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>{t("common.modifier")}</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {renderVegSwitch()}
                    <Accordion
                        className="addons-container"
                        defaultActiveKey="ingredientsAccordion"
                        flush
                    >
                        {renderSwapFries()}
                        {renderIngredients()}
                    </Accordion>
                </Offcanvas.Body>
                <div className="modifier-action-buttons">
                    <Button
                        className="themeBtn"
                        onClick={handleDoneClick}
                    >
                        {t("common.next")}
                    </Button>
                </div>
            </Offcanvas>
        </>
    );
};
