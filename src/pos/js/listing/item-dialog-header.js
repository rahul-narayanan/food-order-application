import {
    forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState
} from "react";
import { Modal, CloseButton } from "react-bootstrap";
import Emitter from "src/core/js/event-emitter";
import { normalizeI18NText } from "src/core/js/utils";
import { Addons } from "src/pos/js/listing/addons";
import { Modifier } from "src/pos/js/listing/modifier";

export const DialogHeader = forwardRef(({ category, item, onClose }, ref) => {
    const { name, description = "", price } = item || {};

    const modifierRef = useRef(null);
    const addOnsRef = useRef(null);

    const [amount, setAmount] = useState(category.isAvailableInDiffSizes ? 0 : price);

    useImperativeHandle(ref, () => ({
        getSelectedModifiers: () => modifierRef.current.getSelected(),
        getSelectedAddOns: () => addOnsRef.current?.getSelected() || []
    }));

    const handleUpdatePrice = useCallback((value) => {
        setAmount(value);
    }, [amount]);

    useEffect(() => {
        Emitter.on("UPDATE_PRICE_IN_ITEM_DIALOG", handleUpdatePrice);

        return () => {
            Emitter.off("UPDATE_PRICE_IN_ITEM_DIALOG", handleUpdatePrice);
        };
    }, []);

    return (
        <Modal.Header>
            <div>
                <CloseButton onClick={onClose} />
            </div>
            <Modal.Title id="contained-modal-title-vcenter">
                {name}
                &nbsp;
                &nbsp;
                {amount && amount !== "0" ? (
                    <>
                        <span className="small">$</span>
                        {amount}
                    </>
                ) : ""}
                <p>{normalizeI18NText(description)}</p>
            </Modal.Title>
            <div className="actionButtons">
                <Modifier item={item} ref={modifierRef} />
                {category.addons?.length ? (
                    <Addons
                        item={item}
                        addons={category.addons}
                        ref={addOnsRef}
                    />
                ) : ""}
            </div>
        </Modal.Header>

    );
});
