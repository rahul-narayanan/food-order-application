import { Modal } from "react-bootstrap";
import { DialogHeader } from "./item-dialog-header";
import { useCallback, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HANDLE_GO_BACK_CLICK, HANDLE_SHOW_CATEGORIES } from "./redux";
import { DialogBody } from "./item-dialog-body";
import { POSContext } from "src/pos/js/utils";
import { calculatePrice } from "src/pos/js/listing/listing-utils";

export const ItemDialog = () => {
    const selectedCategory = useSelector((state) => state?.selectedCategory || null);
    const selectedItem = useSelector((state) => state?.selectedItem || null);
    const dispatch = useDispatch();
    const { handleAddItem } = useContext(POSContext);

    const handleCloseDialog = useCallback(() => {
        dispatch({ type: HANDLE_GO_BACK_CLICK });
    }, []);

    const handleAdd = useCallback((obj) => {
        handleAddItem({
            item: selectedItem,
            ...obj,
            quantity: 1,
            price: calculatePrice(selectedItem, obj)
        });
        dispatch({ type: HANDLE_SHOW_CATEGORIES });
    }, [selectedItem]);

    return (
        <Modal
            show={Boolean(selectedItem)}
            onHide={handleCloseDialog}
            className="item-dialog-container"
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <DialogHeader item={selectedItem} onClose={handleCloseDialog} />
            <DialogBody item={selectedItem} category={selectedCategory} onAdd={handleAdd} />
        </Modal>
    );
};
