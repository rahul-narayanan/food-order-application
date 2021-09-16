import { Modal } from "react-bootstrap";
import { DialogHeader } from "./item-dialog-header";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HANDLE_GO_BACK_CLICK } from "./redux";
import { DialogBody } from "./item-dialog-body";

export const ItemDialog = () => {
    const selectedCategory = useSelector((state) => state?.selectedCategory || null);
    const selectedItem = useSelector((state) => state?.selectedItem || null);
    const dispatch = useDispatch();

    const handleAddItem = useCallback(() => {

    }, []);

    const handleCloseDialog = useCallback(() => {
        dispatch({ type: HANDLE_GO_BACK_CLICK });
    }, []);

    return (
        <Modal
            show={Boolean(selectedItem)}
            onHide={handleCloseDialog}
            className="item-dialog-container"
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <DialogHeader item={selectedItem} />
            <DialogBody item={selectedItem} category={selectedCategory} />
        </Modal>
    );
};
