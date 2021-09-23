import {
    forwardRef, useCallback, useImperativeHandle, useState
} from "react";
import { Button, Offcanvas, Accordion } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Pencil } from "react-bootstrap-icons";
import { IncreaseDecreaseCounter } from "src/core/js/components/increase-decrease-counter";
import { calculateTotalOfAddOns } from "./listing-utils";

export const Addons = forwardRef(({ item, addons, onComplete = () => {} }, ref) => {
    const { t } = useTranslation();

    const [show, setShow] = useState(false);
    const [selected, setSelected] = useState([]);
    const [tempSelected, setTempSelected] = useState(selected);

    const handleClose = useCallback(() => {
        setShow(false);
        setTempSelected([]);
    });

    const handleShow = useCallback(() => {
        setShow(true);
    });

    const handleSelect = useCallback((newItem) => {
        const index = tempSelected.findIndex((__item) => __item.id === newItem.id);

        const newTemp = tempSelected.slice();
        if (index > -1) {
            newTemp.splice(index, 1);
        } else {
            newItem.quantity = 1;
            newTemp.push(newItem);
        }
        setTempSelected(newTemp);
    }, [tempSelected]);

    const handleDoneClick = useCallback(() => {
        setSelected(tempSelected);
        onComplete(tempSelected);
        handleClose();
    }, [tempSelected, selected]);

    const handleIncrementDecrement = useCallback((addonItem, count) => {
        const newItems = tempSelected.slice();
        const index = newItems.findIndex((__item) => __item.id === addonItem.id);
        if (index > -1) {
            newItems[index].quantity = count;
        }

        if (count === 0) {
            newItems.splice(index, 1);
        }

        setTempSelected(newItems);
    }, [tempSelected, selected]);

    useImperativeHandle(ref, () => ({
        getSelected: () => selected
    }));

    function renderAddOns() {
        return addons.map((addon, index) => (
            <Accordion.Item eventKey={String(index)} key={`addOnCategory_${addon.id}`} className="addon-container">
                <Accordion.Header>{addon.name}</Accordion.Header>
                <Accordion.Body className="combo-items">
                    {addon.items.map((addonItem) => {
                        const isItemSelected = tempSelected.find((__item) => __item.id === addonItem.id);

                        return (
                            <div
                                key={`addon_${addonItem.id}`}
                                className={`combo-item ${isItemSelected ? "active" : ""}`}
                                onClick={() => handleSelect(addonItem)}
                            >
                                {addonItem.name}
                                {" - "}
                                <span className="symbol">$</span>
                                {addonItem.price}
                                {/* {`${addonItem.name} - $${addonItem.price}`} */}
                                {isItemSelected ? (
                                    <IncreaseDecreaseCounter
                                        key={`addon_counter_${addonItem.id}`}
                                        count={isItemSelected.quantity}
                                        limit={5}
                                        onIncrement={(count) => handleIncrementDecrement(addonItem, count)}
                                        onDecrement={(count) => handleIncrementDecrement(addonItem, count)}
                                    />
                                ) : ""}
                            </div>
                        );
                    })}
                </Accordion.Body>
            </Accordion.Item>
        ));
    }

    return (
        <>
            <Button variant="outline-secondary" onClick={handleShow}>
                {selected.length ? `$ ${calculateTotalOfAddOns(selected)} - (${selected.length})` : t("common.addons")}
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
                    <Offcanvas.Title>
                        {t("common.addons")}
                        {tempSelected.length ? ` (${tempSelected.length} ${t("common.selected")}) - $ ${calculateTotalOfAddOns(tempSelected)}` : ""}
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className="addon-canvas-body">
                    <Accordion defaultActiveKey="0" className="addons-container" flush>
                        {renderAddOns()}
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
});
