import VegIconImg from "../../img/veg_icon.png";

import {
    forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState
} from "react";
import { Modal, CloseButton } from "react-bootstrap";
import Emitter from "src/core/js/event-emitter";
import { Addons } from "./addons";
import { calculateTotalOfAddOns, normalizeItemName } from "./listing-utils";
import { Modifier } from "./modifier";

export const DialogHeader = forwardRef(({ category, item, onClose }, ref) => {
    const { name, description = "", price } = item || {};

    const addOnsRef = useRef(null);

    const [isVeggie, setIsVeggie] = useState(false);
    const [selectedSwap, setSelectedSwap] = useState(null);
    const [selectedIngredients, setSelectedIngredients] = useState([]);

    const [amount, setAmount] = useState(category.isAvailableInDiffSizes ? 0 : price);

    const getSelectedAddOns = () => addOnsRef.current?.getSelected() || [];

    useImperativeHandle(ref, () => ({
        getSelectedIngModifiers: () => selectedIngredients,
        getSelectedSwapFries: () => selectedSwap,
        isVeggieSelected: () => isVeggie,
        getSelectedAddOns
    }));

    const handleUpdatePrice = useCallback((value) => {
        value = Number(value) + Number(calculateTotalOfAddOns(getSelectedAddOns()));
        if (value > 0) {
            value = value.toFixed(2);
        } else {
            value = "";
        }
        setAmount(value);
    }, [amount]);

    const handleAddOnSelectionComplete = useCallback((addons) => {
        const value = Number(amount) + Number(calculateTotalOfAddOns(addons));
        setAmount(value.toFixed(2));
    }, [amount]);

    const handleModifierComplete = useCallback((isVeg, swap, ings) => {
        setIsVeggie(isVeg);
        setSelectedSwap(swap);
        setSelectedIngredients(ings);
    });

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
                {isVeggie ? <img src={VegIconImg} /> : ""}
                {normalizeItemName(name, isVeggie)}
                &nbsp;
                &nbsp;
                {amount && amount !== "0" ? (
                    <>
                        <span className="small">$</span>
                        {amount}
                    </>
                ) : ""}
                <p>{normalizeItemName(description, isVeggie)}</p>
            </Modal.Title>
            <div className="actionButtons">
                <Modifier
                    category={category}
                    item={item}
                    onComplete={handleModifierComplete}
                    isVeggie={isVeggie}
                    selectedSwap={selectedSwap}
                    selectedIngredients={selectedIngredients}
                />
                {category.addons?.length ? (
                    <Addons
                        item={item}
                        addons={category.addons}
                        ref={addOnsRef}
                        onComplete={handleAddOnSelectionComplete}
                    />
                ) : ""}
            </div>
        </Modal.Header>

    );
});
