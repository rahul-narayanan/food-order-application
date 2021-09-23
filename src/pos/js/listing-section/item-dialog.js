import { Modal } from "react-bootstrap";
import { DialogHeader } from "./item-dialog-header";
import { useCallback, useContext, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HANDLE_GO_BACK_CLICK, HANDLE_SHOW_CATEGORIES } from "./redux";
import { DialogBody } from "./item-dialog-body";
import { POSContext } from "../utils";
import { calculatePrice } from "./listing-utils";

export const ItemDialog = () => {
    const selectedCategory = useSelector((state) => state?.selectedCategory || null);
    const selectedItem = useSelector((state) => state?.selectedItem || null);
    const dispatch = useDispatch();
    const { handleAddItem } = useContext(POSContext);

    const headerRef = useRef(null);

    const handleCloseDialog = useCallback(() => {
        dispatch({ type: HANDLE_GO_BACK_CLICK });
    }, []);

    const handleAdd = useCallback((obj) => {
        obj.selectedAddOns = headerRef.current.getSelectedAddOns();
        handleAddItem({
            item: selectedItem,
            ...obj,
            quantity: 1,
            finalPrice: calculatePrice(selectedItem, obj),
            modifiers: headerRef.current.getSelectedIngModifiers(),
            swapFries: headerRef.current.getSelectedSwapFries(),
            isVeggie: headerRef.current.isVeggieSelected()
        });
        dispatch({ type: HANDLE_SHOW_CATEGORIES });
    }, [selectedItem]);

    if (!selectedItem) return "";

    return (
        <Modal
            show
            onHide={handleCloseDialog}
            className="item-dialog-container"
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <DialogHeader
                ref={headerRef}
                item={selectedItem}
                category={selectedCategory}
                onClose={handleCloseDialog}
            />
            <DialogBody
                item={selectedItem}
                category={selectedCategory}
                onAdd={handleAdd}
            />
        </Modal>
    );
};
