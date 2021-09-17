import {
    forwardRef, useCallback, useImperativeHandle, useState
} from "react";
import { Button, Offcanvas } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Pencil } from "react-bootstrap-icons";

export const Modifier = forwardRef(({ item }, ref) => {
    const { description = "" } = item || {};
    const { t } = useTranslation();

    const [show, setShow] = useState(false);
    const [selected, setSelected] = useState([]);
    const [tempSelected, setTempSelected] = useState(selected);

    let ingredients = description.match(/{(.*?)}/g);

    if (ingredients) {
        ingredients = ingredients.map((ingredient) => ingredient.replace(/[{}]/g, ""))
            .map((ingredient) => `${t("common.no")} ${ingredient}`);
    }

    const handleClose = () => setShow(false);

    const handleShow = () => setShow(true);

    const handleSelect = useCallback((value) => {
        setTempSelected([
            ...tempSelected,
            value
        ]);
    }, [tempSelected]);

    const handleDoneClick = useCallback(() => {
        setSelected(tempSelected);
        handleClose();
    }, [tempSelected, selected]);

    useImperativeHandle(ref, () => ({
        getSelected: () => selected
    }));

    function renderIngredients() {
        if (!ingredients) return "";

        return (
            <div className="combo-items">
                {ingredients.map((ingredient) => (
                    <div
                        key={ingredient}
                        className={`combo-item ${tempSelected.indexOf(ingredient) > -1 ? "active" : ""}`}
                        onClick={() => handleSelect(ingredient)}
                    >
                        {ingredient}
                        {tempSelected.indexOf(ingredient) > -1 ? <span className="tick" /> : ""}
                    </div>
                ))}
            </div>
        );
    }

    return (
        <>
            <Button variant="outline-secondary" onClick={handleShow}>
                {selected.length ? `${selected.length} ${t("common.selected")}` : t("common.modifier")}
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
                    {renderIngredients()}
                </Offcanvas.Body>
                <div className="modifier-action-buttons">
                    <Button
                        className="themeBtn"
                        onClick={handleDoneClick}
                    >
                        {t("common.done")}
                    </Button>
                </div>
            </Offcanvas>
        </>
    );
});
